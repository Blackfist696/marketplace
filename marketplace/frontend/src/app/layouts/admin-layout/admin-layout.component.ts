import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-60 flex-shrink-0 flex flex-col" style="background:var(--sidebar-bg);color:var(--sidebar-foreground)">
        <div class="px-6 py-5 border-b" style="border-color:var(--sidebar-border)">
          <a routerLink="/home" class="font-serif text-lg font-bold" style="color:var(--primary)">🍯 Artizanat</a>
          <p class="text-xs mt-1 opacity-60">Administration</p>
        </div>
        <nav class="flex-1 px-3 py-4 space-y-1">
          <a routerLink="/admin/dashboard" routerLinkActive="sidebar-active" class="sidebar-link">
            📊 Tableau de bord
          </a>
          <a routerLink="/admin/artisans" routerLinkActive="sidebar-active" class="sidebar-link">
            🏪 Artisans
          </a>
          <a routerLink="/admin/commandes" routerLinkActive="sidebar-active" class="sidebar-link">
            🛒 Commandes
          </a>
          <a routerLink="/admin/produits" routerLinkActive="sidebar-active" class="sidebar-link">
            📦 Produits
          </a>
        </nav>
        <div class="px-3 py-4 border-t" style="border-color:var(--sidebar-border)">
          <a routerLink="/home" class="sidebar-link text-gray-400">🌐 Voir la boutique</a>
          <button (click)="logout()" class="sidebar-link w-full text-left text-red-400 hover:text-red-300 mt-1">
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      <!-- Content -->
      <main class="flex-1 overflow-auto bg-gray-50">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .sidebar-link {
      display: block; padding: 0.5rem 0.75rem; border-radius: 0.5rem;
      font-size: 0.875rem; transition: background .15s;
      color: var(--sidebar-foreground);
    }
    .sidebar-link:hover { background: var(--sidebar-accent); }
    .sidebar-active { background: var(--sidebar-accent) !important; color: var(--primary) !important; font-weight: 600; }
  `],
})
export class AdminLayoutComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() { this.auth.logout().subscribe(() => this.router.navigate(['/home'])); }
}
