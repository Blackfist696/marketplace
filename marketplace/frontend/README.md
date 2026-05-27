# Frontend Angular

Ce dossier est reserve au projet frontend Angular.

Principes retenus:
- le backend Slim/PHP reste dans ce depot, a la racine actuelle
- le frontend Angular aura son propre code source ici
- en developpement, le frontend peut etre lance separement
- en production, le build Angular pourra etre publie selon la strategie retenue (par exemple via public/ ou un sous-dossier dedie)

A definir lors de l integration du frontend:
- strategie de build/deploiement Angular
- URL API consommees par le frontend
- gestion de l authentification (session/cookie ou token)
- configuration CORS si frontend et backend ne partagent pas exactement la meme origine
