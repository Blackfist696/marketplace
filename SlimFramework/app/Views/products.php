<?php
use App\Models\Cart;

$products = $products ?? [];
$cart = $cart ?? new Cart();
?>

<div class="container">
    <h1>Nos Produits</h1>
    <p style="color: #666; margin-bottom: 30px;">Découvrez notre sélection de fruits et légumes biologiques frais</p>

    <div style="display: grid; grid-template-columns: 1fr 350px; gap: 30px;">
        <!-- Products Section -->
        <div>
            <?php
            // Group products by category
            $fruits = array_filter($products, function($p) { return $p->getCategory() === 'Fruits'; });
            $vegetables = array_filter($products, function($p) { return $p->getCategory() === 'Légumes'; });
            ?>

            <!-- Fruits Section -->
            <div>
                <h2 style="color: #2ecc71; margin-top: 0;">🍎 Fruits</h2>
                <div class="products-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
                    <?php foreach ($fruits as $product): ?>
                        <div class="product-card">
                            <div class="product-name"><?php echo htmlspecialchars($product->getName()); ?></div>
                            <span class="product-category"><?php echo htmlspecialchars($product->getCategory()); ?></span>
                            <p class="product-description"><?php echo htmlspecialchars($product->getDescription()); ?></p>
                            <div class="product-price"><?php echo number_format($product->getPrice(), 2, ',', ' '); ?> €</div>
                            <form method="POST" action="<?php echo app_url('/products/add/' . $product->getId()); ?>" style="display: inline;">
                                <button type="submit" class="btn" style="width: 100%;">Ajouter au panier</button>
                            </form>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Vegetables Section -->
            <div style="margin-top: 40px;">
                <h2 style="color: #2ecc71;">🥕 Légumes</h2>
                <div class="products-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
                    <?php foreach ($vegetables as $product): ?>
                        <div class="product-card">
                            <div class="product-name"><?php echo htmlspecialchars($product->getName()); ?></div>
                            <span class="product-category"><?php echo htmlspecialchars($product->getCategory()); ?></span>
                            <p class="product-description"><?php echo htmlspecialchars($product->getDescription()); ?></p>
                            <div class="product-price"><?php echo number_format($product->getPrice(), 2, ',', ' '); ?> €</div>
                            <form method="POST" action="<?php echo app_url('/products/add/' . $product->getId()); ?>" style="display: inline;">
                                <button type="submit" class="btn" style="width: 100%;">Ajouter au panier</button>
                            </form>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <!-- Cart Section (Sidebar) -->
        <aside>
            <div class="cart-section" style="position: sticky; top: 100px;">
                <h2 style="margin-top: 0; font-size: 20px;">🛒 Mon Panier</h2>
                
                <?php if ($cart->isEmpty()): ?>
                    <div class="cart-empty">
                        Votre panier est vide
                    </div>
                <?php else: ?>
                    <table class="cart-table" style="font-size: 14px;">
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Qty</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($cart->getCartItems() as $productId => $item): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($item['product']->getName()); ?></td>
                                    <td><?php echo $item['quantity']; ?></td>
                                    <td><?php echo number_format($item['product']->getPrice() * $item['quantity'], 2, ',', ' '); ?> €</td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>

                    <div class="cart-total">
                        Total: <?php echo number_format($cart->getCartTotal(), 2, ',', ' '); ?> €
                    </div>

                    <h3 style="margin-top: 20px; font-size: 16px; color: #2c3e50;">Vos articles:</h3>
                    <ul style="list-style: none; margin-top: 10px;">
                        <?php foreach ($cart->getCartItems() as $productId => $item): ?>
                            <li style="padding: 8px 0; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                                <span>
                                    <strong><?php echo htmlspecialchars($item['product']->getName()); ?></strong>
                                    <br>
                                    <small style="color: #999;">Quantité: <?php echo $item['quantity']; ?></small>
                                </span>
                                <form method="POST" action="<?php echo app_url('/products/remove/' . $item['product']->getId()); ?>" style="display: inline;">
                                    <button type="submit" class="btn btn-danger" style="padding: 5px 10px; font-size: 12px;">✕</button>
                                </form>
                            </li>
                        <?php endforeach; ?>
                    </ul>

                    <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">
                        <a href="<?php echo app_url('/validate-order'); ?>" class="btn" style="text-align: center; width: 100%;">Passer la commande</a>
                        <form method="POST" action="<?php echo app_url('/clear-cart'); ?>" style="width: 100%;">
                            <button type="submit" class="btn btn-danger" style="width: 100%; text-align: center;">Vider le panier</button>
                        </form>
                    </div>
                <?php endif; ?>
            </div>
        </aside>
    </div>
</div>
