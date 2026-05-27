<?php

namespace App\Models\Validators;

/**
 * Validateur des donnees classe (categorie-produit).
 */
class ClasseValidator extends AbstractValidator
{
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['id_categorie', 'id_produit']);
        $this->validateNumeric('id_categorie', $data);
        $this->validateNumeric('id_produit', $data);

        return $this->result;
    }
}
