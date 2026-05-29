<?php

namespace App\Security\Auth;

use App\Security\SessionSecurity;

final class AuthContext
{
    /**
     * @return array{user_id:int, role_id:int, is_admin:bool}|null
     */
    public static function current(): ?array
    {
        SessionSecurity::start();

        if (empty($_SESSION['user_id'])) {
            return null;
        }

        $userId = (int) $_SESSION['user_id'];
        $roleId = (int) ($_SESSION['user_role'] ?? 0);

        return [
            'user_id' => $userId,
            'role_id' => $roleId,
            'is_admin' => ($roleId === 1),
        ];
    }
}
