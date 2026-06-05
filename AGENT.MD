# Memo: commande /create-agent (Copilot VS Code)

Ce document resume ce que permet la commande /create-agent.

## 1) Objectif

La commande /create-agent sert a creer un agent Copilot personnalise, avec:
- un role clair (ex: review securite, audit architecture, QA API),
- des regles de comportement,
- des outils autorises/restreints,
- un format de sortie attendu.

## 2) Portee possible

- Workspace (partage projet): .github/agents/*.agent.md
- Profil utilisateur (personnel): <profil>/agents/*.agent.md

## 3) Capacites principales

1. Definir un role specialise
- Exemple: "Agent de revue backend PHP".

2. Definir la decouverte/invocation
- description (obligatoire): sert a la decouverte par Copilot.
- name (optionnel): nom affiche.
- argument-hint (optionnel): guide utilisateur.

3. Controler les outils
- tools: limiter les outils a un minimum utile.
- Exemples:
  - [read, search] pour investigation en lecture seule,
  - [read, edit, search] pour correction sans terminal,
  - [] pour conversation sans outils.

4. Controler la disponibilite
- user-invocable: true/false
  - true: visible dans le picker.
  - false: utilisable en sous-agent seulement.
- disable-model-invocation: true/false
  - true: bloque l invocation par d autres agents.

5. Choisir le modele
- model: un modele fixe ou une liste de fallback.

6. Organiser la delegation
- agents: restreint quels sous-agents peuvent etre appeles.
- handoffs: organise les transitions entre agents.

7. Ajouter des hooks d automatisation
- hooks: execution de commandes a des moments cle.
- Evenements typiques:
  - SessionStart,
  - PreToolUse,
  - PostToolUse,
  - Stop.
- Usages:
  - bloquer commandes dangereuses,
  - lancer lint/format automatiquement,
  - injecter des controles de qualite.

8. Encadrer le comportement
- Contraintes explicites (ce que l agent ne doit jamais faire).
- Processus (etapes de travail imposees).
- Output format (structure de reponse standard).

## 4) Frontmatter typique (.agent.md)

```yaml
---
description: "Use when you need backend PHP security review"
name: "PHP Security Reviewer"
tools: [read, search, edit]
user-invocable: true
disable-model-invocation: false
argument-hint: "Fichier ou zone a auditer"
model: ["GPT-5 (copilot)"]
---
```

## 5) Exemples de patterns utiles

- Agent lecture seule (audit):
  - tools: [read, search]
- Agent correction code sans shell:
  - tools: [read, edit, search]
- Agent purement conversationnel:
  - tools: []

## 6) Bonnes pratiques

- Une responsabilite par agent (eviter les agents "couteau suisse").
- Description riche en mots-cles metier pour faciliter la delegation.
- Ensemble d outils minimal pour reduire les risques.
- Contraintes claires pour eviter les actions hors-perimetre.
- Verifier la syntaxe YAML (erreurs silencieuses frequentes).

## 7) Erreurs frequentes

- Description trop vague (agent peu ou jamais invoque).
- Trop d outils (comportement flou et moins fiable).
- Frontmatter YAML invalide.
- Role decrit qui ne correspond pas aux instructions du corps.

## 8) Difference rapide avec d autres mecanismes

- Instructions: regles globales, toujours presentes.
- Prompt: tache unique et ponctuelle.
- Skill: workflow cible, declenchable a la demande.
- Custom agent: persona specialisee avec outils/contraintes dedies.

## 9) Cas d usage concrets (marketplace)

1. Agent review backend PHP
- Verifie securite, regressions, validations d entree, erreurs API.

2. Agent architecture/doc
- Met a jour ARCHITECTURE.md selon les changements reels.

3. Agent QA API
- Controle endpoints, auth, statuts HTTP, coherence des reponses.

---
Derniere mise a jour: 2026-06-04
