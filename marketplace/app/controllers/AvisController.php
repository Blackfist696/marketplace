<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/AvisModel.php';

use App\Models\Avis;
use App\Security\Auth\AuthContext;
use App\Security\Authorization\OwnershipGuard;

class AvisController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Liste des avis', Avis::getAll());
    }

    public function show(int $id): void
    {
        $item = Avis::getById($id);
        if ($item === null) {
            $this->respond(404, 'Avis introuvable');
            return;
        }

        $this->respond(200, 'Avis', $item);
    }

    public function indexByProduit(int $idProduit): void
    {
        $this->respond(200, 'Avis du produit', Avis::getBy('id_produit', $idProduit));
    }

    public function store(): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $data = $_POST;
        if (!isset($data['date_avis'])) {
            $data['date_avis'] = date('Y-m-d H:i:s');
        }

        if ($auth['is_admin']) {
            if (empty($data['id_utilisateur'])) {
                $this->respond(400, 'id_utilisateur est requis pour un administrateur');
                return;
            }
        } else {
            $data['id_utilisateur'] = $auth['user_id'];
        }

        $id = Avis::createRecord($data);
        $this->respond(201, 'Avis cree', ['id_avis' => $id]);
    }

    public function update(int $id): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $avis = Avis::getById($id);
        if ($avis === null) {
            $this->respond(404, 'Avis introuvable');
            return;
        }

        if (!OwnershipGuard::canAccessAvis($avis, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $data = $_POST;
        if (!$auth['is_admin']) {
            unset($data['id_utilisateur']);
        }

        $ok = Avis::updateRecord($id, $data);
        $this->respond($ok ? 200 : 400, $ok ? 'Avis mis a jour' : 'Echec de mise a jour');
    }

    public function destroy(int $id): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $avis = Avis::getById($id);
        if ($avis === null) {
            $this->respond(404, 'Avis introuvable');
            return;
        }

        if (!OwnershipGuard::canAccessAvis($avis, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $ok = Avis::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Avis supprime' : 'Echec de suppression');
    }
}
