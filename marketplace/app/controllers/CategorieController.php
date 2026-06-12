<?php

/**
 * Contrôleur backend pour la logique métier liée à categoriecontroller. Le fichier regroupe les actions HTTP associées à cette ressource.
 */
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/CategorieModel.php';

use App\Models\Categorie;

class CategorieController extends Controller
{
    public function index(): void
    {
        $categories = Categorie::getBy('actif', 1);
        $this->respond(200, 'Liste des catégories', $categories);
    }

    public function show(array $args): void
    {
        $cat = Categorie::getById((int) $args['id']);
        if (!$cat) { $this->respond(404, 'Catégorie non trouvée'); return; }
        $this->respond(200, 'Catégorie', $cat);
    }
}
