<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/CommandeModel.php';

use App\Models\Commande;

class OrderController extends Controller
{
    public function index(): void
    {
        $orders = Commande::getAll();
        $this->respond(200, 'Commandes', $orders);
    }

    public function store(array $data = []): void
    {
        $data = $data ?: $_POST;
        $id = Commande::createRecord($data);
        $this->respond(201, 'Commande créée', ['id_commande' => $id]);
    }
}
