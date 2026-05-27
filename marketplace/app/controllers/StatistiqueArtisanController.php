<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/StatistiqueArtisanModel.php';

use App\Models\StatistiqueArtisan;

class StatistiqueArtisanController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Liste des statistiques artisan', StatistiqueArtisan::getAll());
    }

    public function show(int $id): void
    {
        $item = StatistiqueArtisan::getById($id);
        if ($item === null) {
            $this->respond(404, 'Statistique artisan introuvable');
            return;
        }

        $this->respond(200, 'Statistique artisan', $item);
    }

    public function indexByArtisan(int $idArtisan): void
    {
        $this->respond(200, 'Statistiques de l artisan', StatistiqueArtisan::getBy('id_artisan', $idArtisan));
    }

    public function store(): void
    {
        $data = $_POST;
        if (!isset($data['date_consultation'])) {
            $data['date_consultation'] = date('Y-m-d H:i:s');
        }

        $id = StatistiqueArtisan::createRecord($data);
        $this->respond(201, 'Statistique artisan creee', ['id_statistique' => $id]);
    }

    public function update(int $id): void
    {
        $ok = StatistiqueArtisan::updateRecord($id, $_POST);
        $this->respond($ok ? 200 : 400, $ok ? 'Statistique artisan mise a jour' : 'Echec de mise a jour');
    }

    public function destroy(int $id): void
    {
        $ok = StatistiqueArtisan::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Statistique artisan supprimee' : 'Echec de suppression');
    }
}
