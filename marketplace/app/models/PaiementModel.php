<?php

namespace App\Models;

use App\Models\Validators\PaiementValidator;

require_once __DIR__ . '/Model.php';
require_once __DIR__ . '/validators/PaiementValidator.php';

/**
 * Modele representant la table paiement.
 */
class Paiement extends Model
{
    protected static ?string $validatorClass = PaiementValidator::class;
    protected static string $table = 'paiement';
    protected static string $primaryKey = 'id_paiement';
    protected static array $fields = [
        'methode',
        'reference_externe',
        'montant',
        'statut',
        'date_paiement',
        'id_commande',
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
