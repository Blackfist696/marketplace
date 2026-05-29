# Comptes seedes (dev) - 2026-05-29

Ce document liste les comptes inseres par le seed applicatif et leur mot de passe initial en clair.
Attention: ces mots de passe sont destines uniquement a l environnement de developpement.

Source de verite: app/seed.php

## Tableau des utilisateurs

| Email | Role | Mot de passe initial |
|---|---|---|
| admin@example.com | administrateur | admin123 |
| client1@example.com | client | client123 |
| client2@example.com | client | client123 |
| client3@example.com | client | client123 |
| client4@example.com | client | client123 |
| client5@example.com | client | client123 |
| miels.artisan@example.com | artisan | artisan123 |
| savons.artisan@example.com | artisan | artisan123 |
| confiseries.artisan@example.com | artisan | artisan123 |
| cosmetiques.artisan@example.com | artisan | artisan123 |
| bougies.artisan@example.com | artisan | artisan123 |
| pollen.artisan@example.com | artisan | artisan123 |
| propolis.artisan@example.com | artisan | artisan123 |
| coffrets.artisan@example.com | artisan | artisan123 |

## Note technique

- En base, les mots de passe sont stockes sous forme de hash bcrypt (pas en clair).
- Si un utilisateur existe deja, le seed idempotent ne remplace pas automatiquement son mot de passe.
