<?php

namespace App\Models\Validators;

/**
 * Validateur des donnees ville.
 */
class VilleValidator extends AbstractValidator
{
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['id_pays']);
        $this->validateNumeric('id_pays', $data);

        if (isset($data['nom_ville']) && trim((string) $data['nom_ville']) !== '' && mb_strlen((string) $data['nom_ville']) < 2) {
            $this->result->addError('nom_ville', 'Le nom de la ville doit contenir au moins 2 caracteres.');
        }

        if (isset($data['code_postal']) && trim((string) $data['code_postal']) !== '' && !preg_match('/^[0-9A-Za-z\-\s]{3,10}$/', (string) $data['code_postal'])) {
            $this->result->addError('code_postal', 'Le code postal est invalide.');
        }

        return $this->result;
    }
}
