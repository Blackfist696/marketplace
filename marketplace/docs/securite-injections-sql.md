# Protection contre les injections SQL

Ce document explique, de façon simple et concrète, comment le projet protège ses échanges avec la base de données contre les attaques par injection SQL.

## En une phrase

Une injection SQL, c’est quand une personne malveillante fait passer du code SQL dans une donnée saisie par l’utilisateur, afin de modifier la requête attendue par l’application.

L’objectif ici est simple : empêcher cette donnée de devenir une instruction SQL.

---

## Ce qui a été fait dans le projet

Les protections décrites ici couvrent aussi le nouveau flux de consultation produit :
- la page détail produit envoie un suivi vers [app/controllers/StatistiqueArtisanController.php](../app/controllers/StatistiqueArtisanController.php)
- le contrôleur utilise les validateurs de [app/models/validators/StatistiqueArtisanValidator.php](../app/models/validators/StatistiqueArtisanValidator.php)
- l’enregistrement final passe par [app/models/Model.php](../app/models/Model.php), où les données sont filtrées, validées, nettoyées et envoyées via des requêtes préparées

---

## Le principe général

Le flux de sécurité ressemble à ceci :

```text
Utilisateur -> Contrôleur -> Validateur -> Modèle -> Requête préparée -> Base de données
      |               |             |              |                    |
   Donnée brute   Vérifie       Filtre       Sépare SQL/valeur      Exécution
```

Chaque étape a un rôle précis :
- le contrôleur reçoit la donnée,
- le validateur vérifie qu’elle est correcte,
- le modèle la filtre et la nettoie,
- la requête SQL est ensuite exécutée de façon séparée de la valeur transmise.

---

## 1. Validation des données entrantes

Avant toute insertion ou mise à jour, les données sont vérifiées.

### Ce que cela signifie
Si une donnée attendue est absente, vide, mal formée ou de mauvais type, elle est rejetée.

### Exemples de contrôles
- champ obligatoire présent
- identifiant numérique
- adresse IP valide
- champ non vide après nettoyage

### Dans le code
- Fichier concerné : [app/models/validators/StatistiqueArtisanValidator.php](../app/models/validators/StatistiqueArtisanValidator.php)

```php
public function validate(array $data): ValidationResult
{
    $this->result = new ValidationResult();

    $this->validateRequired($data, ['date_consultation', 'ip_adress', 'id_produit', 'id_artisan']);
    $this->validateNumeric('id_artisan', $data);
    $this->validateNumeric('id_produit', $data);

    if (isset($data['ip_adress']) && filter_var($data['ip_adress'], FILTER_VALIDATE_IP) === false) {
        $this->result->addError('ip_adress', 'L adresse IP est invalide.');
    }

    return $this->result;
}
```

- Fichier concerné : [app/models/validators/AbstractValidator.php](../app/models/validators/AbstractValidator.php)

```php
protected function validateRequired(array $data, array $fields): void
{
    foreach ($fields as $field) {
        if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
            $this->result->addError($field, sprintf('Le champ "%s" est requis.', $field));
        }
    }
}
```

### Pourquoi c’est utile
Cela empêche de transmettre des données incohérentes qui pourraient perturber la logique SQL ou provoquer des erreurs métier.

---

## 2. Whitelist des champs autorisés

Le modèle n’accepte que les colonnes explicitement autorisées pour l’opération demandée.

### En pratique
Si le code prévoit d’écrire dans trois champs, seule cette liste est acceptée. Les autres champs sont ignorés.

### Dans le code
- Fichier concerné : [app/models/Model.php](../app/models/Model.php)

```php
public function fill(array $attributes): self
{
    $attributes = static::sanitizeData($attributes);

    foreach (static::$fields as $field) {
        if (array_key_exists($field, $attributes)) {
            $this->attributes[$field] = $attributes[$field];
        }
    }

    return $this;
}
```

### Effet concret
Une donnée parasite ne peut pas “forcer” l’écriture dans une colonne non prévue.

---

## 3. Requêtes préparées

C’est l’une des protections les plus importantes.

### Principe
La requête SQL est construite avec des espaces réservés, puis les valeurs sont envoyées séparément.

### Exemple mental
Au lieu de faire :

```text
SELECT * FROM produits WHERE nom = 'valeur fournie par l'utilisateur'
```

On fait plutôt :

```text
SELECT * FROM produits WHERE nom = :nom
```

Puis la valeur est transmise de façon distincte.

