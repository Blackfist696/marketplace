<?php

namespace App\Models\Validators;

/**
 * Classe de base pour les validateurs métier.
 */
abstract class AbstractValidator
{
    // Accumulateur d'erreurs partage par les helpers de validation.
    protected ValidationResult $result;

    /**
     * Initialise un résultat de validation vide.
     */
    public function __construct()
    {
        $this->result = new ValidationResult();
    }

    /**
     * Valide les données selon les règles implémentées.
     *
     * @param array $data Données à valider.
     * @return ValidationResult Résultat de la validation.
     */
    abstract public function validate(array $data): ValidationResult;

    /**
     * Vérifie que les champs requis sont présents et non vides.
     *
     * @param array $data Données à vérifier.
     * @param array $fields Champs requis.
     */
    protected function validateRequired(array $data, array $fields): void
    {
        // Validation minimale: presence et non-vide (apres trim).
        foreach ($fields as $field) {
            if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
                $this->result->addError($field, sprintf('Le champ "%s" est requis.', $field));
            }
        }
    }

    /**
     * Vérifie qu\'une valeur est un email valide si le champ est renseigné.
     *
     * @param string $field Nom du champ email.
     * @param array $data Données à vérifier.
     */
    protected function validateEmail(string $field, array $data): void
    {
        // Si le champ est optionnel et absent, on ne remonte pas d'erreur ici.
        if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
            return;
        }

        if (!filter_var($data[$field], FILTER_VALIDATE_EMAIL)) {
            $this->result->addError($field, 'L\'adresse email n\'est pas valide.');
        }
    }

    /**
     * Vérifie qu\'une valeur est numérique si le champ est renseigné.
     *
     * @param string $field Nom du champ.
     * @param array $data Données à vérifier.
     */
    protected function validateNumeric(string $field, array $data): void
    {
        // Validation de type utile avant cast/metier ou ecriture SQL.
        if (!isset($data[$field]) || $data[$field] === '') {
            return;
        }

        if (!is_numeric($data[$field])) {
            $this->result->addError($field, sprintf('Le champ "%s" doit être numérique.', $field));
        }
    }

    /**
     * Vérifie qu\'une valeur est positive si le champ est renseigné.
     *
     * @param string $field Nom du champ.
     * @param array $data Données à vérifier.
     */
    protected function validatePositive(string $field, array $data): void
    {
        // Regle metier generique: valeur numerique >= 0.
        if (!isset($data[$field]) || $data[$field] === '') {
            return;
        }

        if (!is_numeric($data[$field]) || $data[$field] < 0) {
            $this->result->addError($field, sprintf('Le champ "%s" doit être une valeur positive.', $field));
        }
    }
}
