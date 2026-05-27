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

Structure cible recommandee dans ce dossier:
- src/
- public/ ou assets/ selon le squelette Angular retenu
- angular.json
- package.json
- tsconfig*.json

Convention d integration recommandee:
- toutes les requetes frontend vers le backend passent par les routes /api
- le frontend ne doit pas acceder directement aux fichiers PHP du backend
- les reponses backend doivent rester coherentes en JSON
- la configuration d URL d API doit etre centralisee cote Angular

Notes de deploiement:
- en local, Angular peut tourner separement du backend
- en production, le frontend et le backend seront heberges sous le meme projet
- si Angular est servi sur une origine differente en developpement, une configuration CORS ou un proxy Angular sera necessaire

Important:
- ne pas installer Angular a la racine du depot
- conserver l isolation du frontend dans ce dossier pour eviter de melanger Node/Angular et PHP/Composer
