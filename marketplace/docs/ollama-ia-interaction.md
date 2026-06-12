# Interaction IA Ollama dans le marketplace

Date: 2026-06-12

Ce document explique, de façon simple et détaillée, ce qui se passe lorsqu’un utilisateur pose une question à l’IA dans le marketplace, depuis le moment où il clique dans l’interface jusqu’au moment où la réponse apparaît à l’écran.

## 1. Objectif du flux IA

Le but du flux est simple :

- l’utilisateur écrit une demande dans l’interface,
- le site envoie cette demande au backend,
- le backend transmet la demande à Ollama,
- Ollama génère une réponse,
- le backend renvoie cette réponse au frontend,
- l’interface affiche la réponse à l’utilisateur.

Autrement dit, le site ne “répond” pas lui-même : il sert d’intermédiaire entre l’utilisateur et le modèle d’IA.

## 2. Chemin parcouru de bout en bout

### Étape 1 — L’utilisateur saisit une question
Exemple :

```text
"Donne-moi un résumé du produit #42"
```

Cette phrase est envoyée depuis la page du frontend.

### Étape 2 — Le frontend envoie la demande au backend
Le frontend utilise une requête HTTP de type POST vers l’endpoint backend.

Extrait de code côté Angular :

```ts
askAi(prompt: string) {
  return this.http.post<any>(`${this.base}/api/ai/chat`, { prompt }, { withCredentials: true });
}
```

Ce code signifie :

- on prépare un message avec la question de l’utilisateur,
- on l’envoie au backend,
- on précise que la session utilisateur doit être transmise aussi.

### Étape 3 — La requête passe par le backend
Le backend reçoit la requête sur la route suivante :

```text
/project02/api/ai/chat
```

Dans le projet, cette route est déclarée côté PHP.

Extrait de code :

```php
$register('POST', '/api/ai/chat', 'App\\Controllers\\AiController@chat', [$auth]);
```

Cela signifie que la requête POST sur cette URL est dirigée vers le contrôleur nommé `AiController`, méthode `chat`.

### Étape 4 — Le contrôleur vérifie la demande
Avant d’envoyer quoi que ce soit à Ollama, le contrôleur vérifie plusieurs points :

- le champ `prompt` est-il présent ?
- la question est-elle trop longue ?
- le service IA est-il disponible ?
- le modèle choisi est-il accessible ?

Extrait de code :

```php
$prompt = $this->extractPrompt();

if ($prompt === '') {
    $this->respond(400, 'Le champ prompt est requis.');
    return;
}

if (mb_strlen($prompt, 'UTF-8') > $this->maxPromptChars) {
    $this->respond(400, sprintf('Le prompt depasse la limite de %d caracteres.', $this->maxPromptChars));
    return;
}
```

En langage simple : on vérifie que la question est bien formulée et que l’on ne lui demande pas quelque chose de trop volumineux ou de trop ambigu.

### Étape 5 — Le backend construit la requête à envoyer à Ollama
Le backend ne transmet pas la question brute “telle quelle” sans structure. Il construit un objet JSON avec :

- le modèle à utiliser,
- le message utilisateur,
- un mode de réponse non-stream.

Extrait de code :

```php
$payload = [
    'model' => $selectedModel,
    'messages' => [
        ['role' => 'user', 'content' => $prompt],
    ],
    'stream' => false,
];
```

Ce format est celui attendu par Ollama.

### Étape 6 — Le backend contacte Ollama
Le backend réalise ensuite un appel HTTP vers le service Ollama installé localement.

Extrait de code :

```php
$ch = curl_init($this->ollamaUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedPayload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
]);
```

Le rôle du backend ici est de faire office de passerelle :

- il reçoit la question de l’utilisateur,
- il la transmet à Ollama,
- il récupère la réponse.

### Étape 7 — Ollama génère la réponse
Ollama reçoit la demande, interprète le texte, puis renvoie une réponse générée par le modèle.

En pratique, le modèle peut :

- résumer un produit,
- répondre à une question,
- reformuler un texte,
- proposer une aide simple.

### Étape 8 — Le backend reformate la réponse pour le frontend
Une fois la réponse reçue, le contrôleur ne la renvoie pas brutement : il l’encapsule dans un format cohérent pour l’interface.

Extrait de code :

