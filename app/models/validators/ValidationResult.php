<?php

namespace App\Models\Validators;

/**
 * Contient les erreurs renvoyées par le processus de validation.
 */
class ValidationResult
{
    private array $errors = [];

    /**
     * Ajoute une erreur pour un champ spécifique.
     *
     * @param string $field Nom du champ.
     * @param string $message Message d\'erreur.
     */
    public function addError(string $field, string $message): void
    {
        $this->errors[$field][] = $message;
    }

    /**
     * Indique si la validation a réussi.
     *
     * @return bool True si aucune erreur n\'a été ajoutée.
     */
    public function isValid(): bool
    {
        return empty($this->errors);
    }

    /**
     * Retourne toutes les erreurs de validation.
     *
     * @return array Erreurs indexées par champ.
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * Retourne la première erreur rencontrée.
     *
     * @return string|null Premier message d\'erreur ou null.
     */
    public function firstError(): ?string
    {
        foreach ($this->errors as $fieldErrors) {
            if (!empty($fieldErrors)) {
                return $fieldErrors[0];
            }
        }

        return null;
    }

    /**
     * Retourne les erreurs sous forme de tableau.
     *
     * @return array Erreurs de validation.
     */
    public function toArray(): array
    {
        return $this->errors;
    }
}
