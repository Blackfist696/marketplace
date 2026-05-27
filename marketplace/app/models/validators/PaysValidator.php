<?php

namespace App\Models\Validators;

/**
 * Validateur des donnees pays.
 */
class PaysValidator extends AbstractValidator
{
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['code_iso']);

        if (isset($data['nom_pays']) && trim((string) $data['nom_pays']) !== '' && mb_strlen((string) $data['nom_pays']) < 2) {
            $this->result->addError('nom_pays', 'Le nom du pays doit contenir au moins 2 caracteres.');
        }

        if (isset($data['code_iso']) && !preg_match('/^[A-Z]{2}$/', strtoupper((string) $data['code_iso']))) {
            $this->result->addError('code_iso', 'Le code ISO doit contenir 2 lettres majuscules.');
        }

        return $this->result;
    }
}
