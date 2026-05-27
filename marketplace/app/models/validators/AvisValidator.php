<?php

namespace App\Models\Validators;

/**
 * Validateur des donnees avis.
 */
class AvisValidator extends AbstractValidator
{
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['note', 'id_utilisateur', 'id_produit']);
        $this->validateNumeric('note', $data);
        $this->validateNumeric('id_utilisateur', $data);
        $this->validateNumeric('id_produit', $data);

        if (isset($data['note']) && (!is_numeric($data['note']) || (int) $data['note'] < 1 || (int) $data['note'] > 5)) {
            $this->result->addError('note', 'La note doit etre comprise entre 1 et 5.');
        }

        if (isset($data['valide']) && $data['valide'] !== '' && !in_array($data['valide'], [0, 1, '0', '1', true, false], true)) {
            $this->result->addError('valide', 'Le champ valide doit etre 0 ou 1.');
        }

        return $this->result;
    }
}
