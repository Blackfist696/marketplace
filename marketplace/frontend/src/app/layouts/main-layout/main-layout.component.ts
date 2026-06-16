import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/home" class="font-serif text-xl font-bold text-amber-600">🍯 Artizanat</a>

          <!-- Nav -->
          <nav class="hidden md:flex items-center gap-6 text-sm">
            <a routerLink="/home"      routerLinkActive="text-amber-600 font-medium" class="text-gray-600 hover:text-gray-900">Accueil</a>
            <a routerLink="/catalogue" routerLinkActive="text-amber-600 font-medium" class="text-gray-600 hover:text-gray-900">Catalogue</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Panier -->
            <a routerLink="/panier" class="relative text-gray-600 hover:text-amber-600 p-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"/>
              </svg>
              @if (cart.count() > 0) {
                <span class="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {{ cart.count() }}
                </span>
              }
            </a>

            @if (auth.isLoggedIn()) {
              <!-- Menu utilisateur -->
              <a routerLink="/profil" class="text-sm text-gray-600 hover:text-amber-600 whitespace-nowrap">
                Bonjour {{ auth.getDisplayName() }}
              </a>
              @if (auth.isArtisan()) {
                <a routerLink="/artisan/dashboard" class="text-sm text-gray-600 hover:text-amber-600">Mon espace</a>
              }
              @if (auth.isAdmin()) {
                <a routerLink="/admin/dashboard" class="text-sm text-gray-600 hover:text-amber-600">Admin</a>
              }
              <button (click)="logout()" class="text-sm text-gray-500 hover:text-red-500">Déconnexion</button>
            } @else {
              <a routerLink="/login" class="text-sm bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
                Connexion
              </a>
            }
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="min-h-screen">
      <router-outlet />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-10 mt-16">
      <div class="max-w-7xl mx-auto px-4 text-center text-sm">
        <p class="font-serif text-white text-lg mb-2">Artizanat</p>
        <p>© 2026 — Marketplace artisanal belge</p>
      </div>
    </footer>
  `,
})
export class MainLayoutComponent {
  constructor(public auth: AuthService, public cart: CartService, private router: Router) {}

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/home']));
  }
}
