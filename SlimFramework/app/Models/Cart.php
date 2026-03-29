<?php

namespace App\Models;

session_start();

class Cart
{
    private const SESSION_KEY = 'grocery_cart';

    public function __construct()
    {
        if (!isset($_SESSION[self::SESSION_KEY])) {
            $_SESSION[self::SESSION_KEY] = [];
        }
    }

    public function addProduct(int $productId, int $quantity = 1): void
    {
        $product = Product::getProductById($productId);
        
        if ($product === null) {
            return;
        }

        if (isset($_SESSION[self::SESSION_KEY][$productId])) {
            $_SESSION[self::SESSION_KEY][$productId]['quantity'] += $quantity;
        } else {
            $_SESSION[self::SESSION_KEY][$productId] = [
                'product' => $product,
                'quantity' => $quantity
            ];
        }
    }

    public function removeProduct(int $productId): void
    {
        unset($_SESSION[self::SESSION_KEY][$productId]);
    }

    public function updateQuantity(int $productId, int $quantity): void
    {
        if ($quantity <= 0) {
            $this->removeProduct($productId);
        } elseif (isset($_SESSION[self::SESSION_KEY][$productId])) {
            $_SESSION[self::SESSION_KEY][$productId]['quantity'] = $quantity;
        }
    }

    public function getCartItems(): array
    {
        return $_SESSION[self::SESSION_KEY] ?? [];
    }

    public function getCartTotal(): float
    {
        $total = 0;
        foreach ($this->getCartItems() as $item) {
            $total += $item['product']->getPrice() * $item['quantity'];
        }
        return $total;
    }

    public function getItemCount(): int
    {
        $count = 0;
        foreach ($this->getCartItems() as $item) {
            $count += $item['quantity'];
        }
        return $count;
    }

    public function clearCart(): void
    {
        $_SESSION[self::SESSION_KEY] = [];
    }

    public function isEmpty(): bool
    {
        return empty($_SESSION[self::SESSION_KEY]);
    }
}
