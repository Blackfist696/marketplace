# Protection contre les injections SQL

Ce document décrit les mesures mises en place dans l’application pour limiter les risques d’attaques par injection SQL et renforcer la sécurité des interactions avec la base de données.

## Objectif

## Mise a jour fonctionnelle recente

Les protections documentees ici couvrent aussi le nouveau flux de consultation produit :
- la page detail produit envoie une requete de suivi vers [app/controllers/StatistiqueArtisanController.php](../app/controllers/StatistiqueArtisanController.php)
- le controleur utilise les validateurs de [app/models/validators/StatistiqueArtisanValidator.php](../app/models/validators/StatistiqueArtisanValidator.php)
- le stockage final passe par [app/models/Model.php](../app/models/Model.php) avec whitelist et requetes preparees

Les injections SQL surviennent lorsqu’un attaquant injecte du SQL malveillant via une entrée utilisateur, par exemple dans un champ de formulaire, un paramètre d’URL ou une requête HTTP. L’objectif de cette protection est de garantir que les données saisies par l’utilisateur ne puissent pas modifier la logique SQL attendue.

## Mesures principales mises en place

### 1. Validation stricte des données

Avant toute insertion ou mise à jour, les données sont validées via des validateurs spécifiques à chaque modèle.

Parcours du code :
1. Une requête HTTP arrive dans un contrôleur, par exemple dans [app/controllers/StatistiqueArtisanController.php](../app/controllers/StatistiqueArtisanController.php).
2. Les données sont transmises au modèle correspondant.
3. Le modèle appelle la logique de validation centralisée dans [app/models/Model.php](../app/models/Model.php).
4. Le validateur dédié est utilisé, par exemple [app/models/validators/StatistiqueArtisanValidator.php](../app/models/validators/StatistiqueArtisanValidator.php).

Exemples de protections :
- vérification des champs obligatoires
- validation du type des données
- contrôle des formats attendus
- vérification des valeurs numériques
- vérification des adresses IP lorsqu’elles sont utilisées

Cette approche empêche l’envoi de données incohérentes ou mal formées qui pourraient compromettre la requête SQL.

### 2. Whitelist des champs autorisés

Les modèles n’acceptent que les colonnes explicitement autorisées pour chaque opération CRUD.

Parcours du code :
1. Le contrôleur envoie les données au modèle via une méthode de création ou de mise à jour.
2. Le modèle applique un filtrage strict dans [app/models/Model.php](../app/models/Model.php).
3. Seuls les champs déclarés dans les modèles, comme [app/models/StatistiqueArtisanModel.php](../app/models/StatistiqueArtisanModel.php), sont conservés.

En pratique :
- seul un ensemble défini de colonnes peut être utilisé pour une insertion ou une mise à jour
- aucune colonne non prévue ne peut être injectée implicitement

Cela limite fortement les surfaces d’attaque et évite toute modification non contrôlée des requêtes.

### 3. Utilisation de requêtes préparées

Les interactions avec la base de données passent par des requêtes préparées avec des paramètres liés.

Parcours du code :
1. Le modèle appelle la couche d’accès à la base de données depuis [app/models/Model.php](../app/models/Model.php).
2. Les valeurs sont liées à la requête via `bindValue` ou `execute` avec des paramètres.
3. La requête SQL est construite avec des placeholders, puis exécutée sans interpolation directe des entrées utilisateur.

Avantages :
- séparation nette entre la requête SQL et les valeurs transmises
- impossibilité pour une valeur utilisateur de changer la structure de la requête
- protection contre les attaques par injection SQL même si la saisie contient des caractères spéciaux tels que `'`, `"`, `;`, ou `--`

### 4. Sanitize des données entrantes

Les données reçues sont nettoyées avant traitement.

Parcours du code :
1. Les données entrantes traversent le contrôleur puis le modèle.
2. La sanitation est appliquée dans [app/models/Model.php](../app/models/Model.php) via la méthode `sanitizeData()`.
3. Les valeurs sont nettoyées avant insertion, mise à jour ou comparaison.

Les opérations de nettoyage incluent :
- suppression des balises HTML potentiellement dangereuses
- suppression des espaces en début et fin de chaîne
- normalisation des valeurs avant insertion ou comparaison

Cette mesure réduit les risques liés à des entrées malveillantes et améliore la robustesse des données stockées.

### 5. Contrôle des colonnes autorisées dans les requêtes dynamiques

Pour certaines opérations de recherche ou de filtrage, seules les colonnes explicitement autorisées peuvent être utilisées.

Parcours du code :
1. La méthode `where()` dans [app/models/Model.php](../app/models/Model.php) vérifie que la colonne demandée est bien autorisée.
2. La liste des colonnes acceptées est définie par le modèle concerné, par exemple [app/models/StatistiqueArtisanModel.php](../app/models/StatistiqueArtisanModel.php).

Cela empêche l’utilisation de noms de colonnes arbitraires fournis par une source externe.

### 6. Gestion des erreurs sans fuite d’information

Les erreurs SQL ne sont pas exposées de manière brute à l’utilisateur final.

Parcours du code :
1. Les contrôleurs, par exemple [app/controllers/StatistiqueArtisanController.php](../app/controllers/StatistiqueArtisanController.php), intercepte les exceptions levées par les modèles.
2. Les erreurs sont transformées en réponses HTTP propres et contrôlées.
3. Les traces techniques sont enregistrées dans les logs applicatifs, notamment [app/logs/app-error.log](../app/logs/app-error.log) et [app/logs/php-error.log](../app/logs/php-error.log).

En pratique :
- les exceptions sont interceptées
- des réponses HTTP adaptées sont renvoyées
- les détails sensibles sont journalisés côté serveur uniquement

Cette pratique réduit les risques de divulgation d’informations sur la structure interne de la base.

## Points importants à retenir

Même si plusieurs protections sont mises en place, la sécurité de la base de données repose surtout sur la combinaison de plusieurs mécanismes :
- validation
- préparation des requêtes
- sanitization
- contrôle strict des champs
- journalisation et gestion des erreurs

## Bonnes pratiques supplémentaires

Pour renforcer encore la sécurité, il est recommandé de :
- maintenir les dépendances à jour
- limiter les droits de la base de données au strict minimum
- utiliser des comptes dédiés pour chaque environnement
- éviter les constructions SQL en chaîne
- auditer régulièrement les modèles et les contrôleurs

## Conclusion

L’application s’appuie sur une approche défensive basée sur :
- des requêtes préparées
- une validation rigoureuse
- une whitelist des champs
- un nettoyage des données
- une gestion centralisée des erreurs

Ces mesures réduisent fortement le risque d’injection SQL et améliorent la sécurité globale du système.
