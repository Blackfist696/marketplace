# Note frontend - Integration MVP Ollama

Date: 2026-06-10
Contexte: un endpoint backend MVP est disponible pour proxy vers Ollama et est maintenant branché à l’interface frontend.

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

Le backend accepte aussi un payload JSON brut avec le champ `prompt` en `php://input`.

Reponse succes (HTTP 200):

```json
{
  "status": 200,
  "message": "Reponse AI",
  "data": {
    "reply": "...texte du modele...",
    "model": "gpt-oss:120b-cloud",
    "correlation_id": "..."
  }
}
```

Erreurs possibles:
- 400: prompt absent ou trop long
- 401: utilisateur non authentifie
- 502: echec upstream Ollama / reponse invalide / erreur renvoyee par le modele
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
- Modele principal et modele de secours configures cote backend (`gpt-oss:120b-cloud` par defaut, avec fallback configurable).
- Le backend interroge aussi l’endpoint `/api/tags` d’Ollama pour choisir un modele disponible si possible.

## Evolutions prevues (post-MVP)

- Streaming token par token pour UX chat temps reel.
- Historique de conversation (liste messages) et contexte multi-tour.
- Parametres modeles exposes de facon controlee (temperature, max tokens).
- Rate-limit dedie AI.
