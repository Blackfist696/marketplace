<?php

namespace App\Security\Authorization;

use App\Models\Commande;
use App\Models\Paiement;

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
     */
    public static function canDeleteCommande(int $commandeId, array $auth): bool
    {
        if ($auth['role_id'] === 2) {
            return false;
        }

        $commande = Commande::getById($commandeId);
        if ($commande === null) {
            return false;
        }

        if (!$auth['is_admin'] && (int) ($commande['id_utilisateur'] ?? 0) !== $auth['user_id']) {
            return false;
        }

        return self::isUnpaidCommande($commande) && self::hasNoPaiementRecords($commandeId);
    }

    /**
     * @param array{user_id:int, role_id:int, is_admin:bool} $auth
     */
    public static function canDeleteLigneCommande(array $ligneCommande, array $auth): bool
    {
        $commandeId = (int) ($ligneCommande['id_commande'] ?? 0);
        if ($commandeId <= 0) {
            return false;
        }

        return self::canDeleteCommande($commandeId, $auth);
    }

    public static function canDeletePaiement(array $paiement, array $auth): bool
    {
        return false;
    }

    private static function isUnpaidCommande(array $commande): bool
    {
        return (string) ($commande['statut'] ?? '') === 'en_attente';
    }

    private static function hasNoPaiementRecords(int $commandeId): bool
    {
        return count(Paiement::getBy('id_commande', $commandeId)) === 0;
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
