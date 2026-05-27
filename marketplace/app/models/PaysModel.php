<?php

namespace App\Models;

use App\Models\Validators\PaysValidator;

require_once __DIR__ . '/Model.php';
require_once __DIR__ . '/validators/PaysValidator.php';

/**
 * Modele representant la table pays.
 */
class Pays extends Model
{
    protected static ?string $validatorClass = PaysValidator::class;
    protected static string $table = 'pays';
    protected static string $primaryKey = 'id_pays';
    protected static array $fields = [
        'nom_pays',
        'code_iso',
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
