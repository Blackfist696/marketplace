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
        // Raccourci admin: acces global sans verification de propriete.
        if ($auth['is_admin']) {
            return true;
        }

        $commande = Commande::getById($commandeId);
        if ($commande === null) {
            return false;
        }

        // Verifie la propriete metier: commande rattachee a l'utilisateur courant.
        return (int) ($commande['id_utilisateur'] ?? 0) === $auth['user_id'];
    }

    /**
     * @param array{user_id:int, role_id:int, is_admin:bool} $auth
     * @param array<string,mixed> $paiement
     */
    public static function canAccessPaiement(array $paiement, array $auth): bool
    {
        // Un paiement est accessible via la commande qu'il reference.
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
        // Meme logique: la ligne herite des droits de sa commande parente.
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

        // Hors admin: seul l'auteur de l'avis peut modifier/supprimer.
        return (int) ($avis['id_utilisateur'] ?? 0) === $auth['user_id'];
    }
}
