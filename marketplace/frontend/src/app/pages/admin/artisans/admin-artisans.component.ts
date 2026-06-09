import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ArtisanService } from '../../../core/services/artisan.service';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../core/services/toast.service';
import { Artisan, Produit } from '../../../core/models/models';

@Component({
  selector: 'app-admin-artisans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des Artisans</h1>

      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative flex-1 min-w-[200px]">
          <input [(ngModel)]="search" placeholder="Rechercher…" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div class="flex gap-2 flex-wrap">
          @for (f of ['all','active','inactive']; track f) {
            <button (click)="filterStatus=f"
                    [class]="filterStatus===f ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-3 py-1.5 rounded-full text-sm">
              {{ f==='all' ? 'Tous' : f==='active' ? 'Actifs' : 'Inactifs' }}
              @if (f==='inactive' && pendingCount() > 0) {
                <span class="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">{{ pendingCount() }}</span>
              }
            </button>
          }
        </div>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Boutique</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">N° TVA</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">Chargement…</td></tr>
              }
              @for (a of filtered; track a.id_artisan) {
                <tr class="border-t hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3">
                    <div class="font-medium">{{ a.nom_boutique }}</div>
                    <div class="text-xs text-gray-500">{{ a.description?.slice(0,50) }}</div>
                  </td>
                  <td class="px-4 py-3 text-gray-500 hidden sm:table-cell font-mono text-xs">{{ a.numero_tva || '—' }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-1 rounded-full" [class]="a.valide ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                      {{ a.valide ? 'Actif' : 'En attente' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="flex justify-end gap-2 flex-wrap">
                      <button (click)="openPanel(a, 'products')" class="text-xs border border-amber-300 text-amber-600 hover:bg-amber-50 px-2 py-1 rounded-lg">📦 Produits</button>
                      <button (click)="openPanel(a, 'details')" class="text-xs border border-gray-300 text-gray-600 hover:bg-gray-50 px-2 py-1 rounded-lg">ℹ️ Détails</button>
                      @if (!a.valide) {
                        <button (click)="activate(a, true)" class="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg">✓ Valider</button>
                        <button (click)="activate(a, false)" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg">✗ Refuser</button>
                      } @else {
                        <button (click)="activate(a, false)" class="text-xs border border-red-300 text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg">Désactiver</button>
                      }
                    </div>
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">Aucun artisan trouvé</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      @if (selectedArtisan) {
        <div class="mt-6 card p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold">{{ selectedTab() === 'products' ? 'Produits de l’artisan' : 'Informations artisan' }}</h2>
            <button (click)="closePanel()" class="text-sm text-gray-500 hover:text-gray-700">✕ Fermer</button>
          </div>

          @if (selectedTab() === 'products') {
            @if (artisanProducts.length === 0) {
              <p class="text-sm text-gray-500">Aucun produit pour cet artisan.</p>
            } @else {
              <div class="space-y-2">
                @for (product of artisanProducts; track product.id_produit) {
                  <div class="border rounded-lg p-3 text-sm">
                    <div class="font-medium">{{ product.nom }}</div>
                    <div class="text-gray-600">{{ product.prix_ht }} € • Stock : {{ product.stock }}</div>
                  </div>
                }
              </div>
            }
          } @else {
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div class="border rounded-lg p-3">
                <div class="text-gray-500 mb-1">Boutique</div>
                <div class="font-medium">{{ selectedArtisan!.nom_boutique }}</div>
              </div>
              <div class="border rounded-lg p-3">
                <div class="text-gray-500 mb-1">N° TVA</div>
                <div class="font-medium">{{ selectedArtisan!.numero_tva || '—' }}</div>
              </div>
              <div class="border rounded-lg p-3">
                <div class="text-gray-500 mb-1">Commission</div>
                <div class="font-medium">{{ selectedArtisan!.commission ?? '—' }}</div>
              </div>
              <div class="border rounded-lg p-3">
                <div class="text-gray-500 mb-1">Statut</div>
                <div class="font-medium">{{ selectedArtisan!.valide ? 'Actif' : 'En attente' }}</div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class AdminArtisansComponent implements OnInit {
  artisans    = signal<Artisan[]>([]);
  products    = signal<Produit[]>([]);
  loading     = signal(true);
  search      = '';
  filterStatus = 'all';
  selectedArtisanId = signal<number | null>(null);
  selectedTab = signal<'products' | 'details' | null>(null);

  pendingCount = signal(0);

  get filtered(): Artisan[] {
    return this.artisans().filter(a => {
      const ms = !this.search || a.nom_boutique.toLowerCase().includes(this.search.toLowerCase());
      const fs = this.filterStatus === 'all'
        || (this.filterStatus === 'active' ? !!a.valide : !a.valide);
      return ms && fs;
    });
  }

  get selectedArtisan(): Artisan | null {
    return this.artisans().find(a => a.id_artisan === this.selectedArtisanId()) ?? null;
  }

  get artisanProducts(): Produit[] {
    return this.products().filter(p => p.id_artisan === this.selectedArtisanId());
  }

  constructor(private artisanSvc: ArtisanService, private productSvc: ProductService, private toast: ToastService) {}

  ngOnInit() {
    forkJoin({
      artisans: this.artisanSvc.adminGetAll(),
      products: this.productSvc.adminGetAll(),
    }).subscribe(({ artisans, products }) => {
      this.artisans.set(artisans);
      this.products.set(products);
      this.pendingCount.set(artisans.filter(a => !a.valide).length);
      this.loading.set(false);
    });
  }

  openPanel(artisan: Artisan, tab: 'products' | 'details') {
    this.selectedArtisanId.set(artisan.id_artisan);
    this.selectedTab.set(tab);
  }

  closePanel() {
    this.selectedArtisanId.set(null);
    this.selectedTab.set(null);
  }

  activate(a: Artisan, activer: boolean) {
    this.artisanSvc.adminUpdate(a.id_artisan, { valide: activer ? 1 : 0 }).subscribe({
      next: () => { this.ngOnInit(); this.toast.success(activer ? 'Artisan validé' : 'Artisan désactivé'); },
      error: () => this.toast.error('Erreur'),
    });
  }
}
