<?php

namespace App\Models\Validators;

/**
 * Validateur des données utilisateur.
 */
class UtilisateurValidator extends AbstractValidator
{
    /**
     * Valide les champs d'un utilisateur.
     *
     * @param array $data Données utilisateur.
     * @return ValidationResult Résultat de la validation.
     */
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['email', 'mot_de_passe', 'id_role']);
        $this->validateEmail('email', $data);

        if (isset($data['mot_de_passe']) && mb_strlen((string) $data['mot_de_passe']) < 6) {
            $this->result->addError('mot_de_passe', 'Le mot de passe doit contenir au moins 6 caractères.');
        }

        if (isset($data['id_role']) && !is_numeric($data['id_role'])) {
            $this->result->addError('id_role', 'Le rôle doit être un identifiant numérique.');
        }

        return $this->result;
    }

    public function validateLogin(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['email', 'mot_de_passe']);
        $this->validateEmail('email', $data);

        return $this->result;
    }
}
