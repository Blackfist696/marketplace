<?php

namespace App\Models;

use App\Models\Validators\LigneCommandeValidator;

require_once __DIR__ . '/Model.php';
require_once __DIR__ . '/validators/LigneCommandeValidator.php';

/**
 * Modele representant la table ligne_commande.
 */
class LigneCommande extends Model
{
    protected static ?string $validatorClass = LigneCommandeValidator::class;
    protected static string $table = 'ligne_commande';
    protected static string $primaryKey = 'id_ligne_commande';
    protected static array $fields = [
        'id_produit',
        'id_commande',
        'quantite',
        'prix_unitaire_ht',
        'taux_tva',
    ];

    public static function getAll(): array
    {
        return parent::all();
    }

    public static function getById(int $id): ?array
    {
        return parent::find($id);
    }

    public static function getBy(string $column, $value): array
    {
        return parent::where($column, $value);
    }

    public static function createRecord(array $data): int
    {
        return parent::create($data);
    }

    public static function updateRecord(int $id, array $data): bool
    {
        return parent::update($id, $data);
    }

    public static function deleteRecord(int $id): bool
    {
        return parent::delete($id);
    }

    public function saveRecord(): int
    {
        return parent::save();
    }
}
