# Projet02
Projet d'intégration de dévelopement de ECI portant sur un site de type "Marketplace" reprenant des articles d'artisans locaux

## État actuel du projet

- Le frontend Angular est généré dans [marketplace/public/app](marketplace/public/app) et doit être déployé avec le backend PHP pour l’environnement de production.
- Une fonctionnalité de suivi des consultations produits a été ajoutée : la page détail produit envoie un POST vers l’API de statistiques artisan, puis la page artisan affiche ces consultations sous “Consultation produits”.
- Les protections contre les injections SQL ont été documentées et renforcées côté backend via validation, whitelist de champs, requêtes préparées et sanitation.
- Le SEO et le prerendering ont été mis en place pour les routes publiques principales : accueil, catalogue, connexion et inscription, avec génération HTML statique au build et métadonnées SEO dynamiques.
- Les mises à jour d’adresses depuis le profil utilisateur et depuis l’admin (clients, artisans, administrateurs) sont maintenant correctement persister dans la base, y compris le type d’adresse.

## Documentation du sous-projet marketplace

- Architecture: [marketplace/ARCHITECTURE.md](marketplace/ARCHITECTURE.md)
- Frontend Angular (zone d'accueil): [marketplace/frontend/README.md](marketplace/frontend/README.md)
- Plan de migration backend (futur): [marketplace/docs/backend-migration-plan.md](marketplace/docs/backend-migration-plan.md)
- Sécurité SQL: [marketplace/docs/securite-injections-sql.md](marketplace/docs/securite-injections-sql.md)
