<?php

namespace App\Models;

use App\Models\Validators\AdresseValidator;

require_once __DIR__ . '/Model.php';

/**
 * Modèle représentant la table adresse et fournissant les opérations CRUD.
 */
class Adresse extends Model
{
    protected static string $table = 'adresse';
    protected static ?string $validatorClass = AdresseValidator::class;
    protected static string $primaryKey = 'id_adresse';
    protected static array $fields = [
        'rue',
        'complement',
        'type_adresse',
        'principale',
        'id_ville',
    ];

    /**
     * Retourne les adresses d'un utilisateur via la table d'association.
     *
     * @param int $userId Identifiant utilisateur.
     * @return array
     */
    public static function getByUtilisateurId(int $userId): array
    {
        $sql = 'SELECT a.*
                FROM adresse a
                INNER JOIN r_utilisateur_adresse rua ON rua.Id_adresse = a.Id_adresse
                WHERE rua.Id_utilisateur = :user_id';

        $stmt = static::getPDO()->prepare($sql);
        $stmt->execute(['user_id' => $userId]);

        $rows = $stmt->fetchAll();
        return array_map(static fn(array $row) => static::normalizeRow($row), $rows);
    }

    /**
     * Retourne tous les enregistrements disponibles.
     *
     * @return array
     */
    public static function getAll(): array
    {
        return parent::all();
    }

    /**
     * Retourne un enregistrement par son identifiant.
     *
     * @param int $id Identifiant de l'enregistrement.
     * @return array|null
     */
    public static function getById(int $id): ?array
    {
        return parent::find($id);
    }

    /**
     * Retourne des enregistrements selon une colonne autorisée.
     *
     * @param string $column Colonne de recherche.
     * @param mixed $value Valeur recherchée.
     * @return array
     */
    public static function getBy(string $column, $value): array
    {
        return parent::where($column, $value);
    }

    /**
     * Crée un enregistrement en base de données.
     *
     * @param array $data Données de l'enregistrement.
     * @return int Identifiant du nouvel enregistrement.
     */
    public static function createRecord(array $data): int
    {
        return parent::create($data);
    }

    /**
     * Met à jour un enregistrement.
     *
     * @param int $id Identifiant de l'enregistrement.
     * @param array $data Données à mettre à jour.
     * @return bool True si la mise à jour a réussi.
     */
    public static function updateRecord(int $id, array $data): bool
    {
        return parent::update($id, $data);
    }

    /**
     * Supprime un enregistrement.
     *
     * @param int $id Identifiant de l'enregistrement.
     * @return bool True si la suppression a réussi.
     */
    public static function deleteRecord(int $id): bool
    {
        return parent::delete($id);
    }

    /**
     * Sauvegarde le modèle courant en base de données.
     *
     * @return int Identifiant de l'enregistrement.
     */
    public function saveRecord(): int
    {
        return parent::save();
    }
}
