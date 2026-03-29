Intégration Angular (développement)

Prérequis
- Node.js >= 20.19 (Windows: installer depuis https://nodejs.org/ ou utiliser nvm-windows)
- npm (fourni avec Node)

Scaffold et lancement (dev)
1. Dans le dossier du projet :
   ```powershell
   cd "C:\MAMP\htdocs\Projet02\test slim"
   npx @angular/cli@latest new frontend --routing --style=scss
   cd frontend
   npm install
   ```
2. Démarrer Angular en dev avec proxy vers Slim :
   ```powershell
   ng serve --proxy-config proxy.conf.json --port 4200
   ```
3. Lancer Slim (depuis le dossier `Backend`) :
   ```powershell
   cd Backend
   php -S 127.0.0.1:8080 index.php
   ```

Remarques
- Pendant le dev, utilisez `ng serve` pour le frontend (hot-reload) et le serveur PHP pour l'API.
-- En production, `ng build --configuration production` génèrera des fichiers statiques que vous pouvez copier dans `Backend/public/`.
-- J'ai ajouté une route catch-all dans `Backend/index.php` pour servir `Backend/public/index.html` en production.

## API — Documentation rapide

Endpoints disponibles (JSON):

- `GET /api/home` — informations d'accueil (titre, message).
- `GET /api/products` — liste des produits et état du panier.
- `POST /api/products/add/{id}` — ajoute le produit `{id}` au panier. Réponse JSON `{ "success": true, "cart": ... }`.
- `POST /api/products/remove/{id}` — retire le produit `{id}` du panier. Réponse JSON `{ "success": true, "cart": ... }`.
- `POST /api/clear-cart` — vide le panier. Réponse JSON `{ "success": true, "cart": [] }`.
- `GET /api/contact` — informations de contact (adresse, email, horaires).
- `POST /api/send-contact` — envoi d'un message de contact (body form/urlencoded ou JSON). Réponse JSON `{ "success": true, "received": {...} }`.
- `GET /api/validate-order` — endpoint placeholder pour valider une commande, retourne `{ "success": true }`.

### Exemples

- curl (GET produits):

```bash
curl http://127.0.0.1:8080/api/products
```

- curl (ajout au panier):

```bash
curl -X POST http://127.0.0.1:8080/api/products/add/3
```

### Angular (HttpClient) — exemple d'appel au backend via le proxy

```ts
// src/app/services/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
   constructor(private http: HttpClient) {}

   getProducts() {
      return this.http.get('/api/products');
   }

   addToCart(id: number) {
      return this.http.post(`/api/products/add/${id}`, {});
   }
}
```

Remarques

- Le développement utilise `ng serve` (port 4200) et le fichier `frontend/proxy.conf.json` redirige `/api` vers `http://127.0.0.1:8080`.
- Les vues PHP (`app/Views/*.php`) sont conservées pour compatibilité mais sont dépréciées : privilégiez l'API JSON et Angular pour la partie vue.

````
