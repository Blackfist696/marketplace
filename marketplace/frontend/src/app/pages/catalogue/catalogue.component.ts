import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Produit, CATEGORY_LABELS } from '../../core/models/models';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProductCardComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <a routerLink="/home" class="hover:text-gray-900">Accueil</a>
        <span>›</span>
        <span class="text-gray-900 font-medium">Catalogue</span>
      </nav>

      <div class="flex gap-8">
        <!-- Sidebar -->
        <aside class="hidden lg:block w-56 shrink-0">
          <div class="card p-5 sticky top-24">
            <h2 class="font-semibold mb-4">Filtrer</h2>

            <div class="mb-4">
              <p class="text-xs font-medium text-gray-500 uppercase mb-2">Catégorie</p>
              <div class="space-y-1">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="cat" [value]="''" [(ngModel)]="selectedCategory" (change)="page.set(1)" />
                  Toutes
                </label>
                @for (cat of categories; track cat.key) {
                  <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="cat" [value]="cat.key" [(ngModel)]="selectedCategory" (change)="page.set(1)" />
                    {{ cat.label }}
                  </label>
                }
              </div>
            </div>

            <div class="mb-4">
              <p class="text-xs font-medium text-gray-500 uppercase mb-2">Prix max : {{ maxPrice }} €</p>
              <input type="range" min="0" max="200" step="5" [(ngModel)]="maxPrice" (change)="page.set(1)" class="w-full" />
            </div>

            <button (click)="resetFilters()" class="text-xs text-amber-600 hover:underline">Réinitialiser</button>
          </div>
        </aside>

        <!-- Main -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
            <!-- Search -->
            <div class="relative flex-1 min-w-[200px] max-w-sm">
              <input type="text" placeholder="Rechercher..." [(ngModel)]="search" (ngModelChange)="page.set(1)"
                     class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            </div>
            <div class="flex items-center gap-2">
              <select [(ngModel)]="sortBy" class="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="default">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="newest">Nouveautés</option>
              </select>
              <span class="text-sm text-gray-500">{{ filtered().length }} produits</span>
            </div>
          </div>

          @if (loading()) {
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
              @for (i of [1,2,3,4,5,6]; track i) {
                <div class="card animate-pulse">
                  <div class="aspect-square bg-gray-200 rounded-t-lg"></div>
                  <div class="p-4"><div class="h-3 bg-gray-200 rounded mb-2 w-3/4"></div><div class="h-4 bg-gray-200 rounded w-full"></div></div>
                </div>
              }
            </div>
          } @else if (paginated().length === 0) {
            <div class="text-center py-20">
              <p class="text-gray-500 mb-4">Aucun produit trouvé</p>
              <button (click)="resetFilters()" class="text-amber-600 hover:underline text-sm">Réinitialiser les filtres</button>
            </div>
          } @else {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (p of paginated(); track p.id_produit) {
                <app-product-card [produit]="p" />
              }
            </div>
          }

          <!-- Pagination -->
          @if (totalPages() > 1) {
            <div class="flex items-center justify-center gap-2 mt-10">
              <button [disabled]="page() === 1" (click)="page.set(page()-1)"
                      class="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40">← Préc.</button>
              @for (p of pageRange(); track p) {
                <button (click)="page.set(p)"
                        [class]="page()===p ? 'bg-amber-500 text-white px-3 py-1.5 rounded-lg text-sm' : 'px-3 py-1.5 border rounded-lg text-sm'">
                  {{ p }}
                </button>
              }
              <button [disabled]="page() === totalPages()" (click)="page.set(page()+1)"
                      class="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40">Suiv. →</button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class CatalogueComponent implements OnInit {
  all      = signal<Produit[]>([]);
  loading  = signal(true);
  page     = signal(1);
  search   = '';
  selectedCategory = '';
  maxPrice = 200;
  sortBy   = 'default';
  readonly PER_PAGE = 9;

  categories = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label }));

  filtered = computed(() => {
    let result = this.all().filter(p => p.actif);
    if (this.search) result = result.filter(p => p.nom.toLowerCase().includes(this.search.toLowerCase()));
    if (this.selectedCategory) result = result.filter(p => (p as any).categorie === this.selectedCategory);
    result = result.filter(p => p.prix_ht <= this.maxPrice);
    if (this.sortBy === 'price-asc')  result = [...result].sort((a,b) => a.prix_ht - b.prix_ht);
    if (this.sortBy === 'price-desc') result = [...result].sort((a,b) => b.prix_ht - a.prix_ht);
    if (this.sortBy === 'newest')     result = [...result].sort((a,b) => (b.date_creation ?? '').localeCompare(a.date_creation ?? ''));
    return result;
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.PER_PAGE)));
  paginated  = computed(() => this.filtered().slice((this.page()-1)*this.PER_PAGE, this.page()*this.PER_PAGE));
  pageRange  = computed(() => Array.from({length: Math.min(this.totalPages(), 5)}, (_,i) => i+1));

  constructor(private productSvc: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => { if (p['category']) this.selectedCategory = p['category']; });
    this.productSvc.getAll().subscribe(ps => { this.all.set(ps); this.loading.set(false); });
  }

  resetFilters() { this.search = ''; this.selectedCategory = ''; this.maxPrice = 200; this.sortBy = 'default'; this.page.set(1); }
}
