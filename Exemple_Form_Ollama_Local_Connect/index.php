<?php

//$OLLAMA_URL = 'http://localhost:11434/api/generate';
$OLLAMA_URL = 'http://localhost:11434/api/chat';
$MODEL      = 'mistral';          // Modèle Ollama à appeler
//$MODEL      = 'gpt-oss:120b-cloud';          // Modèle Ollama à appeler

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['prompt'])) {
    @ini_set('output_buffering', 0);
    @ini_set('zlib.output_compression', 0);
    header('Content-Type: text/plain; charset=utf-8');
    header('Transfer-Encoding: chunked');
    header('Cache-Control: no-cache');
    flush();

    $payload = json_encode([
        'model'  => $MODEL,
        'prompt' => trim($_POST['prompt']),
        'stream' => true
    ]);

    $ch = curl_init($OLLAMA_URL);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
    ]);

    curl_setopt($ch, CURLOPT_HEADERFUNCTION, function ($ch, $header) {
        return strlen($header);
    });

    curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($ch, $chunk) {
        echo $chunk;
        flush();
        return strlen($chunk);
    });

    curl_exec($ch);
    curl_close($ch);
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Chat Ollama – JSON‑parse & concat</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;background:#fafafa;margin:0;padding:20px;}
  #chat{border:1px solid #ddd;background:#fff;padding:10px;height:350px;overflow-y:auto;}
  #prompt{width:100%;height:80px;padding:5px;}
  button{padding:8px 15px;margin-top:5px;}
  .user{font-weight:bold;}
  .bot{color:#0066cc;}
  .error{color:#cc0000;}
</style>
</head>
<body>
<h2>Chat Ollama – JSON‑parse & concat</h2>

<div id="chat"></div>

<form id="chatForm">
  <textarea id="prompt" placeholder="Posez votre question…"></textarea><br>
  <button type="submit">Envoyer</button>
</form>

<script>
(async () => {
    const form = document.getElementById('chatForm');
    const chat = document.getElementById('chat');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const txt = document.getElementById('prompt').value.trim();
        if (!txt) return;

        // 1️⃣ Affichage du prompt utilisateur
        const pUser = document.createElement('p');
        pUser.className = 'user';
        pUser.textContent = 'Vous : ' + txt;
        chat.appendChild(pUser);
        chat.scrollTop = chat.scrollHeight;

        document.getElementById('prompt').value = '';

        // 2️⃣ Paragraphe où sera affichée la réponse finale
        const pBot = document.createElement('p');
        pBot.className = 'bot';
        chat.appendChild(pBot);

        try {
            const resp = await fetch('ai_stream3.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'prompt=' + encodeURIComponent(txt)
            });

            if (!resp.ok) {
                const err = await resp.text();
                const pErr = document.createElement('p');
                pErr.className = 'error';
                pErr.textContent = 'Erreur : ' + err;
                chat.appendChild(pErr);
                return;
            }

            /* ────── Lecture & parsing du flux ────── */
            const reader   = resp.body.getReader();
            const decoder  = new TextDecoder('utf-8');
            let buffer     = '';          // stocke le texte brut reçu
            let phrase     = '';          // stocke la concaténation finale

            while (true) {
                const {value, done} = await reader.read();
                if (done) break;
                // Ajout du nouveau fragment
                buffer += decoder.decode(value, {stream:true});

                // Séparer en lignes complètes (Ollama termine chaque objet JSON par '\n')
                const parts = buffer.split('\n');
                // La dernière partie peut être incomplète → on la conserve
                buffer = parts.pop();

                // Pour chaque ligne complète : parse JSON → concat response
                for (const line of parts) {
                    if (!line.trim()) continue;          // ignore lignes vides
                    try {
                        const obj = JSON.parse(line);
                        if (obj && typeof obj.response === 'string') {
                            phrase += obj.response;
                            // Mettre à jour l’affichage dès qu’un fragment est reçu
                            pBot.textContent = phrase;
                        }
                    } catch (e) {
                        // Ligne invalide – on la ignore (ou on log)
                        console.warn('JSON parse error on line:', line);
                    }
                }
            }

            // Traitement du dernier morceau éventuel
            if (buffer.trim()) {
                try {
                    const obj = JSON.parse(buffer.trim());
                    if (obj && typeof obj.response === 'string') {
                        phrase += obj.response;
                    }
                } catch (e) {
                    console.warn('JSON parse error on final buffer:', buffer);
                }
            }

            // Nettoyage de la phrase (espaces multiples, ponctuation)
            phrase = phrase.replace(/\s{2,}/g, ' ').trim();
            if (phrase && !/[.!?]$/.test(phrase)) phrase += '.';

            // Affichage final (si pas déjà affiché en cours)
            pBot.textContent = phrase || '—';
        } catch (ex) {
            const pErr = document.createElement('p');
            pErr.className = 'error';
            pErr.textContent = 'Erreur (JavaScript) : ' + ex.message;
            chat.appendChild(pErr);
        }
    });
})();
</script>
</body>
</html>
