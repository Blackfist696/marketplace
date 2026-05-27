<?php

namespace App\Models;

use App\Models\Validators\ProduitValidator;

require_once __DIR__ . '/Model.php';

/**
 * Modèle représentant la table produit et fournissant les opérations CRUD.
 */
class Produit extends Model
{
    protected static ?string $validatorClass = ProduitValidator::class;
    protected static string $table = 'produit';
    protected static string $primaryKey = 'id_produit';
    protected static array $fields = [
        'id_artisan',
        'nom',
        'description',
        'prix_ht',
        'taux_tva',
        'stock',
        'poids',
        'image_principale',
        'actif',
        'mis_en_avant',
        'nb_vues',
        'date_creation',
    ];

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