```php
$this->respond(200, 'Reponse AI', [
    'reply' => $reply,
    'model' => (string) ($decoded['model'] ?? $selectedModel),
    'correlation_id' => $correlationId,
]);
```

Le frontend reçoit donc quelque chose de structuré, avec :

- `reply` : le texte final à afficher,
- `model` : le modèle utilisé,
- `correlation_id` : un identifiant utile pour le suivi et le debug.

### Étape 9 — Le frontend affiche la réponse
Enfin, le frontend affiche la réponse à l’utilisateur dans l’interface.

En langage simple : l’utilisateur a posé une question, le système l’a envoyée à une intelligence artificielle, et la réponse revient sous forme de texte lisible.

## 3. Version très simple pour les personnes non techniques

Si l’on résume en une image mentale :

- l’utilisateur écrit une question,
- le site la met dans une enveloppe sécurisée,
- le backend l’envoie à une machine de langage,
- la machine répond,
- le site récupère la réponse et l’affiche.

On peut comparer cela à un assistant qui ne répond pas directement sur la page, mais via un intermédiaire fiable.

## 4. Pourquoi le backend fait-il ce travail ?

Le backend n’est pas là “pour penser” à la place du modèle. Son rôle est de :

- vérifier que la demande est correcte,
- protéger l’application,
- éviter les erreurs et les abus,
- transmettre la demande à Ollama dans un format attendu,
- renvoyer une réponse propre au frontend.

## 5. Ce qui peut arriver en cas d’erreur

Le flux peut échouer dans plusieurs situations :

- le prompt est vide ou trop long ;
- l’utilisateur n’est pas authentifié ;
- Ollama ne répond pas ;
- la réponse reçue est vide ou invalide ;
- le modèle demandé n’est pas disponible.

Dans ces cas, le backend renvoie une erreur claire, par exemple :

- 400 : demande invalide,
- 401 : utilisateur non connecté,
- 502 : problème avec Ollama,
- 500 : panne technique côté backend.

## 6. Sécurité et protection autour du flux

Même si l’IA est un outil puissant, le système doit rester sûr. Les protections mises en place visent à éviter qu’une information malveillante ou mal formée ne soit traitée de façon dangereuse.

### Protection 1 — validation du contenu
On vérifie que la donnée reçue est bien présente et au bon format.

Extrait de code :

```php
public function validate(array $data): ValidationResult
{
    $this->validateRequired($data, ['date_consultation', 'ip_adress', 'id_produit', 'id_artisan']);
    $this->validateNumeric('id_artisan', $data);
    $this->validateNumeric('id_produit', $data);
    return $this->result;
}
```

### Protection 2 — nettoyage des données
Avant traitement ou stockage, les données sont nettoyées.

Extrait de code :

```php
protected static function sanitizeData(array $data): array
{
    return array_map(static fn($value) => static::sanitizeValue($value), $data);
}
```

### Protection 3 — requêtes préparées SQL
Pour les interactions avec la base de données, la requête SQL et les valeurs sont séparées.

Extrait de code :

```php
$stmt = static::getPDO()->prepare($sql);
foreach ($fields as $column => $value) {
    $stmt->bindValue(':' . $column, $value);
}
$stmt->execute();
```

### Protection 4 — gestion d’erreurs maîtrisée
Les erreurs ne sont pas laissées “à l’état brut” : elles sont traitées proprement.

Extrait de code :

```php
try {
    $id = StatistiqueArtisan::createRecord($data);
    $this->respond(201, 'Statistique artisan creee', ['id_statistique' => $id]);
} catch (\App\Models\Validators\ValidationException $exception) {
    $this->respond(422, 'Donnees de consultation invalides', ['errors' => $exception->getErrors()]);
}
```

## 7. Résumé final

Le flux IA Ollama est un chemin simple en apparence, mais il repose sur plusieurs couches de sécurité et de coordination :

1. l’utilisateur pose une question,
2. le frontend l’envoie au backend,
3. le backend valide et sécurise la demande,
4. le backend contacte Ollama,
5. Ollama génère la réponse,
6. le backend renvoie cette réponse au frontend,
7. l’interface affiche le résultat à l’utilisateur.

Le point essentiel à retenir est que l’IA n’est pas “branchée directement” à l’interface ; elle passe par une architecture de contrôle, de validation et de sécurité, ce qui rend l’ensemble plus fiable et plus robuste.
