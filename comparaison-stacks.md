# Comparaison des stacks — Stage NSI IT vs Projet Marketplace

## Notes de base (existantes)

### Correspondance des rôles : Java 21 vs PHP

| Votre Stack Java 21 (NSI IT / ERA) | Équivalent PHP moderne (Slim / PDO) | Rôle exact |
|---|---|---|
| Liquibase (Changelogs XML/YAML) | Scripts SQL manuels / Phinx | Gestion du schéma BDD par versions |
| Spring Data JPA / Hibernate | PDO pur (requêtes SQL manuelles) | Accès et mapping des données |
| JDBC (masqué par Hibernate) | PDO (visible dans Database.php) | Couche basse de connexion au pilote |
| `public record UserDTO(...)` | Classe PHP ordinaire / array | Objet de transport de données |
| MapStruct (génération à la compilation) | Mapping manuel dans les contrôleurs | Conversion entité ↔ DTO |
| Spring Security (ROLE_RESPONSABLE) | RoleMiddleware.php + $_SESSION | Contrôle d'accès par rôle |
| `@Transactional` | `$pdo->beginTransaction()` | Gestion des transactions |

---

## Nouvelles comparaisons à ajouter

### 1. La couche ORM vs PDO brut

#### Java (Hibernate) — ce que vous faites chez NSI IT
```java
// Hibernate génère le SQL automatiquement depuis les annotations
@Entity
@Table(name = "employee")
public class EmployeeEntity {
    @Id @Column(name = "code")
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bu_code")
    private BusinessUnitEntity businessUnit;
}
// Spring Data : une ligne suffit pour une requête paginée
Page<Employee> findByBusinessUnitCode(String code, Pageable pageable);
```

#### PHP (PDO brut) — ce que fait le projet Marketplace
```php
// PDO : tout le SQL est écrit manuellement dans le modèle
public function getByArtisan(int $id): array {
    $stmt = $this->pdo->prepare(
        'SELECT * FROM produit WHERE id_artisan = ? ORDER BY date_creation DESC'
    );
    $stmt->execute([$id]);
    return $stmt->fetchAll();
}
```

**Différence clé :** Hibernate abstrait complètement le SQL — vous déclarez *ce que vous voulez*, pas *comment l'obtenir*. PDO vous force à écrire chaque requête SQL, ce qui donne un contrôle total mais demande plus de code.

---

### 2. Le problème N+1 et comment chaque stack le gère

Le problème N+1 : pour afficher 100 produits avec leur artisan, une mauvaise implémentation fait 1 requête pour les produits + 100 requêtes pour les artisans (une par produit).

#### Java (Hibernate) — solution déclarative
```java
// Hibernate résout N+1 avec une seule annotation
@EntityGraph(attributePaths = {"businessUnit", "employeeTitles"})
List<Employee> findAll();
// Génère un seul JOIN SQL, pas 1+N requêtes
```

#### PHP (PDO) — solution manuelle
```php
// En PHP, il faut écrire le JOIN à la main
$stmt = $pdo->prepare(
    'SELECT p.*, u.nom as artisan_nom
     FROM produit p
     JOIN utilisateur u ON u.id_utilisateur = p.id_artisan
     WHERE p.actif = 1'
);
```

---

### 3. Les transactions : déclaratif vs impératif

#### Java — `@Transactional` (déclaratif)
```java
@Service
public class CommandeService {
    @Transactional  // Spring gère commit/rollback automatiquement
    public Commande creerCommande(CommandeDTO dto) {
        Commande c = commandeRepo.save(mapper.toEntity(dto));
        stockService.decrementerStock(dto.getIdProduit());
        // Si stockService lance une exception → rollback automatique
        return c;
    }
}
```

#### PHP — `beginTransaction()` (impératif)
```php
// Dans le marketplace, les transactions doivent être gérées manuellement
$pdo->beginTransaction();
try {
    $stmt = $pdo->prepare('INSERT INTO commande ...');
    $stmt->execute([...]);
    $stmt2 = $pdo->prepare('UPDATE produit SET stock = stock - ? ...');
    $stmt2->execute([...]);
    $pdo->commit();
} catch (PDOException $e) {
    $pdo->rollBack();
    throw $e;
}
```

---

### 4. La sérialisation JSON : automatique vs manuelle

#### Java — Spring Boot sérialise automatiquement
```java
// @RestController + Jackson : l'objet est converti en JSON sans code
@GetMapping("/api/produits/{id}")
public ProductDTO getById(@PathVariable Long id) {
    return service.findById(id); // Jackson sérialise automatiquement
}
// Réponse : {"id": 1, "nom": "Bol en bois", "prix": 24.99}
```

#### PHP — JsonResponder encode manuellement
```php
// Dans le marketplace, JsonResponder doit encoder explicitement
public static function write(Response $response, int $status, array $data): Response {
    $response->getBody()->write(json_encode($data));
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus($status);
}
```

