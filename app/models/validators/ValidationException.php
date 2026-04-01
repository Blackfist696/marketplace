<?php

namespace App\Models\Validators;

use Exception;

/**
 * Exception levée lorsque la validation de données échoue.
 */
class ValidationException extends Exception
{
    private array $errors;

    /**
     * @param array $errors Erreurs de validation.
     * @param string $message Message de l'exception.
     */
    public function __construct(array $errors, string $message = 'Validation failed')
    {
        parent::__construct($message);
        $this->errors = $errors;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
