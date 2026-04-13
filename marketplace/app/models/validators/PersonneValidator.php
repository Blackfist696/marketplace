<?php

namespace App\Models\Validators;

/**
 * Validateur des données personne.
 */
class PersonneValidator extends AbstractValidator
{
    /**
     * Valide les champs d'une personne.
     *
     * @param array $data Données personne.
     * @return ValidationResult Résultat de la validation.
     */
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['id_utilisateur', 'nom', 'prenom']);
        $this->validateNumeric('id_utilisateur', $data);

        if (isset($data['telephone']) && trim((string) $data['telephone']) !== '' && !preg_match('/^[0-9\s+\-]{6,20}$/', $data['telephone'])) {
            $this->result->addError('telephone', 'Le numéro de téléphone est invalide.');
        }

        return $this->result;
    }
}
