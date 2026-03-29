<?php

declare(strict_types=1);

namespace App\Models;

/**
 * Repository de produits - source de données simulée (remplace la BDD)
 */
class ProductRepository
{
    private array $products = [];

    public function __construct()
    {
        $this->seed();
    }

    private function seed(): void
    {
        $data = [
            [1,  'MacBook Pro M3 14"',     'Puce Apple M3, 18 Go RAM, SSD 512 Go, écran Liquid Retina XDR.',                          2499.00, 'laptops',   '💻', 8,  4.9, true,  'Bestseller'],
            [2,  'ASUS ROG Strix G16',      'Intel Core i9, RTX 4070, 32 Go DDR5, écran 165Hz QHD gaming.',                            1899.00, 'laptops',   '🎮', 12, 4.7, true,  'Gaming'],
            [3,  'Dell XPS 15',             'Intel Core Ultra 7, OLED 3.5K, 32 Go RAM, SSD 1 To.',                                     1699.00, 'laptops',   '💼', 6,  4.8, false, null],
            [4,  'iPhone 15 Pro Max',       'A17 Pro, Dynamic Island, 48 MP, ProRes vidéo, titane naturel.',                            1479.00, 'phones',    '📱', 25, 4.9, true,  'Nouveau'],
            [5,  'Samsung Galaxy S24 Ultra','Snapdragon 8 Gen 3, S Pen, écran 6,8" AMOLED 120Hz, 200 MP.',                             1319.00, 'phones',    '📸', 18, 4.8, true,  null],
            [6,  'Google Pixel 8 Pro',      'Google Tensor G3, IA avancée, caméra computationnelle 50 MP.',                             1099.00, 'phones',    '🤖', 30, 4.6, false, '-15%'],
            [7,  'RTX 4090 Founders Ed.',   'GPU NVIDIA Ada Lovelace, 24 Go GDDR6X, 4K gaming ultra.',                                 1999.00, 'components','⚡', 4,  5.0, true,  'Pro'],
            [8,  'AMD Ryzen 9 7950X',       '16 cœurs / 32 threads, 5.7 GHz boost, architecture Zen 4.',                               549.00,  'components','🔧', 15, 4.8, false, null],
            [9,  'Samsung 990 Pro 2 To',    'NVMe PCIe 4.0, 7450 Mo/s lecture, idéal PS5 et PC gaming.',                               159.00,  'components','💾', 50, 4.7, false, null],
            [10, 'LG UltraGear 32GQ950',    'Écran 4K UHD NANO IPS, 144Hz, 1ms, HDMI 2.1, G-Sync Ultimate.',                           899.00,  'monitors',  '🖥️', 7,  4.8, true,  '4K'],
            [11, 'Samsung Odyssey G9 49"',  'Ultrawide 49" OLED incurvé 1800R, 240Hz, 0.03ms.',                                        1499.00, 'monitors',  '🌊', 3,  4.9, true,  'OLED'],
            [12, 'Dell S2722QC 27"',        '4K USB-C, 60W charge, AMD FreeSync, IPS anti-reflets.',                                   399.00,  'monitors',  '🖥️', 20, 4.5, false, null],
            [13, 'Logitech MX Master 3S',   'Souris sans fil 8K DPI, molette électromagnétique, silencieuse.',                          99.00,  'accessories','🖱️', 45, 4.8, false, null],
            [14, 'Keychron Q1 Pro',         'Clavier mécanique 75%, QMK/VIA, RGB, switches Gateron Pro.',                               199.00,  'accessories','⌨️', 22, 4.9, false, 'Mécanique'],
            [15, 'Sony WH-1000XM5',         'Casque ANC leader du marché, 30h autonomie, audio 360° spatial.',                         349.00,  'accessories','🎧', 35, 4.9, true,  'ANC'],
            [16, 'Elgato Stream Deck MK.2', '15 boutons LCD programmables, parfait pour créateurs et streamers.',                       149.00,  'accessories','🎬', 28, 4.7, false, null],
        ];

        foreach ($data as [$id, $name, $desc, $price, $cat, $img, $stock, $rating, $featured, $badge]) {
            $this->products[$id] = new Product($id, $name, $desc, $price, $cat, $img, $stock, $rating, $featured, $badge);
        }
    }

    public function findAll(): array
    {
        return array_values($this->products);
    }

    public function findById(int $id): ?Product
    {
        return $this->products[$id] ?? null;
    }

    public function findByCategory(string $category): array
    {
        return array_values(array_filter(
            $this->products,
            fn(Product $p) => $p->getCategory() === $category
        ));
    }

    public function findFeatured(): array
    {
        return array_values(array_filter(
            $this->products,
            fn(Product $p) => $p->isFeatured()
        ));
    }

    public function search(string $query): array
    {
        $q = strtolower($query);
        return array_values(array_filter(
            $this->products,
            fn(Product $p) =>
                str_contains(strtolower($p->getName()), $q) ||
                str_contains(strtolower($p->getDescription()), $q) ||
                str_contains(strtolower($p->getCategory()), $q)
        ));
    }

    public function getCategories(): array
    {
        $cats = array_unique(array_map(
            fn(Product $p) => $p->getCategory(),
            $this->products
        ));

        $labels = [
            'laptops'     => ['label' => 'Ordinateurs portables', 'icon' => '💻'],
            'phones'      => ['label' => 'Smartphones',           'icon' => '📱'],
            'components'  => ['label' => 'Composants PC',         'icon' => '⚙️'],
            'monitors'    => ['label' => 'Écrans',                'icon' => '🖥️'],
            'accessories' => ['label' => 'Accessoires',           'icon' => '🎧'],
        ];

        $result = [];
        foreach ($cats as $cat) {
            $result[$cat] = $labels[$cat] ?? ['label' => ucfirst($cat), 'icon' => '📦'];
        }

        return $result;
    }
}