### Dans le code
- Fichier concerné : [app/models/Model.php](../app/models/Model.php)

```php
$sql = sprintf(
    'INSERT INTO %s (%s) VALUES (%s)',
    static::$table,
    implode(', ', $columns),
    implode(', ', $placeholders)
);

$stmt = static::getPDO()->prepare($sql);
foreach ($fields as $column => $value) {
    $stmt->bindValue(':' . $column, $value);
}

$stmt->execute();
```

### Pourquoi c’est essentiel
La valeur envoyée ne peut plus modifier la structure de la requête SQL.

---

## 4. Nettoyage des données (sanitize)

Avant traitement, les données sont nettoyées.

### Ce qui est fait
- suppression des balises HTML potentiellement dangereuses
- suppression des espaces en début et fin de chaîne
- normalisation simple des valeurs

### Dans le code
- Fichier concerné : [app/models/Model.php](../app/models/Model.php)

```php
protected static function sanitizeData(array $data): array
{
    return array_map(static fn($value) => static::sanitizeValue($value), $data);
}

protected static function sanitizeValue($value)
{
    if (is_string($value)) {
        return trim(strip_tags($value));
    }

    if (is_array($value)) {
        return array_map(static fn($item) => static::sanitizeValue($item), $value);
    }

    return $value;
}
```

### Pourquoi c’est utile
Même si une donnée semble anodine, elle est nettoyée pour éviter les comportements non attendus.

---

## 5. Contrôle des colonnes dans les requêtes dynamiques

Pour les recherches ou les filtres, le modèle vérifie aussi que la colonne demandée est bien autorisée.

### Dans le code
- Fichier concerné : [app/models/Model.php](../app/models/Model.php)

```php
public static function where(string $column, $value): array
{
    if ($column !== static::$primaryKey && !in_array($column, static::$fields, true)) {
        throw new InvalidArgumentException(sprintf('La colonne "%s" n\'est pas autorisée.', $column));
    }

    $value = static::sanitizeValue($value);
    $sql = sprintf('SELECT * FROM %s WHERE %s = :value', static::$table, $column);
    $stmt = static::getPDO()->prepare($sql);
    $stmt->execute(['value' => $value]);

    return $stmt->fetchAll();
}
```

### Effet concret
Un nom de colonne inventé fourni par une source externe ne peut pas être utilisé pour contourner la logique.

---

## 6. Gestion des erreurs sans fuite d’information

Les erreurs sont interceptées et transformées en réponses propres.

### Ce qui se passe
- une exception métier peut devenir une réponse HTTP 422 avec une liste d’erreurs,
- une erreur technique est journalisée côté serveur,
- les traces sensibles ne sont pas renvoyées brutement au navigateur.

### Dans le code
- Fichier concerné : [app/controllers/StatistiqueArtisanController.php](../app/controllers/StatistiqueArtisanController.php)

```php
try {
    $id = StatistiqueArtisan::createRecord($data);
    $this->respond(201, 'Statistique artisan creee', ['id_statistique' => $id]);
} catch (\App\Models\Validators\ValidationException $exception) {
    $this->respond(422, 'Donnees de consultation invalides', ['errors' => $exception->getErrors()]);
} catch (\PDOException $exception) {
    $this->respond(500, 'Erreur de base de donnees lors de l enregistrement de la consultation', ['error' => $exception->getMessage()]);
}
```

- Journaux concernés : [app/logs/app-error.log](../app/logs/app-error.log) et [app/logs/php-error.log](../app/logs/php-error.log)

### Pourquoi c’est important
Cela évite de divulguer des détails internes sur la base ou sur le fonctionnement technique du système.

---

## Schéma simple du flux de protection

```text
[Formulaire / API / URL]
          │
          ▼
[Contrôleur]
          │
          ▼
[Validation métier]
          │
          ▼
[Whitelist des champs]
          │
          ▼
[Sanitize / nettoyage]
          │
          ▼
[Requête préparée PDO]
          │
          ▼
[Base de données]
```

Chaque bloc empêche une faille possible :
- validation = on refuse les mauvaises données,
- whitelist = on n’écrit que ce qui est prévu,
- sanitize = on nettoie les entrées,
- requête préparée = on sépare la requête de la valeur.

---

## Exemple concret : le flux de consultation produit

Le flux récent de consultation produit suit cette logique :

```text
Page produit
   │
   ▼
StatistiqueArtisanController
   │
   ▼
StatistiqueArtisanValidator
   │
   ▼
Model::create / update / where
   │
   ▼
Requête préparée PDO
   │
   ▼
Base de données
```

