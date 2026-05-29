<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/StatistiqueArtisanModel.php';
require_once __DIR__ . '/../models/ArtisanModel.php';

use App\Models\Artisan;
use App\Models\StatistiqueArtisan;

class StatistiqueArtisanController extends Controller
{
    public function index(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $this->respond(200, 'Liste des statistiques artisan', StatistiqueArtisan::getAll());
    }

    public function show(int $id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $item = StatistiqueArtisan::getById($id);
        if ($item === null) {
            $this->respond(404, 'Statistique artisan introuvable');
            return;
        }

        $this->respond(200, 'Statistique artisan', $item);
    }

    public function indexByArtisan(int $idArtisan): void
    {
        $sessionUser = $this->requireSessionUser();
        if ($sessionUser === false) {
            return;
        }

        if ($sessionUser['role_id'] !== 1) {
            if ($sessionUser['role_id'] !== 2) {
                $this->respond(403, 'Acces interdit');
                return;
            }

            $artisans = Artisan::getBy('id_utilisateur', $sessionUser['user_id']);
            if (empty($artisans)) {
                $this->respond(404, 'Profil artisan introuvable');
                return;
            }

            $currentArtisanId = (int) $artisans[0]['id_artisan'];
            if ($currentArtisanId !== $idArtisan) {
                $this->respond(403, 'Acces interdit');
                return;
            }
        }

        $this->respond(200, 'Statistiques de l artisan', StatistiqueArtisan::getBy('id_artisan', $idArtisan));
    }

    public function store(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $data = $_POST;
        if (!isset($data['date_consultation'])) {
            $data['date_consultation'] = date('Y-m-d H:i:s');
        }

        $id = StatistiqueArtisan::createRecord($data);
        $this->respond(201, 'Statistique artisan creee', ['id_statistique' => $id]);
    }

    public function update(int $id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $ok = StatistiqueArtisan::updateRecord($id, $_POST);
        $this->respond($ok ? 200 : 400, $ok ? 'Statistique artisan mise a jour' : 'Echec de mise a jour');
    }

    public function destroy(int $id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $ok = StatistiqueArtisan::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Statistique artisan supprimee' : 'Echec de suppression');
    }

    private function requireAdmin(): bool
    {
        $sessionUser = $this->requireSessionUser();
        if ($sessionUser === false) {
            return false;
        }

        if ($sessionUser['role_id'] !== 1) {
            $this->respond(403, 'Acces interdit');
            return false;
        }

        return true;
    }

    private function requireSessionUser(): array|false
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return false;
        }

        return [
            'user_id' => (int) $_SESSION['user_id'],
            'role_id' => (int) ($_SESSION['user_role'] ?? 0),
        ];
    }
}
