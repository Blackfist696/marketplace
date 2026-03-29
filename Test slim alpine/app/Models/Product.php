<?php

declare(strict_types=1);

namespace App\Models;

/**
 * Modèle Produit - représente un article du magasin informatique
 */
class Product
{
    public function __construct(
        private int    $id,
        private string $name,
        private string $description,
        private float  $price,
        private string $category,
        private string $image,
        private int    $stock,
        private float  $rating,
        private bool   $featured = false,
        private ?string $badge = null,
    ) {}

    public function getId(): int          { return $this->id; }
    public function getName(): string     { return $this->name; }
    public function getDescription(): string { return $this->description; }
    public function getPrice(): float     { return $this->price; }
    public function getCategory(): string { return $this->category; }
    public function getImage(): string    { return $this->image; }
    public function getStock(): int       { return $this->stock; }
    public function getRating(): float    { return $this->rating; }
    public function isFeatured(): bool    { return $this->featured; }
    public function getBadge(): ?string   { return $this->badge; }

    public function isInStock(): bool
    {
        return $this->stock > 0;
    }

    public function getFormattedPrice(): string
    {
        return number_format($this->price, 2, ',', ' ') . ' €';
    }

    public function toArray(): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
            'price'       => $this->price,
            'category'    => $this->category,
            'image'       => $this->image,
            'stock'       => $this->stock,
            'rating'      => $this->rating,
            'featured'    => $this->featured,
            'badge'       => $this->badge,
            'in_stock'    => $this->isInStock(),
            'price_formatted' => $this->getFormattedPrice(),
        ];
    }
}
