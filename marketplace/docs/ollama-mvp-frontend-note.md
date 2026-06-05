# Note frontend - Integration MVP Ollama

Date: 2026-06-05
Contexte: un endpoint backend MVP est disponible pour proxy vers Ollama.

## Endpoint backend a consommer

- Methode: POST
- URL: /project02/api/ai/chat
- Auth: OUI (session cookie, withCredentials)
- Content-Type: application/json

Payload minimum:

```json
{
  "prompt": "Donne-moi un resume du produit #42"
}
```

Reponse succes (HTTP 200):

```json
{
  "status": 200,
  "message": "Reponse AI",
  "data": {
    "reply": "...texte du modele...",
    "model": "mistral",
    "correlation_id": "..."
  }
}
```

Erreurs possibles:
- 400: prompt absent ou trop long
- 401: utilisateur non authentifie
- 502: echec upstream Ollama / reponse invalide
- 500: indisponibilite technique cote backend

## Exemple Angular (service)

```ts
askAi(prompt: string) {
  return this.http.post<any>(`${this.base}/api/ai/chat`, { prompt }, { withCredentials: true });
}
```

Notes:
- Afficher `res.data.reply` dans l'UI.
- Conserver `res.data.correlation_id` en debug/support utilisateur.
- Gerer explicitement 401 (rediriger login) et 502 (message temporaire utilisateur).

## Scope MVP

- Reponse non-stream (une seule reponse complete).
- Un seul message utilisateur par requete (pas de conversation persistante).
- Modele force cote backend (`mistral` par defaut).

## Evolutions prevues (post-MVP)

- Streaming token par token pour UX chat temps reel.
- Historique de conversation (liste messages) et contexte multi-tour.
- Parametres modeles exposes de facon controlee (temperature, max tokens).
- Rate-limit dedie AI.
