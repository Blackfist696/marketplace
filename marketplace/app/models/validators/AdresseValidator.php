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
            'rue',
            'type_adresse',
        ]);

        if (array_key_exists('id_ville', $data) && $data['id_ville'] !== '' && $data['id_ville'] !== null) {
            $this->validateNumeric('id_ville', $data);
        }

        if (isset($data['principale']) && $data['principale'] !== '' && !in_array($data['principale'], [0, 1, '0', '1', true, false], true)) {
            $this->result->addError('principale', 'Le champ principale doit être 0 ou 1.');
        }

        return $this->result;
    }
}