Ce parcours montre que la donnée reçue n’est pas simplement “collée” au SQL : elle passe par plusieurs protections avant l’écriture.

---

## Résumé simple

Les protections mises en place reposent sur 5 piliers :
1. valider les données,
2. ne garder que les champs autorisés,
3. utiliser des requêtes préparées,
4. nettoyer les entrées,
5. gérer les erreurs sans exposer les détails techniques.

Cela réduit fortement le risque d’injection SQL et rend le système plus robuste.

---

## Protection contre les attaques XSS (Cross-Site Scripting)

### Qu’est-ce qu’une attaque XSS ?

Une attaque XSS consiste à injecter du code JavaScript malveillant dans une page web, de sorte qu’il soit exécuté dans le navigateur d’un autre utilisateur.

Exemple : un attaquant soumet un commentaire contenant `<script>document.cookie...</script>`. Si l’application affiche ce texte tel quel dans la page, le script s’exécute chez tous les visiteurs qui lisent ce commentaire.

Il existe deux vecteurs principaux :
- **XSS en entrée** : la donnée malveillante est stockée en base, puis réaffichée plus tard.
- **XSS en sortie** : la donnée est injectée dans le HTML sans être nettoyée avant affichage.

---

### Protection côté frontend — Angular

#### 1. Échappement automatique des templates

Angular échappe systématiquement toutes les valeurs affichées via la syntaxe `{{ }}`. Les caractères dangereux (`<`, `>`, `"`, `’`, `&`) sont convertis en entités HTML avant insertion dans le DOM.

```html
<!-- Si produit.nom contient <script>alert(1)</script> -->
{{ produit.nom }}
<!-- Angular affiche littéralement le texte, jamais le script -->
```

Ce comportement est activé par défaut pour toutes les interpolations et liaisons de propriété Angular (`[attr]`, `[class]`, `[style]`).

#### 2. Aucun `innerHTML` non contrôlé

La directive `[innerHTML]` court-circuite l’échappement d’Angular et permet d’injecter du HTML brut dans le DOM. Dans ce projet, `[innerHTML]` n’est utilisé nulle part dans les templates.

Tout affichage de contenu dynamique passe par `{{ }}` ou des liaisons de propriété sûres.

#### 3. DomSanitizer d’Angular

Pour les rares cas où du HTML doit être affiché (ex. description mise en forme), Angular fournit le service `DomSanitizer`. Il analyse et nettoie le HTML avant injection, en supprimant les attributs `onerror`, `onload`, les balises `<script>`, etc.

Dans ce projet, ce service n’est pas utilisé car aucun contenu HTML riche n’est affiché côté client.

---

### Protection côté backend — PHP

#### 1. Nettoyage à l’entrée avec `strip_tags()`

La méthode `sanitizeValue()` dans `Model.php` est appelée sur toutes les données avant leur traitement ou enregistrement en base :

```php
protected static function sanitizeValue($value)
{
    if (is_string($value)) {
        return trim(strip_tags($value));
    }
    // ...
}
```

`strip_tags()` supprime toutes les balises HTML et PHP d’une chaîne. Ainsi, même si un attaquant envoie `<script>alert(1)</script>` dans un champ, seul le texte brut est conservé en base.

#### 2. Pas de rendu PHP direct

Le backend ne génère pas de HTML. Il renvoie uniquement du JSON via `JsonResponder`. Il n’y a donc pas de risque d’injection XSS côté serveur par concaténation dans un template PHP.

---

### Schéma du double filtre XSS

```text
[Formulaire utilisateur]
         │
         ▼
[Backend PHP]
   strip_tags() → supprime les balises à l’entrée
   Donnée propre stockée en base
         │
         ▼
[API JSON] → renvoie du texte brut sans HTML
         │
         ▼
[Angular {{ }}] → échappe les caractères spéciaux à l’affichage
         │
         ▼
[Navigateur] → texte affiché, jamais exécuté
```

---

### Ce qui reste à surveiller

- Ne jamais introduire `[innerHTML]` sans passer par `DomSanitizer`.
- Ne jamais afficher directement du contenu externe (ex. description produit fournie par un artisan) sans vérifier qu’il passe bien par `{{ }}` et non par une liaison non sécurisée.
- Si un éditeur de texte riche est ajouté à l’avenir (ex. description en Markdown ou HTML), prévoir une sanitisation dédiée côté backend (bibliothèque `HTMLPurifier` par exemple).

