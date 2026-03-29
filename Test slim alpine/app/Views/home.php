<!DOCTYPE html>
<html lang="fr" x-data="techStore()" x-init="init()">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?></title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">

    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <style>
        /* ── CSS Variables ── */
        :root {
            --bg:        #0a0a0f;
            --bg2:       #111118;
            --bg3:       #1a1a24;
            --surface:   #1e1e2e;
            --border:    rgba(255,255,255,0.07);
            --accent:    #6ee7f7;
            --accent2:   #a78bfa;
            --accent3:   #34d399;
            --warn:      #fbbf24;
            --danger:    #f87171;
            --text:      #e2e8f0;
            --muted:     #64748b;
            --font-head: 'Syne', sans-serif;
            --font-body: 'DM Sans', sans-serif;
            --radius:    14px;
            --shadow:    0 8px 32px rgba(0,0,0,0.4);
        }

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: var(--font-body);
            font-size: 15px;
            line-height: 1.6;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 99px; }

        /* ── Noise texture overlay ── */
        body::before {
            content: '';
            position: fixed; inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none; z-index: 9999; opacity: 0.4;
        }

        /* ── Header ── */
        header {
            position: sticky; top: 0; z-index: 100;
            background: rgba(10,10,15,0.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            padding: 0 2rem;
        }

        .header-inner {
            max-width: 1400px; margin: 0 auto;
            display: flex; align-items: center; gap: 2rem;
            height: 64px;
        }

        .logo {
            font-family: var(--font-head);
            font-size: 1.4rem; font-weight: 800;
            letter-spacing: -0.03em;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
            white-space: nowrap;
        }
        .logo span { color: var(--accent); -webkit-text-fill-color: var(--accent); }

        /* Search */
        .search-wrap {
            flex: 1; max-width: 480px;
            position: relative;
        }
        .search-input {
            width: 100%;
            background: var(--bg3);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 0.55rem 1rem 0.55rem 2.8rem;
            color: var(--text);
            font-family: var(--font-body);
            font-size: 0.9rem;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-input:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(110,231,247,0.1);
        }
        .search-icon {
            position: absolute; left: 0.9rem; top: 50%;
            transform: translateY(-50%);
            color: var(--muted); font-size: 0.9rem; pointer-events: none;
        }

        /* Nav categories */
        .nav-cats {
            display: flex; gap: 0.4rem;
            list-style: none; align-items: center;
            overflow-x: auto; flex-shrink: 0;
        }
        .cat-btn {
            background: none;
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 0.35rem 0.75rem;
            color: var(--muted);
            cursor: pointer;
            font-family: var(--font-body); font-size: 0.82rem;
            white-space: nowrap;
            transition: all 0.2s;
        }
        .cat-btn:hover { border-color: var(--accent); color: var(--accent); }
        .cat-btn.active {
            background: var(--accent); color: #000; border-color: var(--accent);
            font-weight: 600;
        }

        /* Cart button */
        .cart-btn {
            position: relative;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 0.5rem 1rem;
            color: var(--text);
            cursor: pointer;
            font-family: var(--font-body);
            font-size: 0.9rem;
            display: flex; align-items: center; gap: 0.5rem;
            transition: all 0.2s; white-space: nowrap;
        }
        .cart-btn:hover { border-color: var(--accent); }
        .cart-count {
            background: var(--accent);
            color: #000; font-weight: 700; font-size: 0.72rem;
            border-radius: 99px;
            min-width: 20px; height: 20px;
            display: flex; align-items: center; justify-content: center;
            padding: 0 5px;
        }

        /* ── Hero ── */
        .hero {
            position: relative; overflow: hidden;
            padding: 5rem 2rem 4rem;
            text-align: center;
        }
        .hero::before {
            content: '';
            position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
            width: 800px; height: 600px;
            background: radial-gradient(ellipse, rgba(110,231,247,0.08) 0%, transparent 70%);
            pointer-events: none;
        }
        .hero-tag {
            display: inline-flex; align-items: center; gap: 0.5rem;
            border: 1px solid rgba(110,231,247,0.3);
            border-radius: 99px;
            padding: 0.3rem 1rem;
            font-size: 0.8rem; color: var(--accent);
            margin-bottom: 1.5rem;
            background: rgba(110,231,247,0.05);
        }
        .hero h1 {
            font-family: var(--font-head);
            font-size: clamp(2.4rem, 5vw, 4rem);
            font-weight: 800;
            letter-spacing: -0.04em;
            line-height: 1.1;
            margin-bottom: 1rem;
        }
        .hero h1 .grad {
            background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .hero p { color: var(--muted); max-width: 500px; margin: 0 auto 2rem; font-size: 1.05rem; }

        /* Stats */
        .stats {
            display: flex; justify-content: center; gap: 3rem;
            flex-wrap: wrap;
        }
        .stat { text-align: center; }
        .stat-val {
            font-family: var(--font-head);
            font-size: 1.8rem; font-weight: 800;
            color: var(--accent);
        }
        .stat-lbl { font-size: 0.8rem; color: var(--muted); }

        /* ── Main layout ── */
        .main { max-width: 1400px; margin: 0 auto; padding: 2rem; }

        /* Section titles */
        .section-title {
            font-family: var(--font-head);
            font-size: 1.5rem; font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
            display: flex; align-items: center; gap: 0.75rem;
        }
        .section-title::after {
            content: ''; flex: 1;
            height: 1px; background: var(--border);
        }

        /* ── Product Grid ── */
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.25rem;
            margin-bottom: 3rem;
        }

        .product-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.25s;
            position: relative;
            overflow: hidden;
        }
        .product-card::before {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(135deg, rgba(110,231,247,0.03), transparent);
            opacity: 0; transition: opacity 0.3s;
        }
        .product-card:hover {
            border-color: rgba(110,231,247,0.3);
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(110,231,247,0.1);
        }
        .product-card:hover::before { opacity: 1; }

        /* Badge */
        .badge {
            position: absolute; top: 1rem; right: 1rem;
            padding: 0.2rem 0.6rem;
            border-radius: 6px; font-size: 0.72rem; font-weight: 600;
            letter-spacing: 0.03em;
        }
        .badge-default { background: rgba(167,139,250,0.2); color: var(--accent2); border: 1px solid rgba(167,139,250,0.3); }
        .badge-new     { background: rgba(52,211,153,0.2); color: var(--accent3); border: 1px solid rgba(52,211,153,0.3); }
        .badge-sale    { background: rgba(251,191,36,0.2); color: var(--warn); border: 1px solid rgba(251,191,36,0.3); }
        .badge-pro     { background: rgba(110,231,247,0.2); color: var(--accent); border: 1px solid rgba(110,231,247,0.3); }

        .product-img {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            display: block; line-height: 1;
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
            transition: transform 0.3s;
        }
        .product-card:hover .product-img { transform: scale(1.1) rotate(-3deg); }

        .product-category {
            font-size: 0.75rem; color: var(--muted);
            text-transform: uppercase; letter-spacing: 0.08em;
            margin-bottom: 0.4rem;
        }
        .product-name {
            font-family: var(--font-head);
            font-size: 1rem; font-weight: 700;
            line-height: 1.3; margin-bottom: 0.5rem;
        }
        .product-desc {
            font-size: 0.83rem; color: var(--muted);
            line-height: 1.5; margin-bottom: 1rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* Rating */
        .rating { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.75rem; }
        .stars { color: var(--warn); font-size: 0.8rem; letter-spacing: -1px; }
        .rating-val { font-size: 0.8rem; color: var(--muted); }

        /* Price & Add button */
        .product-footer {
            display: flex; align-items: center; justify-content: space-between;
            margin-top: auto;
        }
        .price {
            font-family: var(--font-head);
            font-size: 1.25rem; font-weight: 800;
            color: var(--accent);
        }
        .add-btn {
            background: var(--accent);
            color: #000; border: none;
            border-radius: 8px;
            padding: 0.5rem 1rem;
            font-family: var(--font-body); font-size: 0.85rem; font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: flex; align-items: center; gap: 0.4rem;
        }
        .add-btn:hover { background: #fff; transform: scale(1.05); }
        .add-btn:disabled {
            background: var(--surface); color: var(--muted);
            border: 1px solid var(--border); cursor: not-allowed;
            transform: none;
        }
        .stock-out {
            font-size: 0.78rem; color: var(--danger);
            display: flex; align-items: center; gap: 0.3rem;
        }

        /* ── Cart Panel ── */
        .cart-overlay {
            position: fixed; inset: 0; z-index: 200;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(4px);
        }
        .cart-panel {
            position: fixed; right: 0; top: 0; bottom: 0; z-index: 201;
            width: 420px; max-width: 95vw;
            background: var(--bg2);
            border-left: 1px solid var(--border);
            display: flex; flex-direction: column;
            box-shadow: -20px 0 60px rgba(0,0,0,0.5);
        }
        .cart-header {
            padding: 1.5rem;
            border-bottom: 1px solid var(--border);
            display: flex; align-items: center; justify-content: space-between;
        }
        .cart-header h2 {
            font-family: var(--font-head);
            font-size: 1.2rem; font-weight: 700;
        }
        .close-btn {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 8px; width: 36px; height: 36px;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; color: var(--muted);
            transition: all 0.2s; font-size: 1.1rem;
        }
        .close-btn:hover { border-color: var(--accent); color: var(--accent); }

        .cart-items { flex: 1; overflow-y: auto; padding: 1rem 1.5rem; }

        .cart-item {
            display: flex; gap: 1rem; align-items: center;
            padding: 1rem 0; border-bottom: 1px solid var(--border);
        }
        .cart-item-img { font-size: 2.2rem; flex-shrink: 0; }
        .cart-item-info { flex: 1; min-width: 0; }
        .cart-item-name {
            font-size: 0.9rem; font-weight: 600;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cart-item-price { font-size: 0.85rem; color: var(--accent); font-weight: 600; }

        .qty-controls {
            display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem;
        }
        .qty-btn {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 6px; width: 26px; height: 26px;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; color: var(--text); font-size: 0.9rem;
            transition: all 0.15s;
        }
        .qty-btn:hover { border-color: var(--accent); color: var(--accent); }
        .qty-val { font-size: 0.9rem; font-weight: 600; min-width: 24px; text-align: center; }

        .remove-btn {
            background: none; border: none; cursor: pointer;
            color: var(--muted); font-size: 1rem;
            transition: color 0.2s; padding: 0.3rem;
            border-radius: 6px;
        }
        .remove-btn:hover { color: var(--danger); }

        .cart-empty {
            text-align: center; padding: 4rem 2rem;
            color: var(--muted);
        }
        .cart-empty .empty-icon { font-size: 4rem; margin-bottom: 1rem; }
        .cart-empty p { font-size: 0.9rem; }

        .cart-footer {
            padding: 1.5rem;
            border-top: 1px solid var(--border);
        }
        .cart-total {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 1rem;
        }
        .cart-total-label { font-size: 0.9rem; color: var(--muted); }
        .cart-total-val {
            font-family: var(--font-head);
            font-size: 1.5rem; font-weight: 800; color: var(--accent);
        }

        .checkout-btn {
            width: 100%;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            color: #000; border: none;
            border-radius: 10px; padding: 0.9rem;
            font-family: var(--font-body); font-size: 1rem; font-weight: 700;
            cursor: pointer; transition: all 0.2s;
        }
        .checkout-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        .clear-cart-btn {
            background: none; border: none;
            color: var(--danger); font-size: 0.8rem;
            cursor: pointer; margin-top: 0.75rem;
            width: 100%; text-align: center;
            padding: 0.4rem; border-radius: 6px;
            transition: background 0.2s;
        }
        .clear-cart-btn:hover { background: rgba(248,113,113,0.08); }

        /* ── Toast notification ── */
        .toast-wrap {
            position: fixed; bottom: 2rem; left: 50%;
            transform: translateX(-50%);
            z-index: 300; pointer-events: none;
        }
        .toast {
            background: var(--surface);
            border: 1px solid var(--accent);
            border-radius: 10px;
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem; font-weight: 500;
            display: flex; align-items: center; gap: 0.5rem;
            box-shadow: 0 8px 24px rgba(0,0,0,0.4);
            white-space: nowrap;
        }

        /* ── Product Modal ── */
        .modal-overlay {
            position: fixed; inset: 0; z-index: 200;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(6px);
            display: flex; align-items: center; justify-content: center;
            padding: 1.5rem;
        }
        .modal {
            background: var(--bg2);
            border: 1px solid var(--border);
            border-radius: 20px;
            max-width: 580px; width: 100%;
            max-height: 90vh; overflow-y: auto;
            box-shadow: 0 30px 80px rgba(0,0,0,0.6);
        }
        .modal-body { padding: 2.5rem; }
        .modal-img { font-size: 6rem; margin-bottom: 1.5rem; display: block; text-align: center; }
        .modal-cat { font-size: 0.8rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; }
        .modal-name {
            font-family: var(--font-head);
            font-size: 1.6rem; font-weight: 800;
            letter-spacing: -0.03em; margin-bottom: 1rem;
        }
        .modal-desc { color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; }
        .modal-meta {
            display: flex; gap: 1.5rem; flex-wrap: wrap;
            padding: 1.25rem; background: var(--surface);
            border-radius: 12px; margin-bottom: 1.5rem;
        }
        .meta-item { flex: 1; min-width: 80px; }
        .meta-key { font-size: 0.75rem; color: var(--muted); margin-bottom: 0.2rem; }
        .meta-val { font-weight: 600; font-size: 0.95rem; }
        .modal-price {
            font-family: var(--font-head);
            font-size: 2.2rem; font-weight: 800;
            color: var(--accent); margin-bottom: 1.5rem;
        }
        .modal-add-btn {
            width: 100%;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            color: #000; border: none; border-radius: 12px;
            padding: 1rem; font-family: var(--font-body);
            font-size: 1rem; font-weight: 700; cursor: pointer;
            transition: all 0.2s;
        }
        .modal-add-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        /* ── Filters bar ── */
        .filters-bar {
            display: flex; align-items: center; gap: 1rem;
            margin-bottom: 1.5rem; flex-wrap: wrap;
        }
        .results-info { font-size: 0.85rem; color: var(--muted); margin-left: auto; }

        /* ── Loading spinner ── */
        .spinner {
            display: inline-block; width: 18px; height: 18px;
            border: 2px solid rgba(110,231,247,0.3);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Animations ── */
        [x-cloak] { display: none !important; }

        .fade-up {
            animation: fadeUp 0.4s ease forwards;
        }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .slide-right {
            animation: slideRight 0.35s cubic-bezier(0.34,1.2,0.64,1) forwards;
        }
        @keyframes slideRight {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0); opacity: 1; }
        }
        .pop { animation: pop 0.3s cubic-bezier(0.34,1.4,0.64,1); }
        @keyframes pop { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        /* ── Responsive ── */
        @media (max-width: 768px) {
            .header-inner { gap: 1rem; flex-wrap: wrap; height: auto; padding: 0.75rem 0; }
            .nav-cats { display: none; }
            .cart-panel { width: 100%; }
            .hero { padding: 3rem 1.5rem 2.5rem; }
        }
    </style>
</head>
<body>

<!-- ═══ HEADER ═══ -->
<header>
    <div class="header-inner">
        <div class="logo">Tech<span>Store</span> ⚡</div>

        <!-- Barre de recherche -->
        <div class="search-wrap">
            <span class="search-icon">🔍</span>
            <input
                type="text"
                class="search-input"
                placeholder="Rechercher un produit…"
                x-model="searchQuery"
                @input.debounce.300ms="filterProducts()"
            >
        </div>

        <!-- Catégories -->
        <nav>
            <ul class="nav-cats">
                <li>
                    <button
                        class="cat-btn"
                        :class="activeCategory === 'all' ? 'active' : ''"
                        @click="setCategory('all')"
                    >Tout</button>
                </li>
                <template x-for="(cat, key) in categories" :key="key">
                    <li>
                        <button
                            class="cat-btn"
                            :class="activeCategory === key ? 'active' : ''"
                            @click="setCategory(key)"
                            x-text="cat.icon + ' ' + cat.label"
                        ></button>
                    </li>
                </template>
            </ul>
        </nav>

        <!-- Panier -->
        <button class="cart-btn" @click="cartOpen = true">
            🛒 Panier
            <span class="cart-count" x-text="cartCount" x-show="cartCount > 0" x-cloak></span>
        </button>
    </div>
</header>

<!-- ═══ HERO ═══ -->
<section class="hero">
    <div class="hero-tag">✨ Nouvelle collection disponible</div>
    <h1>Le meilleur de la <span class="grad">tech</span><br>à portée de clic</h1>
    <p>Ordinateurs, smartphones, composants & accessoires — tout ce dont vous avez besoin.</p>
    <div class="stats">
        <div class="stat">
            <div class="stat-val" x-text="allProducts.length + '+'"></div>
            <div class="stat-lbl">Produits</div>
        </div>
        <div class="stat">
            <div class="stat-val">5</div>
            <div class="stat-lbl">Catégories</div>
        </div>
        <div class="stat">
            <div class="stat-val">24h</div>
            <div class="stat-lbl">Livraison</div>
        </div>
        <div class="stat">
            <div class="stat-val">4.8⭐</div>
            <div class="stat-lbl">Note moyenne</div>
        </div>
    </div>
</section>

<!-- ═══ MAIN ═══ -->
<main class="main">

    <!-- Filtres actifs -->
    <div class="filters-bar">
        <div class="section-title" style="margin-bottom:0; font-size:1.2rem">
            <template x-if="activeCategory === 'all' && !searchQuery">
                <span>🔥 Tous les produits</span>
            </template>
            <template x-if="activeCategory !== 'all'">
                <span x-text="categories[activeCategory]?.icon + ' ' + categories[activeCategory]?.label"></span>
            </template>
            <template x-if="searchQuery">
                <span>🔍 Résultats pour "<span x-text="searchQuery"></span>"</span>
            </template>
        </div>
        <span class="results-info" x-text="filteredProducts.length + ' produit(s)'"></span>
    </div>

    <!-- Grille produits -->
    <div class="products-grid">
        <template x-for="product in filteredProducts" :key="product.id">
            <div
                class="product-card fade-up"
                @click="openModal(product)"
            >
                <!-- Badge -->
                <template x-if="product.badge">
                    <span
                        class="badge"
                        :class="{
                            'badge-new':  product.badge === 'Nouveau',
                            'badge-sale': product.badge?.includes('%'),
                            'badge-pro':  product.badge === 'Pro' || product.badge === 'Bestseller' || product.badge === '4K' || product.badge === 'OLED',
                            'badge-default': true
                        }"
                        x-text="product.badge"
                    ></span>
                </template>

                <!-- Image emoji -->
                <span class="product-img" x-text="product.image"></span>

                <!-- Catégorie -->
                <div class="product-category" x-text="categories[product.category]?.label || product.category"></div>

                <!-- Nom -->
                <div class="product-name" x-text="product.name"></div>

                <!-- Description -->
                <div class="product-desc" x-text="product.description"></div>

                <!-- Rating -->
                <div class="rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-val" x-text="product.rating + '/5'"></span>
                </div>

                <!-- Prix + bouton -->
                <div class="product-footer">
                    <div class="price" x-text="product.price_formatted"></div>
                    <template x-if="product.in_stock">
                        <button
                            class="add-btn"
                            @click.stop="addToCart(product)"
                        >+ Ajouter</button>
                    </template>
                    <template x-if="!product.in_stock">
                        <span class="stock-out">⚠ Rupture</span>
                    </template>
                </div>
            </div>
        </template>

        <!-- Empty state -->
        <div
            x-show="filteredProducts.length === 0 && !loading"
            style="grid-column:1/-1; text-align:center; padding:4rem; color:var(--muted);"
            x-cloak
        >
            <div style="font-size:3rem; margin-bottom:1rem">😕</div>
            <p>Aucun produit trouvé pour "<span x-text="searchQuery"></span>"</p>
        </div>
    </div>

</main>

<!-- ═══ PANIER PANEL ═══ -->
<template x-if="cartOpen" x-cloak>
    <div>
        <div class="cart-overlay" @click="cartOpen = false"></div>
        <aside class="cart-panel slide-right">

            <div class="cart-header">
                <h2>🛒 Mon Panier <span style="font-size:0.85rem;color:var(--muted);font-weight:400" x-text="cartCount > 0 ? '(' + cartCount + ' article' + (cartCount > 1 ? 's' : '') + ')' : ''"></span></h2>
                <button class="close-btn" @click="cartOpen = false">✕</button>
            </div>

            <div class="cart-items">
                <!-- Vide -->
                <div class="cart-empty" x-show="cartItems.length === 0">
                    <div class="empty-icon">🛍️</div>
                    <p>Votre panier est vide.<br>Ajoutez des produits pour commencer !</p>
                </div>

                <!-- Articles -->
                <template x-for="item in cartItems" :key="item.product.id">
                    <div class="cart-item">
                        <span class="cart-item-img" x-text="item.product.image"></span>
                        <div class="cart-item-info">
                            <div class="cart-item-name" x-text="item.product.name"></div>
                            <div class="cart-item-price" x-text="formatPrice(item.product.price * item.quantity)"></div>
                            <div class="qty-controls">
                                <button class="qty-btn" @click="updateQty(item.product.id, item.quantity - 1)">−</button>
                                <span class="qty-val" x-text="item.quantity"></span>
                                <button class="qty-btn" @click="updateQty(item.product.id, item.quantity + 1)">+</button>
                            </div>
                        </div>
                        <button class="remove-btn" @click="removeFromCart(item.product.id)" title="Supprimer">🗑</button>
                    </div>
                </template>
            </div>

            <!-- Footer panier -->
            <div class="cart-footer" x-show="cartItems.length > 0">
                <div class="cart-total">
                    <span class="cart-total-label">Total TTC</span>
                    <span class="cart-total-val" x-text="formatPrice(cartTotal)"></span>
                </div>
                <button class="checkout-btn" @click="checkout()">
                    Passer la commande →
                </button>
                <button class="clear-cart-btn" @click="clearCart()">
                    🗑 Vider le panier
                </button>
            </div>

        </aside>
    </div>
</template>

<!-- ═══ MODAL PRODUIT ═══ -->
<template x-if="selectedProduct" x-cloak>
    <div class="modal-overlay" @click.self="selectedProduct = null">
        <div class="modal pop">
            <div class="modal-body">
                <button
                    class="close-btn"
                    style="margin-left:auto;display:flex;margin-bottom:1rem"
                    @click="selectedProduct = null"
                >✕</button>

                <span class="modal-img" x-text="selectedProduct.image"></span>
                <div class="modal-cat" x-text="categories[selectedProduct.category]?.label"></div>
                <h2 class="modal-name" x-text="selectedProduct.name"></h2>
                <p class="modal-desc" x-text="selectedProduct.description"></p>

                <div class="modal-meta">
                    <div class="meta-item">
                        <div class="meta-key">Note</div>
                        <div class="meta-val" x-text="'⭐ ' + selectedProduct.rating + '/5'"></div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-key">Stock</div>
                        <div class="meta-val" x-text="selectedProduct.stock + ' unité(s)'" :style="selectedProduct.in_stock ? 'color:var(--accent3)' : 'color:var(--danger)'"></div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-key">Livraison</div>
                        <div class="meta-val" style="color:var(--accent3)">24h ⚡</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-key">Garantie</div>
                        <div class="meta-val">2 ans</div>
                    </div>
                </div>

                <div class="modal-price" x-text="selectedProduct.price_formatted"></div>

                <template x-if="selectedProduct.in_stock">
                    <button class="modal-add-btn" @click="addToCart(selectedProduct); selectedProduct = null">
                        🛒 Ajouter au panier
                    </button>
                </template>
                <template x-if="!selectedProduct.in_stock">
                    <button class="modal-add-btn" style="opacity:0.5;cursor:not-allowed" disabled>
                        ⚠ Produit indisponible
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<!-- ═══ TOAST ═══ -->
<div class="toast-wrap" x-show="toast.visible" x-cloak>
    <div class="toast" x-text="toast.message"></div>
</div>

<!-- ═══ JAVASCRIPT Alpine.js Component ═══ -->
<script>
/**
 * Composant Alpine.js principal — TechStore
 * Gère : produits, panier, filtres, recherche, modal, notifications
 */
function techStore() {
    return {
        // ─── State ───────────────────────────────────────────────────
        allProducts:      <?= json_encode(array_values(array_map(fn($p) => $p->toArray(), $featured ?? [])), JSON_UNESCAPED_UNICODE) ?>,
        filteredProducts: [],
        categories:       <?= json_encode($categories ?? [], JSON_UNESCAPED_UNICODE) ?>,
        activeCategory:   'all',
        searchQuery:      '',
        loading:          false,

        cartOpen:    false,
        cartItems:   [],
        cartTotal:   0,
        cartCount:   0,

        selectedProduct: null,

        toast: { visible: false, message: '', timer: null },

        // ─── Initialisation ───────────────────────────────────────────
        async init() {
            await this.fetchProducts();
            await this.fetchCart();

            // Keyboard shortcut : Escape ferme les panels
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.cartOpen = false;
                    this.selectedProduct = null;
                }
            });
        },

        // ─── API calls ────────────────────────────────────────────────
        async fetchProducts() {
            this.loading = true;
            try {
                const params = new URLSearchParams();
                if (this.activeCategory !== 'all') params.set('category', this.activeCategory);
                if (this.searchQuery) params.set('search', this.searchQuery);

                const res  = await fetch(`/api/products?${params}`);
                const data = await res.json();

                if (data.success) {
                    this.filteredProducts = data.products;
                    if (!this.searchQuery && this.activeCategory === 'all') {
                        this.allProducts = data.products;
                    }
                }
            } catch (err) {
                console.error('Erreur fetchProducts:', err);
                // Fallback sur les données PHP injectées
                this.filteredProducts = this.allProducts;
            }
            this.loading = false;
        },

        async fetchCart() {
            try {
                const res  = await fetch('/api/cart');
                const data = await res.json();
                if (data.success) this.syncCart(data.cart);
            } catch (err) {
                console.warn('Panier non disponible (mode démo)');
                this.cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
                this.recalcCart();
            }
        },

        // ─── Filtrage ─────────────────────────────────────────────────
        setCategory(cat) {
            this.activeCategory = cat;
            this.searchQuery    = '';
            this.fetchProducts();
        },

        filterProducts() {
            this.fetchProducts();
        },

        // ─── Panier ───────────────────────────────────────────────────
        async addToCart(product) {
            if (!product.in_stock) return;

            // Optimistic update
            const existing = this.cartItems.find(i => i.product.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.cartItems.push({ product, quantity: 1 });
            }
            this.recalcCart();
            this.saveLocalCart();

            // API call
            try {
                const res = await fetch('/api/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id: product.id, quantity: 1 }),
                });
                const data = await res.json();
                if (data.success) this.syncCart(data.cart);
            } catch {}

            this.showToast(`✅ ${product.name} ajouté au panier`);
        },

        async removeFromCart(productId) {
            this.cartItems = this.cartItems.filter(i => i.product.id !== productId);
            this.recalcCart();
            this.saveLocalCart();

            try {
                const res  = await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
                const data = await res.json();
                if (data.success) this.syncCart(data.cart);
            } catch {}
        },

        async updateQty(productId, qty) {
            if (qty <= 0) { this.removeFromCart(productId); return; }

            const item = this.cartItems.find(i => i.product.id === productId);
            if (item) { item.quantity = qty; this.recalcCart(); this.saveLocalCart(); }

            try {
                const res = await fetch(`/api/cart/${productId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity: qty }),
                });
                const data = await res.json();
                if (data.success) this.syncCart(data.cart);
            } catch {}
        },

        async clearCart() {
            this.cartItems = [];
            this.recalcCart();
            this.saveLocalCart();

            try {
                await fetch('/api/cart', { method: 'DELETE' });
            } catch {}

            this.showToast('🗑 Panier vidé');
        },

        checkout() {
            this.showToast('🎉 Commande passée ! (démo)');
            setTimeout(() => this.clearCart(), 800);
            this.cartOpen = false;
        },

        // ─── Helpers panier ───────────────────────────────────────────
        syncCart(cartData) {
            this.cartItems = cartData.items || [];
            this.cartTotal = cartData.total || 0;
            this.cartCount = cartData.count || 0;
        },

        recalcCart() {
            this.cartTotal = this.cartItems.reduce(
                (sum, i) => sum + i.product.price * i.quantity, 0
            );
            this.cartCount = this.cartItems.reduce(
                (sum, i) => sum + i.quantity, 0
            );
        },

        saveLocalCart() {
            localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
        },

        // ─── Modal ────────────────────────────────────────────────────
        openModal(product) {
            this.selectedProduct = product;
        },

        // ─── Toast ────────────────────────────────────────────────────
        showToast(message) {
            clearTimeout(this.toast.timer);
            this.toast.message = message;
            this.toast.visible = true;
            this.toast.timer   = setTimeout(() => { this.toast.visible = false; }, 2800);
        },

        // ─── Formatage ────────────────────────────────────────────────
        formatPrice(amount) {
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency', currency: 'EUR'
            }).format(amount);
        },
    };
}
</script>

</body>
</html>
