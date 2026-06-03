<?php

namespace App\Models;

use PDO;
use App\Models\Validators\ValidationException;
use App\Models\Validators\ValidationResult;
use InvalidArgumentException;

require_once __DIR__ . '/Database.php';

/**
 * Base model providing generic CRUD operations and validation support.
 *
 * Les classes enfants définissent le nom de la table, la clé primaire,
 * les champs autorisés et le validateur optionnel.
 */
abstract class Model
{
    // Metadonnees a definir dans chaque modele enfant.
    protected static string $table;
    protected static string $primaryKey = 'id';
    protected static array $fields = [];
    // Permet de brancher un validateur dedie sans coupler la couche controleur.
    protected static ?string $validatorClass = null;
    protected array $attributes = [];

    /**
     * Normalise les noms de colonnes en minuscules pour un acces coherent
     * depuis les controleurs, independamment de la casse SQL.
     *
     * @param array $row Ligne brute issue de PDO.
     * @return array Ligne avec cles normalisees.
     */
    protected static function normalizeRow(array $row): array
    {
        $normalized = [];
        foreach ($row as $key => $value) {
            $normalized[strtolower((string) $key)] = $value;
        }

        return $normalized;
    }

    /**
     * Retourne la classe de validateur associée au modèle.
     *
     * @return string|null Nom de la classe de validateur ou null si aucun validateur.
     */
    protected static function getValidatorClass(): ?string
    {
        return static::$validatorClass;
    }

    /**
     * Valide un jeu de données via le validateur associé au modèle.
     *
     * @param array $data Données à valider.
     * @return ValidationResult Résultat de la validation.
     * @throws InvalidArgumentException Si la classe de validateur est introuvable ou incorrecte.
     */
    protected static function validateData(array $data): ValidationResult
    {
        $validatorClass = static::getValidatorClass();
        if ($validatorClass === null) {
            // Aucun validateur defini: validation consideree comme reussie.
            return new ValidationResult();
        }

        if (!class_exists($validatorClass)) {
            throw new InvalidArgumentException(sprintf('Validator class "%s" not found.', $validatorClass));
        }

        $validator = new $validatorClass();
        if (!method_exists($validator, 'validate')) {
            throw new InvalidArgumentException(sprintf('Validator class "%s" must implement validate().', $validatorClass));
        }

        return $validator->validate($data);
    }

    /**
     * Valide un ensemble de données pour le modèle.
     *
     * @param array $data Données à valider.
     * @return ValidationResult Résultat de la validation.
     */
    public static function validate(array $data): ValidationResult
    {
        return static::validateData($data);
    }

    /**
     * Nettoie une valeur pour éviter l'injection de code malicieux.
     *
     * @param mixed $value Valeur brute.
     * @return mixed Valeur nettoyée.
     */
    protected static function sanitizeValue($value)
    {
        if (is_string($value)) {
            return trim(strip_tags($value));
        }

        if (is_array($value)) {
            return array_map(static fn($item) => static::sanitizeValue($item), $value);
        }

        return $value;
    }

    /**
     * Nettoie un tableau de données en appliquant sanitizeValue() sur chaque élément.
     *
     * @param array $data Données à nettoyer.
     * @return array Données nettoyées.
     */
    protected static function sanitizeData(array $data): array
    {
        return array_map(static fn($value) => static::sanitizeValue($value), $data);
    }

    /**
     * Initialise le modèle avec des attributs optionnels.
     *
     * @param array $attributes Attributs initiales du modèle.
     */
    public function __construct(array $attributes = [])
    {
        $this->fill($attributes);
    }

    /**
     * Remplit le modèle avec un tableau d'attributs valides.
     *
     * @param array $attributes Données à assigner au modèle.
     * @return $this
     */
    public function fill(array $attributes): self
    {
        // Sanitization centralisee avant hydration des attributs.
        $attributes = static::sanitizeData($attributes);

        if (isset($attributes[static::$primaryKey])) {
            $this->attributes[static::$primaryKey] = $attributes[static::$primaryKey];
        }

        foreach (static::$fields as $field) {
            if (array_key_exists($field, $attributes)) {
                $this->attributes[$field] = $attributes[$field];
            }
        }

        return $this;
    }

    /**
     * Récupère dynamiquement une valeur d'attribut.
     *
     * @param string $name Nom de l'attribut.
     * @return mixed|null Valeur de l'attribut ou null si non défini.
     */
    public function __get(string $name)
    {
        return $this->attributes[$name] ?? null;
    }

    /**
     * Définit dynamiquement une valeur d'attribut si elle est autorisée.
     *
     * @param string $name Nom de l'attribut.
     * @param mixed $value Valeur à assigner.
     */
    public function __set(string $name, $value): void
    {
        if ($name === static::$primaryKey || in_array($name, static::$fields, true)) {
            $this->attributes[$name] = $value;
        }
    }

    /**
     * Retourne les attributs du modèle sous forme de tableau.
     *
     * @return array Tableau des attributs.
     */
    public function toArray(): array
    {
        return $this->attributes;
    }

    /**
     * Retourne la connexion PDO partagée.
     *
     * @return PDO Instance de connexion à la base de données.
     */
    public static function getPDO(): PDO
    {
        // Point d'entree unique vers la connexion partagée de l'application.
        return Database::getConnection();
    }