---

### 5. La pagination : automatique vs manuelle

#### Java — `Pageable` de Spring Data
```java
// Spring Data gère LIMIT/OFFSET + COUNT automatiquement
@GetMapping("/api/employees")
public Page<EmployeeDTO> search(
    @RequestBody SearchCriteria criteria,
    Pageable pageable  // page=0&size=20&sort=lastName,asc dans l'URL
) {
    return service.search(criteria, pageable);
    // Génère : SELECT ... LIMIT 20 OFFSET 0 + SELECT COUNT(*)
}
```

#### PHP — LIMIT/OFFSET manuel
```php
// Dans le marketplace, la pagination est absente ou à écrire manuellement
$stmt = $pdo->prepare('SELECT * FROM produit LIMIT :limit OFFSET :offset');
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', ($page - 1) * $limit, PDO::PARAM_INT);
```

---

### 6. L'injection de dépendances : conteneur IoC vs new

#### Java — Spring IoC Container
```java
// Spring instancie et injecte automatiquement les dépendances
@Service
public class EmployeeService extends AbstractCodeService<...> {
    // Spring trouve ProduitRepository dans le conteneur et l'injecte
    public EmployeeService(EmployeeRepository repo, EmployeeMapper mapper) {
        super(repo, mapper);
    }
}
// Aucun new EmployeeService() n'est jamais écrit
```

#### PHP — instanciation manuelle
```php
// Dans le marketplace : pas de conteneur IoC, les dépendances sont
// soit créées manuellement, soit passées via le constructeur du contrôleur
public function __construct() {
    $this->model = new ProduitModel();
    // Database::getConnection() est un singleton maison
}
```

---

### 7. La sécurité des types : Java strict vs PHP graduel

#### Java — typage fort à la compilation
```java
// Impossible de passer un String où un Long est attendu : erreur à la compilation
public record EmployeeDTO(String code, String firstName, LocalDate birthDate) {}
// LocalDate birthDate est un type riche : impossible d'y mettre "pas une date"
```

#### PHP — typage graduel (optionnel)
```php
// PHP permet le typage fort depuis PHP 7, mais reste optionnel
interface Produit {
    public function getPrix(): float;  // déclaré
}
// Sans déclaration de type, PHP accepte n'importe quoi → erreur à l'exécution
// TypeScript dans le frontend compense avec des interfaces strictes
```

---

### 8. La génération de code : Plop (NSI IT) vs rien (Marketplace)

| Aspect | NSI IT (Plop + JCube) | Marketplace (Slim) |
|---|---|---|
| Création d'une nouvelle entité | `npm run plop` → 11 fichiers générés | Créer manuellement Model + Controller |
| Cohérence structurelle | Garantie par Plop | Dépend du développeur |
| Temps de création | ~5 minutes | ~30-60 minutes |
| SQL de migration | Liquibase changeset généré | Script SQL écrit à la main |
| Risque d'oubli | Quasi nul (Plop vérifie) | Élevé (oublier un fichier = bug) |

---

### 9. L'authentification : token JWT vs session PHP

