import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../core/services/toast.service';
import { getProductImageSrc } from '../../../core/utils/image-path';
import { Produit, CATEGORY_LABELS } from '../../../core/models/models';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des Produits</h1>

      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative flex-1 min-w-[200px]">
          <input [(ngModel)]="search" placeholder="Rechercher un produit…" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <select [(ngModel)]="filterCategory" class="border rounded-lg px-3 py-2 text-sm">
          <option value="">Toutes catégories</option>
          @for (cat of categories; track cat.key) {
            <option [value]="cat.key">{{ cat.label }}</option>
          }
        </select>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Produit</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Artisan ID</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Prix HT</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Stock</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Visible</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Chargement…</td></tr>
              }
              @for (p of filtered; track p.id_produit) {
                <tr class="border-t hover:bg-gray-50 transition-colors" [class.opacity-50]="!p.actif">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        @if (p.image_principale) {
                          <img [src]="getProductImageSrc(p.image_principale)" [alt]="p.nom" class="w-full h-full object-cover" />
                        }
                      </div>
                      <div>
                        <div class="font-medium leading-tight">{{ p.nom }}</div>
                        @if (p.mis_en_avant) {
                          <span class="text-xs bg-amber-100 text-amber-800 px-1.5 rounded">Mis en avant</span>
                        }
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-gray-500 hidden md:table-cell">#{{ p.id_artisan }}</td>
                  <td class="px-4 py-3 font-semibold">{{ p.prix_ht | number:'1.2-2' }} €</td>
                  <td class="px-4 py-3 hidden lg:table-cell" [class.text-red-600]="p.stock===0" [class.font-medium]="p.stock===0">{{ p.stock }}</td>
                  <td class="px-4 py-3 text-right">
                    <button (click)="toggleVisibility(p)" class="text-xl">{{ p.actif ? '👁️' : '🚫' }}</button>
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Aucun produit</td></tr>
              }
            </tbody>
          </table>
        </div>
        <div class="px-4 py-3 border-t bg-gray-50 text-xs text-gray-500">
          {{ filtered.length }} produit(s) affiché(s)
        </div>
      </div>
    </div>
  `,
})
export class AdminProductsComponent implements OnInit {
  readonly getProductImageSrc = getProductImageSrc;

  produits        = signal<Produit[]>([]);
  loading         = signal(true);
  search          = '';
  filterCategory  = '';

  categories = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label }));

  get filtered(): Produit[] {
    return this.produits().filter(p => {
      const ms = !this.search || p.nom.toLowerCase().includes(this.search.toLowerCase());
      const fc = !this.filterCategory || (p as any).categorie === this.filterCategory;
      return ms && fc;
    });
  }

  constructor(private productSvc: ProductService, private toast: ToastService) {}

  ngOnInit() {
    this.productSvc.adminGetAll().subscribe(ps => { this.produits.set(ps); this.loading.set(false); });
  }

  toggleVisibility(p: Produit) {
    this.productSvc.adminUpdate(p.id_produit, { actif: p.actif ? 0 : 1 }).subscribe({
      next: () => { this.ngOnInit(); this.toast.success('Visibilité mise à jour'); },
      error: () => this.toast.error('Erreur'),
    });
  }
}
