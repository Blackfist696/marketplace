import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Connexion', description: 'Connectez-vous à votre espace Marketplace pour gérer votre profil, vos commandes et vos produits.' },
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent),
    data: { title: 'Inscription', description: 'Créez votre compte Marketplace pour découvrir des produits artisanaux et suivre vos achats.' },
  },

  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        data: { title: 'Accueil', description: 'Découvrez notre marketplace de produits artisanaux, sélectionnés pour leur qualité et leur authenticité.' },
      },
      {
        path: 'catalogue',
        loadComponent: () => import('./pages/catalogue/catalogue.component').then(m => m.CatalogueComponent),
        data: { title: 'Catalogue', description: 'Parcourez le catalogue Marketplace et trouvez des produits artisanaux adaptés à vos besoins.' },
      },
      {
        path: 'produit/:id',
        loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
        data: { title: 'Produit', description: 'Consultez les détails du produit, ses caractéristiques et les informations de l’artisan.' },
      },
      {
        path: 'panier',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
        data: { title: 'Panier', description: 'Vérifiez votre panier et finalisez votre commande sur Marketplace.' },
      },
      {
        path: 'profil',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard],
        data: { title: 'Profil', description: 'Gérez vos informations personnelles, votre adresse et vos préférences depuis votre profil Marketplace.' },
      },
      {
        path: 'commande',
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        canActivate: [authGuard],
        data: { title: 'Commande', description: 'Finalisez votre commande rapidement et en toute sécurité sur Marketplace.' },
      },
      {
        path: 'boutique/:id',
        loadComponent: () => import('./pages/artisan-shop/artisan-shop.component').then(m => m.ArtisanShopComponent),
        data: { title: 'Boutique', description: 'Découvrez la boutique d’un artisan et ses produits phares sur Marketplace.' },
      },
    ],
  },

  {
    path: 'artisan',
    loadComponent: () => import('./layouts/artisan-layout/artisan-layout.component').then(m => m.ArtisanLayoutComponent),
    canActivate: [roleGuard(2)],
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/artisan/dashboard/artisan-dashboard.component').then(m => m.ArtisanDashboardComponent) },
      { path: 'produits',  loadComponent: () => import('./pages/artisan/products/artisan-products.component').then(m => m.ArtisanProductsComponent) },
      { path: 'commandes', loadComponent: () => import('./pages/artisan/orders/artisan-orders.component').then(m => m.ArtisanOrdersComponent) },
      { path: 'stats',     loadComponent: () => import('./pages/artisan/stats/artisan-stats.component').then(m => m.ArtisanStatsComponent) },
      { path: 'stats/consultation-produits', loadComponent: () => import('./pages/artisan/stats/artisan-product-consultations.component').then(m => m.ArtisanProductConsultationsComponent) },
    ],
  },

  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [roleGuard(1)],
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'artisans',  loadComponent: () => import('./pages/admin/artisans/admin-artisans.component').then(m => m.AdminArtisansComponent) },
      { path: 'clients',   loadComponent: () => import('./pages/admin/clients/admin-clients.component').then(m => m.AdminClientsComponent) },
      { path: 'commandes', loadComponent: () => import('./pages/admin/orders/admin-orders.component').then(m => m.AdminOrdersComponent) },
      { path: 'produits',  loadComponent: () => import('./pages/admin/products/admin-products.component').then(m => m.AdminProductsComponent) },
    ],
  },

  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
