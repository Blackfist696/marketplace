<?php

namespace App\Models;

use App\Models\Validators\ClasseValidator;

require_once __DIR__ . '/Model.php';
require_once __DIR__ . '/validators/ClasseValidator.php';

/**
 * Modele representant la table classe (relation categorie-produit).
 * La table ayant une cle composite, privilegier les methodes dediees.
 */
class Classe extends Model
{
    protected static ?string $validatorClass = ClasseValidator::class;
    protected static string $table = 'classe';
    protected static string $primaryKey = 'id_produit';
    protected static array $fields = [
        'id_categorie',
        'id_produit',
    ];

    public static function getAll(): array
    {
        return parent::all();
    }

    public static function createRecord(array $data): int
    {
        return parent::create($data);
    }

    public static function link(int $idCategorie, int $idProduit): int
    {
        return parent::create([
            'id_categorie' => $idCategorie,
            'id_produit' => $idProduit,
        ]);
    }

    public static function unlink(int $idCategorie, int $idProduit): bool
    {
        $sql = 'DELETE FROM classe WHERE Id_categorie = :id_categorie AND Id_produit = :id_produit';
        $stmt = static::getPDO()->prepare($sql);

        return $stmt->execute([
            'id_categorie' => $idCategorie,
            'id_produit' => $idProduit,
        ]);
    }

    public static function getByCategorieId(int $idCategorie): array
    {
        return parent::where('id_categorie', $idCategorie);
    }

    public static function getByProduitId(int $idProduit): array
    {
        return parent::where('id_produit', $idProduit);
    }
}
