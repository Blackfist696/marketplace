<?php

namespace App\Models;

class Product
{
    private int $id;
    private string $name;
    private string $category;
    private float $price;
    private string $description;

    public function __construct(int $id, string $name, string $category, float $price, string $description)
    {
        $this->id = $id;
        $this->name = $name;
        $this->category = $category;
        $this->price = $price;
        $this->description = $description;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getCategory(): string
    {
        return $this->category;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public static function getAllProducts(): array
    {
        return [
            // Fruits
            new self(1, 'Pommes', 'Fruits', 2.50, 'Pommes rouges juteuses'),
            new self(2, 'Bananes', 'Fruits', 1.80, 'Bananes fraîches'),
            new self(3, 'Oranges', 'Fruits', 3.00, 'Oranges sucrées'),
            new self(4, 'Fraises', 'Fruits', 4.50, 'Fraises savoureuses'),
            new self(5, 'Raisins', 'Fruits', 3.50, 'Raisins verts frais'),
            
            // Légumes
            new self(6, 'Tomates', 'Légumes', 2.80, 'Tomates rouges savoureux'),
            new self(7, 'Carottes', 'Légumes', 1.50, 'Carottes biologiques'),
            new self(8, 'Laitue', 'Légumes', 2.00, 'Laitue fraîche'),
            new self(9, 'Poivrons', 'Légumes', 3.20, 'Poivrons colorés'),
            new self(10, 'Brocoli', 'Légumes', 3.80, 'Brocoli frais'),
        ];
    }

    public static function getProductsByCategory(string $category): array
    {
        return array_filter(self::getAllProducts(), function($product) use ($category) {
            return $product->getCategory() === $category;
        });
    }

    public static function getProductById(int $id): ?Product
    {
        foreach (self::getAllProducts() as $product) {
            if ($product->getId() === $id) {
                return $product;
            }
        }
        return null;
    }
}
