<?php

namespace App\Models\Validators;

/**
 * Validateur des donnees paiement.
 */
class PaiementValidator extends AbstractValidator
{
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['methode', 'id_commande']);
        $this->validateNumeric('id_commande', $data);
        $this->validatePositive('montant', $data);

        if (isset($data['methode']) && !in_array($data['methode'], ['carte', 'virement', 'paypal'], true)) {
            $this->result->addError('methode', 'La methode de paiement est invalide.');
        }

        if (isset($data['statut']) && !in_array($data['statut'], ['en_attente', 'valide', 'rembourse', 'echoue'], true)) {
            $this->result->addError('statut', 'Le statut de paiement est invalide.');
        }

        return $this->result;
    }
}
