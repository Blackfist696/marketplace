<?php

namespace App\Models\Validators;

/**
 * Validateur des donnees statistique_artisan.
 */
class StatistiqueArtisanValidator extends AbstractValidator
{
    public function validate(array $data): ValidationResult
    {
        $this->result = new ValidationResult();

        $this->validateRequired($data, ['date_consultation', 'ip_adress', 'id_produit', 'id_artisan']);
        $this->validateNumeric('id_artisan', $data);
        $this->validateNumeric('id_produit', $data);

        if (isset($data['id_produit']) && trim((string) $data['id_produit']) === '') {
            $this->result->addError('id_produit', 'L identifiant produit est requis.');
        }

        if (isset($data['id_utilisateur']) && trim((string) $data['id_utilisateur']) !== '') {
            $this->validateNumeric('id_utilisateur', $data);
        }

        if (isset($data['ip_adress']) && filter_var($data['ip_adress'], FILTER_VALIDATE_IP) === false) {
            $this->result->addError('ip_adress', 'L adresse IP est invalide.');
        }

        return $this->result;
    }
}
