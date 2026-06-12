from pathlib import Path
root = Path(r'c:\laragon\www\project02\marketplace')
files = sorted(list((root/'app').rglob('*.php')) + [root/'public'/'index.php'])

def description_for(path: Path) -> str:
    rel = path.relative_to(root).as_posix()
    if rel == 'public/index.php':
        return 'Point d’entrée HTTP du backend. Ce script reçoit la requête web, sert les assets statiques et délègue le traitement au bootstrap Slim.'
    parts = rel.split('/')
    if parts[1] == 'controllers':
        return f'Contrôleur backend pour la logique métier liée à {Path(parts[-1]).stem.lower()}. Le fichier regroupe les actions HTTP associées à cette ressource.'
    if parts[1] == 'models':
        return f'Modèle métier représentant la ressource {Path(parts[-1]).stem.lower()} et encapsulant les opérations de persistance associées.'
    if parts[1] == 'middleware':
        return 'Middleware HTTP chargé de contrôler le flux de la requête avant l’exécution de la logique métier.'
    if parts[1] == 'core':
        return 'Composant central du framework backend utilisé pour fournir une infrastructure réutilisable à l’application.'
    if parts[1] == 'config':
        return 'Configuration applicative du backend. Ce fichier centralise les réglages métier et techniques utilisés par l’application.'
    if parts[1] == 'security':
        return 'Composant de sécurité du backend. Il encapsule les mécanismes de protection et d’authentification autour des routes sensibles.'
    if rel.startswith('app/seed.php'):
        return 'Script de mise à jour initiale des données de test et de développement pour le marketplace.'
    return 'Composant PHP du backend. Il participe à l’implémentation de la logique applicative et du pipeline HTTP.'

for path in files:
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8')
    if text.startswith('<?php') and '/**' in text[:400]:
        continue
    if not text.startswith('<?php'):
        continue
    desc = description_for(path)
    header = f"<?php\n\n/**\n * {desc.replace(chr(10), chr(10) + ' * ')}\n */\n"
    rest = text[len('<?php'):] if text.startswith('<?php') else text
    if rest.startswith('\n'):
        rest = rest[1:]
    path.write_text(header + rest, encoding='utf-8')
