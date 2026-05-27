# Journal de travail

## Check-list de reprise (5 minutes)

- [ ] Ouvrir le projet et verifier l etat Git: `git status --short`
- [ ] Corriger le trigger SQL `tr_check_adresse_utilisateur` dans `sql/Script SQL.sql`
- [ ] Rejouer le schema SQL sur la base locale
- [ ] Relancer le seed PHP: `php app/seed.php`
- [ ] Verifier rapidement les endpoints:
  - `GET /api/lignes-commandes`
  - `GET /api/statistiques-artisans`
  - `GET /api/pays`
- [ ] Mettre a jour ce journal avec les nouveaux resultats

## 2026-05-27

### Objectif de la session
Adapter le projet marketplace au nouveau schema SQL, reconnecter models/controllers/views, supprimer les elements obsoletes, ajouter les nouveaux endpoints API, puis peupler la base avec le seed.

### Actions realisees
1. Analyse et alignement schema/code
- Lecture du script SQL principal et cartographie des ecarts avec le code existant.
- Normalisation des resultats dans le modele de base pour stabiliser les noms de colonnes cote PHP.

2. Refonte des modeles existants
- Mise a jour des tables/champs/cles primaires pour coller au schema actuel.
- Suppression des modeles obsoletes relies a l ancien schema (panier, ligne_panier, personne, template_css).
- Ajout du modele ligne_commande.

3. Ajout des nouveaux modeles manquants
- pays, ville, paiement, avis, statistique_artisan, classe, r_utilisateur_adresse.
- Ajout des validateurs associes a chaque nouveau modele.

4. Reconnexion des controleurs
- CartController passe en panier session.
- OrderController cree les commandes a partir du panier session + insertion lignes de commande.
- PaymentController connecte au modele paiement (creation/mise a jour des statuts).
- ProfileController adapte (plus de table personne).
- ProductController corrige pour verification proprietaire artisan.

5. Nouveaux endpoints API ajoutes
- CRUD/API pour pays, ville, avis, paiements, classes, user-addresses.
- CRUD/API supplementaires ajoutes sur demande:
  - lignes-commandes
  - statistiques-artisans

6. Seed et jeu de donnees
- Refactor de app/seed.php avec:
  - roles imposes: administrateur, vendeur, client
  - referentiels (pays, villes), adresses, liaisons utilisateur-adresse
  - categories, produits, classes
  - tentative commande/ligne/paiement/avis/stats
- Creation du script SQL de seed clone:
  - sql/SeedDataClone.sql

### Fichiers principaux modifies/ajoutes (resume)
- Routes:
  - app/config/routes.php
- Nouveaux controleurs:
  - app/controllers/PaysController.php
  - app/controllers/VilleController.php
  - app/controllers/AvisController.php
  - app/controllers/PaiementApiController.php
  - app/controllers/ClasseController.php
  - app/controllers/UserAddressController.php
  - app/controllers/LigneCommandeController.php
  - app/controllers/StatistiqueArtisanController.php
- Seed:
  - app/seed.php
  - sql/SeedDataClone.sql

### Validation
- Verification des erreurs projet: OK (pas d erreur de compilation signalee par l outil).
- Execution seed:
  - commande: php app/seed.php
  - resultat: execution complete avec warning sur la section commande/paiement

### Point de blocage restant
Warning DB detecte pendant seed:
- Unknown column Id_utilisateur in field list
Cause probable:
- Trigger SQL tr_check_adresse_utilisateur du script DB reference adresse.Id_utilisateur alors que la table adresse n a pas cette colonne dans le schema actuel.

### Etat de reprise
Le projet est fonctionnel avec les adaptations majeures terminees.
La seule correction prioritaire restante pour un seed 100% sans warning est de corriger le trigger SQL de verification d adresse utilisateur dans:
- sql/Script SQL.sql

### Prochaines etapes recommandees
1. Corriger le trigger tr_check_adresse_utilisateur pour utiliser la table de liaison r_utilisateur_adresse.
2. Rejouer schema + seed.
3. Verifier rapidement 3 endpoints nouveaux:
- GET /api/lignes-commandes
- GET /api/statistiques-artisans
- GET /api/pays

### Commandes utiles pour reprendre
- php app/seed.php
- git status --short
