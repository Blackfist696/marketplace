<?php

namespace App\Models;

require_once __DIR__ . '/Model.php';

class Artisan extends Model
{
    protected static string $table = 'artisans';
    protected static string $primaryKey = 'id_artisan';
    protected static array $fields = [
        'id_utilisateur',
        'id_template',
        'nom_boutique',
        'description',
        'logo',
        'banniere',
        'siret',
        'iban',
        'couleur_primaire',
        'couleur_secondaire',
        'police_principale',
        'commission',
        'valide',
        'date_validation',
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
