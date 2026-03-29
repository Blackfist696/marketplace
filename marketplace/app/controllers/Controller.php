<?php

namespace App\Controllers;

abstract class Controller
{
    protected function renderJson($data, int $status = 200): void
    {
        if (!headers_sent()) {
            header('Content-Type: application/json; charset=utf-8', true, $status);
        }

        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    protected function respond(int $status = 200, string $message = '', array $data = []): void
    {
        $payload = [
            'status' => $status,
            'message' => $message,
        ];

        if (!empty($data)) {
            $payload['data'] = $data;
        }

        $this->renderJson($payload, $status);
    }
}
