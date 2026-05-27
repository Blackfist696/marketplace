<?php

namespace App\Models;

use App\Models\Validators\VilleValidator;

require_once __DIR__ . '/Model.php';
require_once __DIR__ . '/validators/VilleValidator.php';

/**
 * Modele representant la table ville.
 */
class Ville extends Model
{
    protected static ?string $validatorClass = VilleValidator::class;
    protected static string $table = 'ville';
    protected static string $primaryKey = 'id_ville';
    protected static array $fields = [
        'nom_ville',
        'code_postal',
        'id_pays',
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
