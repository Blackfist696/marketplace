<?php

namespace App\Models;

use PDO;
use InvalidArgumentException;

require_once __DIR__ . '/Database.php';

abstract class Model
{
    protected static string $table;
    protected static string $primaryKey = 'id';
    protected static array $fields = [];
    protected array $attributes = [];

    public function __construct(array $attributes = [])
    {
        $this->fill($attributes);
    }

    public function fill(array $attributes): self
    {
        if (isset($attributes[static::$primaryKey])) {
            $this->attributes[static::$primaryKey] = $attributes[static::$primaryKey];
        }

        foreach (static::$fields as $field) {
            if (array_key_exists($field, $attributes)) {
                $this->attributes[$field] = $attributes[$field];
            }
        }

        return $this;
    }

    public function __get(string $name)
    {
        return $this->attributes[$name] ?? null;
    }

    public function __set(string $name, $value): void
    {
        if ($name === static::$primaryKey || in_array($name, static::$fields, true)) {
            $this->attributes[$name] = $value;
        }
    }

    public function toArray(): array
    {
        return $this->attributes;
    }

    public static function getPDO(): PDO
    {
        return Database::getConnection();
    }

    public static function all(): array
    {
        $sql = sprintf('SELECT * FROM %s', static::$table);
        return static::getPDO()->query($sql)->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $sql = sprintf('SELECT * FROM %s WHERE %s = :id', static::$table, static::$primaryKey);
        $stmt = static::getPDO()->prepare($sql);
        $stmt->execute(['id' => $id]);

        $result = $stmt->fetch();
        return $result === false ? null : $result;
    }

    public static function where(string $column, $value): array
    {
        if ($column !== static::$primaryKey && !in_array($column, static::$fields, true)) {
            throw new InvalidArgumentException(sprintf('La colonne "%s" n\'est pas autorisée.', $column));
        }

        $sql = sprintf('SELECT * FROM %s WHERE %s = :value', static::$table, $column);
        $stmt = static::getPDO()->prepare($sql);
        $stmt->execute(['value' => $value]);

        return $stmt->fetchAll();
    }

    public static function create(array $data): int
    {
        $fields = array_intersect_key($data, array_flip(static::$fields));
        if (empty($fields)) {
            throw new InvalidArgumentException('Aucun champ valide fourni pour la création.');
        }

        $columns = array_keys($fields);
        $placeholders = array_map(fn($column) => ':' . $column, $columns);
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            static::$table,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );

        $stmt = static::getPDO()->prepare($sql);
        foreach ($fields as $column => $value) {
            $stmt->bindValue(':' . $column, $value);
        }

        $stmt->execute();
        return (int) static::getPDO()->lastInsertId();
    }

    public static function update(int $id, array $data): bool
    {
        $fields = array_intersect_key($data, array_flip(static::$fields));
        if (empty($fields)) {
            throw new InvalidArgumentException('Aucun champ valide fourni pour la mise à jour.');
        }

        $assignments = array_map(fn($column) => sprintf('%s = :%s', $column, $column), array_keys($fields));
        $sql = sprintf(
            'UPDATE %s SET %s WHERE %s = :id',
            static::$table,
            implode(', ', $assignments),
            static::$primaryKey
        );

        $stmt = static::getPDO()->prepare($sql);
        foreach ($fields as $column => $value) {
            $stmt->bindValue(':' . $column, $value);
        }
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    public static function delete(int $id): bool
    {
        $sql = sprintf('DELETE FROM %s WHERE %s = :id', static::$table, static::$primaryKey);
        $stmt = static::getPDO()->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }

    public function save(): int
    {
        if (isset($this->attributes[static::$primaryKey])) {
            static::update((int) $this->attributes[static::$primaryKey], $this->attributes);
            return (int) $this->attributes[static::$primaryKey];
        }

        $id = static::create($this->attributes);
        $this->attributes[static::$primaryKey] = $id;
        return $id;
    }
}
