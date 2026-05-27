<?php

namespace App\Models;

use App\Models\Validators\StatistiqueArtisanValidator;

require_once __DIR__ . '/Model.php';
require_once __DIR__ . '/validators/StatistiqueArtisanValidator.php';

/**
 * Modele representant la table statistique_artisan.
 */
class StatistiqueArtisan extends Model
{
    protected static ?string $validatorClass = StatistiqueArtisanValidator::class;
    protected static string $table = 'statistique_artisan';
    protected static string $primaryKey = 'id_statistique';
    protected static array $fields = [
        'id_utilisateur',
        'date_consultation',
        'ip_adress',
        'id_produit',
        'id_artisan',
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