| Aspect | NSI IT (Spring Security + JWT) | Marketplace (Session PHP) |
|---|---|---|
| Mécanisme | Token JWT signé dans le header Authorization | Cookie PHPSESSID + $_SESSION |
| Stockage état | Stateless (token auto-suffisant) | Stateful (session côté serveur) |
| Scalabilité | Facile (pas d'état serveur) | Complexe (sessions partagées entre serveurs) |
| Vérification | Vérification de la signature JWT | Lecture de $_SESSION['user_id'] |
| Expiration | Encodée dans le token (exp claim) | Gérée par PHP session.gc_maxlifetime |
| Angular | Header `Authorization: Bearer <token>` | Cookie envoyé via `withCredentials: true` |

---

### 10. Le routing : annotations Java vs routes PHP explicites

#### Java (Spring Boot)
```java
// L'URL est déclarée directement sur la méthode avec @GetMapping
@RestController
@RequestMapping("/api/employees")
public class EmployeeController extends AbstractCodeController<...> {
    @GetMapping("/{code}")
    public EmployeeDTO findByCode(@PathVariable String code) { ... }

    @PostMapping("/search")  // POST pour la recherche paginée (convention NSI IT)
    public Page<EmployeeDTO> search(@RequestBody SearchCriteria c, Pageable p) { ... }
}
```

#### PHP (Slim 4)
```php
// Les routes sont centralisées dans routes.php — séparation claire
$app->get('/api/produits/{id}', [ProductController::class, 'getById']);
$app->post('/api/produits', [ProductController::class, 'create']);
$app->options('/{routes:.+}', function($req, $res) { return $res; }); // CORS preflight
```

**Différence clé :** Spring colle la route à la méthode (couplage fort mais pratique). Slim centralise toutes les routes dans un fichier (vue d'ensemble immédiate, meilleure séparation).

---

## Questions pour approfondir les différences

### Groupe A — Architecture et mapping

1. **DTO et mapping :** Dans le projet NSI IT, MapStruct génère le code de mapping Entity→DTO *à la compilation*, sans réflexion à l'exécution. Dans le marketplace PHP, le mapping est manuel (tableau PHP). Quel est l'impact sur la maintenabilité si un champ change de nom dans la base de données ?

2. **Records Java vs classes PHP :** Un `record Java 21` est immuable par construction — aucun setter, aucune modification possible après création. En PHP, une `readonly class` offre la même garantie depuis PHP 8.2. Dans le marketplace, les DTO sont-ils immuables ? Quelles seraient les conséquences d'un objet modifiable utilisé comme DTO ?

3. **La couche Mapper :** JCube impose une couche Mapper dédiée (MapStruct) entre Entity et DTO. Le marketplace Slim n'a pas cette couche — le contrôleur retourne directement les données du modèle. Quels risques cela pose-t-il si on veut exposer une API publique ? (champs sensibles, structure interne exposée)

4. **Constructor Expression JPQL :** `SELECT new com.example.EmployeeDTO(e.code, e.firstName) FROM Employee e` charge uniquement 2 colonnes sur 15. Dans le marketplace, `SELECT *` est souvent utilisé. Comment mesureriez-vous l'impact sur les performances si la table `produit` avait 50 colonnes ?

### Groupe B — Gestion de base de données

5. **Liquibase vs scripts SQL manuels :** Liquibase garantit qu'un changeset n'est appliqué qu'une seule fois sur chaque environnement (via la table `DATABASECHANGELOG`). Dans le marketplace, comment s'assure-t-on que la base de données de prod et de dev sont synchronisées ? Quel risque si un développeur applique un script deux fois ?

6. **Hibernate Dirty Checking :** Hibernate surveille automatiquement les modifications des entités managées et génère un UPDATE au flush. En PHP/PDO, un UPDATE doit être écrit explicitement. Quels bugs peut-on introduire si on oublie d'appeler `execute()` dans un modèle PHP ?

7. **Lazy Loading :** `@ManyToOne(fetch = FetchType.LAZY)` dans Hibernate ne charge la relation que si on y accède. Dans le marketplace, une jointure SQL charge toujours toutes les données jointes. Comment le marketplace gère-t-il la performance des routes qui n'ont pas besoin des données de l'artisan pour afficher la liste des produits ?

8. **Le problème N+1 :** Si le marketplace affiche 50 commandes avec le détail de chaque artisan, combien de requêtes SQL sont exécutées sans JOIN explicite ? Comment Hibernate résout-il ce problème avec `@EntityGraph` ou `JOIN FETCH` ?

### Groupe C — Middleware et sécurité

9. **Ordre des middlewares :** Slim 4 utilise une pile LIFO (le dernier ajouté s'exécute en premier). Spring Boot utilise une `FilterChain` dans l'ordre d'ajout. Dans le marketplace, si on ajoute `AuthMiddleware` avant `CorsMiddleware`, que se passe-t-il quand une requête OPTIONS preflight arrive sans cookie de session ?

10. **Stateless vs Stateful :** JWT (NSI IT) est stateless — le serveur ne stocke rien, le token contient tout. `$_SESSION` PHP (Marketplace) est stateful — le serveur stocke l'état en fichier ou mémoire. Si on déploie le marketplace sur 3 serveurs en parallèle (load balancer), quel problème apparaît avec les sessions PHP et comment le résoudre ?

11. **Spring Security vs double protection Angular/PHP :** NSI IT utilise `@PreAuthorize("hasRole('ROLE_RESPONSABLE')")` directement sur les méthodes du service — impossible d'appeler la méthode sans le bon rôle même depuis un autre service interne. Dans le marketplace, `RoleMiddleware` ne protège que les routes HTTP. Si un `AdminController` appelle une méthode d'un autre contrôleur en interne, la vérification de rôle est-elle appliquée ?

### Groupe D — Performance et scalabilité

12. **Connection Pooling :** Hibernate + HikariCP maintient un pool de connexions JDBC réutilisées entre les requêtes. Dans le marketplace, `Database::getConnection()` crée un singleton PDO par requête PHP (le processus PHP redémarre à chaque requête). Comment cela impacte-t-il les performances sous forte charge ?

13. **La JVM vs PHP :** La JVM compile le bytecode Java en code natif (JIT) au fil des appels répétés — les premières requêtes sont lentes (warm-up), les suivantes très rapides. PHP interprète le code à chaque requête (avec OPcache pour mitiger). Pour une API appelée 1000 fois par seconde, laquelle est plus rapide à l'état stable ? Pourquoi ?

14. **Pagination côté serveur :** Le `LazyListManager` de NgCube envoie toujours un `POST /search` avec `page` et `size` — seule la page courante est chargée. Dans le marketplace, si `getAll()` retourne tous les produits sans pagination et qu'il y en a 10 000, que se passe-t-il en mémoire côté PHP et côté Angular ?

### Groupe E — Frontend et communication

15. **FormData vs JSON :** Le marketplace utilise `FormData` pour les POST car PHP lit `$_POST`. Spring Boot + Jackson désérialise directement du JSON dans un objet Java (`@RequestBody CommandeDTO dto`). Quel format est plus adapté pour transmettre des fichiers (images de produits) ? Quel format est plus adapté pour des structures imbriquées complexes ?

16. **CORS et withCredentials :** Le marketplace nécessite `withCredentials: true` + `Access-Control-Allow-Credentials: true` côté PHP pour transmettre le cookie de session. NSI IT avec JWT n'a pas ce besoin — le token est dans le header `Authorization`. Quelles sont les implications de sécurité de `withCredentials: true` par rapport à un token JWT ?

17. **Signals Angular dans les deux projets :** Les deux projets utilisent Angular 21 avec des Signals. Dans NSI IT, `manager.content()` est un Signal alimenté par le `LazyListManager` (NgCube). Dans le marketplace, `cart.service.ts` expose `lines = signal<CartLine[]>([])` rechargé manuellement après chaque mutation. Quelle approche est plus robuste face à une erreur réseau ? Pourquoi ?

18. **TypeScript et interfaces :** Dans les deux projets, des interfaces TypeScript reflètent la structure des données backend. Dans NSI IT, les champs TypeScript correspondent aux noms Java (camelCase). Dans le marketplace, ils correspondent aux noms SQL PHP (snake_case : `id_produit`, `prix_ht`). Quel impact sur la lisibilité ? Existe-t-il des outils pour automatiser la génération de ces interfaces depuis le backend ?

### Groupe F — Maintenabilité et conventions

19. **Convention over Configuration :** JCube impose des conventions strictes (5 couches, noms de fichiers, patterns de mapping) — tout développeur NSI comprend n'importe quelle feature en moins d'une heure. Slim n'impose aucune convention — chaque développeur du marketplace peut structurer ses contrôleurs différemment. Quels sont les avantages et inconvénients de chaque approche pour un projet à 5 développeurs ?

20. **Tests :** Spring Boot propose des tranches de test isolées (`@WebMvcTest`, `@DataJpaTest`) qui démarrent uniquement la partie testée. PHPUnit peut tester les modèles PHP, mais tester le middleware de Slim requiert une configuration plus manuelle. Comment tester unitairement que `AuthMiddleware` retourne bien un 401 quand `$_SESSION['user_id']` est absent, sans démarrer un vrai serveur PHP ?

21. **Documentation automatique :** Spring Boot + Springdoc peut générer automatiquement une documentation Swagger/OpenAPI depuis les annotations `@RestController`. Le marketplace Slim n'a pas de documentation API automatique. Comment un nouveau développeur sait-il quels endpoints existent, quels paramètres ils acceptent et quel format ils retournent ?

---

## Tableau récapitulatif final

| Concept | NSI IT (Java 21 / Spring Boot / JCube) | Marketplace (PHP 8 / Slim 4 / PDO) |
|---|---|---|
| **ORM** | Hibernate (automatique) | PDO pur (manuel) |
| **Migrations BDD** | Liquibase (versionné, déclaratif) | Scripts SQL manuels |
| **DTO** | Java Record (immuable, typé) | Tableau PHP ou classe simple |
| **Mapping entité→DTO** | MapStruct (compilation) | Manuel dans contrôleur |
| **Routing** | Annotations `@GetMapping` | `routes.php` centralisé |
| **Pagination** | `Pageable` automatique | LIMIT/OFFSET manuel |
| **Authentification** | JWT + Spring Security | Session PHP + Cookie |
| **DI / IoC** | Spring Container | Instanciation manuelle |
| **Transactions** | `@Transactional` (déclaratif) | `beginTransaction()` (impératif) |
| **JSON** | Jackson (automatique) | `json_encode()` + JsonResponder |
| **Tests** | JUnit + `@WebMvcTest` | PHPUnit |
| **Génération de code** | Plop (11 fichiers/entité) | Aucune |
| **Conventions** | Imposées par JCube | Libres (Slim) |
| **Typage** | Fort (compilation) | Graduel (exécution) |
| **Scalabilité session** | Stateless (JWT) | Stateful (fichiers serveur) |
| **Connexion BDD** | HikariCP pool | Singleton PDO par process |
