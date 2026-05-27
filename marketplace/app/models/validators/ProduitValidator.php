<?php

namespace App\Models\Validators;

/**
 * Validateur des données produit.
 */
class ProduitValidator extends AbstractValidator
{
    /**
     * Valide les champs d'un produit.
     *
     * @param array $data Données produit.
     * @return ValidationResult Résultat de la validation.
     */
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['id_artisan', 'nom', 'prix_ht']);
        $this->validateNumeric('id_artisan', $data);
        $this->validateNumeric('prix_ht', $data);
        $this->validatePositive('prix_ht', $data);

        if (isset($data['nom']) && mb_strlen((string) $data['nom']) < 3) {
            $this->result->addError('nom', 'Le nom du produit doit contenir au moins 3 caractères.');
        }

        if (isset($data['stock']) && $data['stock'] !== '' && (!is_numeric($data['stock']) || (int) $data['stock'] < 0)) {
            $this->result->addError('stock', 'Le stock doit être un nombre entier positif.');
        }

        if (isset($data['taux_tva']) && $data['taux_tva'] !== '' && !is_numeric($data['taux_tva'])) {
            $this->result->addError('taux_tva', 'Le taux de TVA doit être un nombre.');
        }

        return $this->result;
    }
}
