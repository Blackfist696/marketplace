<?php

namespace App\Models;

use App\Models\Validators\RUtilisateurAdresseValidator;

require_once __DIR__ . '/Model.php';
require_once __DIR__ . '/validators/RUtilisateurAdresseValidator.php';

/**
 * Modele representant la table r_utilisateur_adresse.
 * La table ayant une cle composite, privilegier les methodes dediees.
 */
class RUtilisateurAdresse extends Model
{
    protected static ?string $validatorClass = RUtilisateurAdresseValidator::class;
    protected static string $table = 'r_utilisateur_adresse';
    protected static string $primaryKey = 'id_utilisateur';
    protected static array $fields = [
        'id_utilisateur',
        'id_adresse',
    ];

    public static function getAll(): array
    {
        return parent::all();
    }

    public static function createRecord(array $data): int
    {
        return parent::create($data);
    }

    public static function link(int $idUtilisateur, int $idAdresse): int
    {
        return parent::create([
            'id_utilisateur' => $idUtilisateur,
            'id_adresse' => $idAdresse,
        ]);
    }

    public static function unlink(int $idUtilisateur, int $idAdresse): bool
    {
        $sql = 'DELETE FROM r_utilisateur_adresse WHERE Id_utilisateur = :id_utilisateur AND Id_adresse = :id_adresse';
        $stmt = static::getPDO()->prepare($sql);

        return $stmt->execute([
            'id_utilisateur' => $idUtilisateur,
            'id_adresse' => $idAdresse,
        ]);
    }

    public static function getByUtilisateurId(int $idUtilisateur): array
    {
        return parent::where('id_utilisateur', $idUtilisateur);
    }

    public static function getByAdresseId(int $idAdresse): array
    {
        return parent::where('id_adresse', $idAdresse);
    }
}
