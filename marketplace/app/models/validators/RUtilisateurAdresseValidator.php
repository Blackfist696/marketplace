<?php

namespace App\Models\Validators;

/**
 * Validateur des donnees r_utilisateur_adresse.
 */
class RUtilisateurAdresseValidator extends AbstractValidator
{
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['id_utilisateur', 'id_adresse']);
        $this->validateNumeric('id_utilisateur', $data);
        $this->validateNumeric('id_adresse', $data);

        return $this->result;
    }
}