---

## Bonnes pratiques à poursuivre

Pour garder ce niveau de sécurité, il est recommandé de :
- maintenir les dépendances à jour,
- limiter les droits de la base de données au strict minimum,
- utiliser des comptes dédiés par environnement,
- éviter toute construction SQL manuelle à partir de données externes,
- auditer régulièrement les nouveaux contrôleurs et modèles.

Une version HTML plus graphique est disponible dans [securite-injections-sql.html](securite-injections-sql.html).

---

## Audit de sécurité — 16 juin 2026

Un audit complet a été réalisé sur l'ensemble du projet. Voici les points identifiés et leur statut.

### Points bien protégés

| Vecteur | Mécanisme | Statut |
|---|---|---|
| Injection SQL | PDO + prepared statements + whitelist `$fields` | Protégé |
| XSS en sortie | Angular `{{ }}` auto-échappe, aucun `innerHTML` dangereux | Protégé |
| XSS en entrée | `sanitizeValue()` : `strip_tags()` + `trim()` | Protégé |
| CSRF | `CsrfMiddleware` valide le token sur mutations authentifiées | Protégé |
| Brute force login | `SlidingWindowLimiter` (5 tentatives / 5 min) | Protégé |
| Mots de passe | Bcrypt via `password_verify()` | Protégé |
| Session fixation | `regenerateId()` au login et logout | Protégé |

### Vulnérabilités à corriger

#### 1. Mass assignment via `$_POST` direct (Critique)

**Où :** `app/controllers/AdminController.php` (~lignes 339, 369, 384) et `app/controllers/LigneCommandeController.php` (~lignes 100, 126)

**Problème :** `Produit::updateRecord($id, $_POST)` passe tout le corps de la requête directement au modèle. Un attaquant admin peut envoyer des champs non prévus (`id_artisan`, `actif`, etc.) qui, s'ils figurent dans `$fields`, seront écrits en base.

**Fix attendu :** extraire manuellement uniquement les champs autorisés par contexte, comme le fait déjà `buildModelPayload()` dans `updateUser()`.

#### 2. Comparaisons de rôle faibles `!=` au lieu de `!==` (Critique)

**Où :** `app/controllers/AdminController.php` (~ligne 574), `app/controllers/ProductController.php`, `app/controllers/OrderController.php`

**Problème :** PHP type juggling — `true != 1` vaut `false`, ce qui pourrait traiter une session corrompue contenant `true` comme un rôle admin.

**Fix attendu :** remplacer `!=` par `!==` et `==` par `===` partout sur les comparaisons de rôle.

#### 3. AvisController — modification cross-utilisateur (Haute)

**Où :** `app/controllers/AvisController.php`

**Problème :** vérifier que `id_utilisateur` ne peut pas être forcé dans le payload lors d'un PUT. Si non exclu, un client peut revendiquer l'avis d'un autre.

**Fix attendu :** forcer `id_utilisateur` à la valeur de la session, jamais du POST.

#### 4. Cookie de session sans flag `Secure` par défaut (Moyenne)

**Où :** `app/config/app.php`

**Problème :** `cookie_secure` vaut `0` par défaut. Sans ce flag, le cookie de session peut transiter sur HTTP non chiffré (Man-in-the-Middle sur Wi-Fi partagé).

**Fix attendu :** définir `SESSION_COOKIE_SECURE=1` sur le serveur de production (variable d'environnement, pas de changement de code).

#### 5. Erreurs du service IA exposées au client (Moyenne)

**Où :** `app/controllers/AiController.php`

**Problème :** `$this->respond(502, 'Le service AI a retourné une erreur: ' . $decoded['error'])` expose les messages internes d'Ollama (chemins, stack, config).

**Fix attendu :** remplacer par un message générique : `"Le service IA est temporairement indisponible."`.

#### 6. Pas de rate limiting sur `/api/ai/chat` (Moyenne)

**Problème :** un utilisateur authentifié peut spammer l'endpoint IA sans limite. Risque de déni de service.

**Fix attendu :** appliquer un `SlidingWindowLimiter` sur cet endpoint (ex. 10 req/min par utilisateur).

#### 7. Credentials en dur dans le code (Rappel critique)

`app/config/databaseConfig.server.php` contient les credentials de production (`user: project02`, `password: Project02@4598783`). Ce fichier est **non committé** et doit le rester absolument. L'idéal à terme est de passer par `getenv()` avec des variables d'environnement serveur.
