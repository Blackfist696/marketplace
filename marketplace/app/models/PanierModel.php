<?php

namespace App\Models;

require_once __DIR__ . '/Model.php';

class Panier extends Model
{
    protected static string $table = 'paniers';
    protected static string $primaryKey = 'id_panier';
    protected static array $fields = [
        'id_utilisateur',
        'session_id',
        'date_creation',
        'date_modification',
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
