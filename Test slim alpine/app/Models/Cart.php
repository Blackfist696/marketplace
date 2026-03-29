<?php

declare(strict_types=1);

namespace App\Models;

/**
 * Modèle Panier - gère les articles sélectionnés par l'utilisateur
 */
class Cart
{
    private array $items = [];

    public function addItem(Product $product, int $quantity = 1): void
    {
        $id = $product->getId();

        if (isset($this->items[$id])) {
            $this->items[$id]['quantity'] += $quantity;
        } else {
            $this->items[$id] = [
                'product'  => $product->toArray(),
                'quantity' => $quantity,
            ];
        }
    }

    public function removeItem(int $productId): void
    {
        unset($this->items[$productId]);
    }

    public function updateQuantity(int $productId, int $quantity): void
    {
        if ($quantity <= 0) {
            $this->removeItem($productId);
            return;
        }

        if (isset($this->items[$productId])) {
            $this->items[$productId]['quantity'] = $quantity;
        }
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function getTotal(): float
    {
        $total = 0.0;
        foreach ($this->items as $item) {
            $total += $item['product']['price'] * $item['quantity'];
        }
        return $total;
    }

    public function getCount(): int
    {
        return array_sum(array_column($this->items, 'quantity'));
    }

    public function clear(): void
    {
        $this->items = [];
    }

    public function isEmpty(): bool
    {
        return empty($this->items);
    }

    public function toArray(): array
    {
        return [
            'items' => array_values($this->items),
            'total' => $this->getTotal(),
            'count' => $this->getCount(),
        ];
    }
}