    /**
     * Récupère toutes les lignes de la table associée.
     *
     * @return array Résultats en tableau.
     */
    public static function all(): array
    {
        $sql = sprintf('SELECT * FROM %s', static::$table);
        $rows = static::getPDO()->query($sql)->fetchAll();
        return array_map(static fn(array $row) => static::normalizeRow($row), $rows);
    }

    /**
     * Trouve une ligne par clé primaire.
     *
     * @param int $id Identifiant de la ligne.
     * @return array|null Ligne trouvée ou null si absente.
     */
    public static function find(int $id): ?array
    {
        $sql = sprintf('SELECT * FROM %s WHERE %s = :id', static::$table, static::$primaryKey);
        $stmt = static::getPDO()->prepare($sql);
        $stmt->execute(['id' => $id]);

        $result = $stmt->fetch();
        return $result === false ? null : static::normalizeRow($result);
    }

    /**
     * Recherche des lignes par colonne autorisée.
     *
     * @param string $column Colonne autorisée.
     * @param mixed $value Valeur recherchée.
     * @return array Résultats correspondants.
     */
    public static function where(string $column, $value): array
    {
        if ($column !== static::$primaryKey && !in_array($column, static::$fields, true)) {
            throw new InvalidArgumentException(sprintf('La colonne "%s" n\'est pas autorisée.', $column));
        }

        $value = static::sanitizeValue($value);

        $sql = sprintf('SELECT * FROM %s WHERE %s = :value', static::$table, $column);
        $stmt = static::getPDO()->prepare($sql);
        $stmt->execute(['value' => $value]);

        $rows = $stmt->fetchAll();
        return array_map(static fn(array $row) => static::normalizeRow($row), $rows);
    }

    /**
     * Insère une nouvelle ligne en base de données.
     *
     * @param array $data Données à insérer.
     * @return int Identifiant de la nouvelle ligne.
     * @throws InvalidArgumentException Si aucun champ valide n'est fourni.
     * @throws ValidationException Si la validation échoue.
     */
    public static function create(array $data): int
    {
        // Whitelist stricte: seuls les champs declares peuvent etre inseres.
        $fields = array_intersect_key($data, array_flip(static::$fields));
        $fields = static::sanitizeData($fields);
        if (empty($fields)) {
            throw new InvalidArgumentException('Aucun champ valide fourni pour la création.');
        }

        $validation = static::validateData($fields);
        if (!$validation->isValid()) {
            throw new ValidationException($validation->getErrors(), 'Validation failed for create.');
        }

        $columns = array_keys($fields);
        $placeholders = array_map(fn($column) => ':' . $column, $columns);
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            static::$table,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );

        $stmt = static::getPDO()->prepare($sql);
        foreach ($fields as $column => $value) {
            $stmt->bindValue(':' . $column, $value);
        }

        $stmt->execute();
        return (int) static::getPDO()->lastInsertId();
    }

    /**
     * Met à jour une ligne existante.
     *
     * @param int $id Identifiant de la ligne à modifier.
     * @param array $data Données de mise à jour.
     * @return bool True si la mise à jour a réussi.
     * @throws InvalidArgumentException Si aucun champ valide n'est fourni.
     * @throws ValidationException Si la validation échoue.
     */
    public static function update(int $id, array $data): bool
    {
        // Meme politique de whitelist que create() pour eviter les updates sauvages.
        $fields = array_intersect_key($data, array_flip(static::$fields));
        $fields = static::sanitizeData($fields);
        if (empty($fields)) {
            throw new InvalidArgumentException('Aucun champ valide fourni pour la mise à jour.');
        }

        $validation = static::validateData($fields);
        if (!$validation->isValid()) {
            throw new ValidationException($validation->getErrors(), 'Validation failed for update.');
        }

        $assignments = array_map(fn($column) => sprintf('%s = :%s', $column, $column), array_keys($fields));
        $sql = sprintf(
            'UPDATE %s SET %s WHERE %s = :id',
            static::$table,
            implode(', ', $assignments),
            static::$primaryKey
        );

        $stmt = static::getPDO()->prepare($sql);
        foreach ($fields as $column => $value) {
            $stmt->bindValue(':' . $column, $value);
        }
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    /**
     * Supprime une ligne par identifiant.
     *
     * @param int $id Identifiant de la ligne à supprimer.
     * @return bool True si la suppression a réussi.
     */
    public static function delete(int $id): bool
    {
        $sql = sprintf('DELETE FROM %s WHERE %s = :id', static::$table, static::$primaryKey);
        $stmt = static::getPDO()->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }

    /**
     * Sauvegarde le modèle : création ou mise à jour selon l'existence de la clé primaire.
     *
     * @return int Identifiant de l'enregistrement sauvegardé.
     */
    public function save(): int
    {
        // Pattern Active Record simple: update si cle primaire presente, sinon create.
        if (isset($this->attributes[static::$primaryKey])) {
            static::update((int) $this->attributes[static::$primaryKey], $this->attributes);
            return (int) $this->attributes[static::$primaryKey];
        }

        $id = static::create($this->attributes);
        $this->attributes[static::$primaryKey] = $id;
        return $id;
    }
}
