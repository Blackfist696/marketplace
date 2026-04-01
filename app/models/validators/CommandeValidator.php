<?php

namespace App\Models\Validators;

/**
 * Validateur des données commande.
 */
class CommandeValidator extends AbstractValidator
{
    /**
     * Valide les champs d'une commande.
     *
     * @param array $data Données commande.
     * @return ValidationResult Résultat de la validation.
     */
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['reference', 'id_utilisateur', 'id_adresse_livraison', 'id_adresse_facturation', 'total_ht', 'total_tva', 'total_ttc']);
        $this->validateNumeric('id_utilisateur', $data);
        $this->validateNumeric('id_adresse_livraison', $data);
        $this->validateNumeric('id_adresse_facturation', $data);
        $this->validateNumeric('total_ht', $data);
        $this->validateNumeric('total_tva', $data);
        $this->validateNumeric('total_ttc', $data);

        if (isset($data['reference']) && mb_strlen((string) $data['reference']) < 3) {
            $this->result->addError('reference', 'La référence doit comporter au moins 3 caractères.');
        }

        if (isset($data['statut']) && !in_array($data['statut'], ['en_attente', 'payee', 'en_preparation', 'expediee', 'livree', 'annulee'], true)) {
            $this->result->addError('statut', 'Le statut de commande est invalide.');
        }

        return $this->result;
    }
}
