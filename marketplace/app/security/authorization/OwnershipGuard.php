<?php

namespace App\Security\Authorization;

use App\Models\Commande;

/**
 * Centralise les regles d'autorisation basees sur le proprietaire metier.
 */
final class OwnershipGuard
{
    /**
     * @param array{user_id:int, role_id:int, is_admin:bool} $auth
     */
    public static function canAccessCommande(int $commandeId, array $auth): bool
    {
        if ($auth['is_admin']) {
            return true;
        }

        $commande = Commande::getById($commandeId);
        if ($commande === null) {
            return false;
        }

        return (int) ($commande['id_utilisateur'] ?? 0) === $auth['user_id'];
    }

    /**
     * @param array{user_id:int, role_id:int, is_admin:bool} $auth
     * @param array<string,mixed> $paiement
     */
    public static function canAccessPaiement(array $paiement, array $auth): bool
    {
        $commandeId = (int) ($paiement['id_commande'] ?? 0);
        if ($commandeId <= 0) {
            return false;
        }

        return self::canAccessCommande($commandeId, $auth);
    }

    /**
     * @param array{user_id:int, role_id:int, is_admin:bool} $auth
     * @param array<string,mixed> $ligneCommande
     */
    public static function canAccessLigneCommande(array $ligneCommande, array $auth): bool
    {
        $commandeId = (int) ($ligneCommande['id_commande'] ?? 0);
        if ($commandeId <= 0) {
            return false;
        }

        return self::canAccessCommande($commandeId, $auth);
    }

    /**
     * @param array{user_id:int, role_id:int, is_admin:bool} $auth
     * @param array<string,mixed> $avis
     */
    public static function canAccessAvis(array $avis, array $auth): bool
    {
        if ($auth['is_admin']) {
            return true;
        }

        return (int) ($avis['id_utilisateur'] ?? 0) === $auth['user_id'];
    }
}
