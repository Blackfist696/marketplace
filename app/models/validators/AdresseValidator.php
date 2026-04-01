<?php

namespace App\Models\Validators;

/**
 * Validateur des données adresse.
 */
class AdresseValidator extends AbstractValidator
{
    /**
     * Valide les champs d'une adresse.
     *
     * @param array $data Données adresse.
     * @return ValidationResult Résultat de la validation.
     */
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, [
            'id_personne',
            'type_adresse',
            'rue',
            'numero',
            'code_postal',
            'ville',
            'pays',
        ]);

        $this->validateNumeric('id_personne', $data);
        $this->validateNumeric('numero', $data);

        if (isset($data['code_postal']) && trim((string) $data['code_postal']) !== '' && !preg_match('/^[0-9A-Za-z\-\s]{3,10}$/', $data['code_postal'])) {
            $this->result->addError('code_postal', 'Le code postal est invalide.');
        }

        if (isset($data['principale']) && $data['principale'] !== '' && !in_array($data['principale'], [0, 1, '0', '1', true, false], true)) {
            $this->result->addError('principale', 'Le champ principale doit être 0 ou 1.');
        }

        return $this->result;
    }
}
