<?php

namespace App\Models\Validators;

/**
 * Validateur des donnees ligne_commande.
 */
class LigneCommandeValidator extends AbstractValidator
{
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['id_produit', 'id_commande', 'quantite']);
        $this->validateNumeric('id_produit', $data);
        $this->validateNumeric('id_commande', $data);
        $this->validateNumeric('quantite', $data);

        if (isset($data['quantite']) && (!is_numeric($data['quantite']) || (int) $data['quantite'] <= 0)) {
            $this->result->addError('quantite', 'La quantite doit etre un entier strictement positif.');
        }

        $this->validatePositive('prix_unitaire_ht', $data);
        $this->validatePositive('taux_tva', $data);

        return $this->result;
    }
}
