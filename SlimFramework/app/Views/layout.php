<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?? 'Épicerie BIO NATURE'; ?></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }

        header {
            background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
            color: white;
            padding: 20px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            text-decoration: none;
            color: white;
        }

        nav ul {
            list-style: none;
            display: flex;
            gap: 30px;
        }

        nav a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.3s;
        }

        nav a:hover {
            opacity: 0.8;
        }

        .cart-info {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255,255,255,0.2);
            padding: 8px 15px;
            border-radius: 20px;
        }

        .cart-count {
            background: #e74c3c;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: bold;
        }

        main {
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
            min-height: 500px;
        }

        footer {
            background-color: #2c3e50;
            color: white;
            padding: 30px 20px;
            margin-top: 60px;
            text-align: center;
        }

        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        h1 {
            color: #2ecc71;
            margin-bottom: 20px;
            font-size: 32px;
        }

        h2 {
            color: #27ae60;
            margin-top: 30px;
            margin-bottom: 20px;
            font-size: 24px;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .product-card {
            background: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .product-name {
            font-weight: bold;
            color: #2c3e50;
            font-size: 18px;
            margin-bottom: 8px;
        }

        .product-category {
            display: inline-block;
            background: #2ecc71;
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
            margin-bottom: 10px;
        }

        .product-description {
            color: #7f8c8d;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .product-price {
            font-size: 20px;
            font-weight: bold;
            color: #e74c3c;
            margin-bottom: 15px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #2ecc71;
            color: white;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
            border: none;
        }

        .btn:hover {
            background-color: #27ae60;
        }

        .btn-danger {
            background-color: #e74c3c;
        }

        .btn-danger:hover {
            background-color: #c0392b;
        }

        .cart-section {
            background: #f0f0f0;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }

        .cart-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        .cart-table thead {
            background: #2ecc71;
            color: white;
        }

        .cart-table th,
        .cart-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        .cart-empty {
            text-align: center;
            color: #7f8c8d;
            padding: 30px;
            font-size: 18px;
        }

        .cart-total {
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
            text-align: right;
            margin-top: 15px;
        }

        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }

        .contact-card {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2ecc71;
        }

        .contact-card h3 {
            color: #2ecc71;
            margin-bottom: 10px;
        }

        .contact-card p {
            color: #555;
            line-height: 1.6;
        }

        .hours-list {
            list-style: none;
        }

        .hours-list li {
            padding: 8px 0;
            color: #555;
        }

        .section-title {
            color: #2ecc71;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e8f5e9;
        }
    </style>
</head>
<body>
    <?php $mainContent = $mainContent ?? ''; ?>
    <header>
        <div class="header-container">
            <a href="<?php echo app_url('/'); ?>" class="logo">🌱 Épicerie BIO</a>
            <nav>
                <ul>
                    <li><a href="<?php echo app_url('/'); ?>">Accueil</a></li>
                    <li><a href="<?php echo app_url('/products'); ?>">Produits</a></li>
                    <li><a href="<?php echo app_url('/contact'); ?>">Contact</a></li>
                </ul>
            </nav>
            <?php if (session_id() === '' || !isset($_SESSION)): ?>
                <?php session_start(); ?>
            <?php endif; ?>
            <?php
            $cartItemCount = 0;
            if (isset($_SESSION['grocery_cart'])) {
                foreach ($_SESSION['grocery_cart'] as $item) {
                    $cartItemCount += $item['quantity'];
                }
            }
            ?>
            <div class="cart-info">
                🛒 Panier
                <?php if ($cartItemCount > 0): ?>
                    <span class="cart-count"><?php echo $cartItemCount; ?></span>
                <?php endif; ?>
            </div>
        </div>
    </header>

    <main>
        <?php echo $mainContent; ?>
    </main>

    <footer>
        <p>&copy; 2026 Épicerie BIO NATURE - Tous droits réservés</p>
    </footer>
</body>
</html>
