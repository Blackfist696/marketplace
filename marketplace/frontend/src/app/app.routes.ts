import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login',    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },

  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: 'home',         loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
      { path: 'catalogue',    loadComponent: () => import('./pages/catalogue/catalogue.component').then(m => m.CatalogueComponent) },
      { path: 'produit/:id',  loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
      { path: 'panier',       loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent) },
      { path: 'profil',       loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
      { path: 'commande',     loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [authGuard] },
      { path: 'boutique/:id', loadComponent: () => import('./pages/artisan-shop/artisan-shop.component').then(m => m.ArtisanShopComponent) },
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
      { path: 'commandes', loadComponent: () => import('./pages/admin/orders/admin-orders.component').then(m => m.AdminOrdersComponent) },
      { path: 'produits',  loadComponent: () => import('./pages/admin/products/admin-products.component').then(m => m.AdminProductsComponent) },
    ],
  },

  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
