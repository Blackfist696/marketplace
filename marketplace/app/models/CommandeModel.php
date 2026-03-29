<?php

namespace App\Models;

require_once __DIR__ . '/Model.php';

class Commande extends Model
{
    protected static string $table = 'commandes';
    protected static string $primaryKey = 'id_commande';
    protected static array $fields = [
        'reference',
        'id_utilisateur',
        'id_adresse_livraison',
        'id_adresse_facturation',
        'statut',
        'total_ht',
        'total_tva',
        'frais_livraison',
        'total_ttc',
        'date_commande',
        'date_paiement',
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
