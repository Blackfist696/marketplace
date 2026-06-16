import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { AiAssistantComponent } from '../../shared/ai-assistant/ai-assistant.component';
import { Produit, Categorie } from '../../core/models/models';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProductCardComponent, AiAssistantComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <a routerLink="/home" class="hover:text-gray-900">Accueil</a>
        <span>›</span>
        <span class="text-gray-900 font-medium">Catalogue</span>
      </nav>

      <!-- Filtres mobile (visible uniquement < lg) -->
      <div class="lg:hidden mb-4">
        <button (click)="showMobileFilters.set(!showMobileFilters())"
                class="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium w-full justify-between">
          <span>🔧 Filtres{{ activeFilterCount() > 0 ? ' (' + activeFilterCount() + ')' : '' }}</span>
          <span>{{ showMobileFilters() ? '▲' : '▼' }}</span>
        </button>

        @if (showMobileFilters()) {
          <div class="mt-2 border border-gray-200 rounded-lg p-4 bg-white space-y-4">
            <!-- Catégorie -->
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase mb-2">Catégorie</p>
              <div class="grid grid-cols-2 gap-1">
                <button (click)="selectedCategory.set(''); page.set(1)"
                        [class]="selectedCategory() === '' ? 'px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 text-white' : 'px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200'">
                  Toutes
                </button>
                @for (cat of categories(); track cat.id_categorie) {
                  <button (click)="selectedCategory.set(cat.nom); page.set(1)"
                          [class]="selectedCategory() === cat.nom ? 'px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 text-white' : 'px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200'">
                    {{ cat.nom | titlecase }}
                  </button>
                }
              </div>
            </div>

            <!-- Prix -->
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase mb-2">Prix max : {{ maxPrice() }} €</p>
              <input type="range" min="0" max="200" step="5"
                     [ngModel]="maxPrice()"
                     (ngModelChange)="maxPrice.set($event); page.set(1)"
                     class="w-full" />
            </div>

            <button (click)="resetFilters(); showMobileFilters.set(false)"
                    class="text-xs text-amber-600 hover:underline w-full text-left">
              Réinitialiser
            </button>
          </div>
        }
      </div>

      <div class="flex gap-8">
        <!-- Sidebar desktop -->
        <aside class="hidden lg:block w-56 shrink-0">
          <div class="card p-5 sticky top-24">
            <h2 class="font-semibold mb-4">Filtrer</h2>

            <div class="mb-4">
              <p class="text-xs font-medium text-gray-500 uppercase mb-2">Catégorie</p>
              <div class="space-y-1">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="cat" value=""
                         [checked]="selectedCategory() === ''"
                         (change)="selectedCategory.set(''); page.set(1)" />
                  Toutes
                </label>
                @for (cat of categories(); track cat.id_categorie) {
                  <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="cat" [value]="cat.nom"
                           [checked]="selectedCategory() === cat.nom"
                           (change)="selectedCategory.set(cat.nom); page.set(1)" />
                    {{ cat.nom | titlecase }}
                  </label>
                }
              </div>
            </div>

            <div class="mb-4">
              <p class="text-xs font-medium text-gray-500 uppercase mb-2">Prix max : {{ maxPrice() }} €</p>
              <input type="range" min="0" max="200" step="5"
                     [ngModel]="maxPrice()"
                     (ngModelChange)="maxPrice.set($event); page.set(1)"
                     class="w-full" />
            </div>

            <button (click)="resetFilters()" class="text-xs text-amber-600 hover:underline">Réinitialiser</button>
          </div>
        </aside>

        <!-- Main -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
            <!-- Search -->
            <div class="relative flex-1 min-w-[200px] max-w-sm">
              <input type="text" placeholder="Rechercher..."
                     [ngModel]="search()"
                     (ngModelChange)="search.set($event); page.set(1)"
                     class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            </div>
            <div class="flex items-center gap-2">
              <select [ngModel]="sortBy()" (ngModelChange)="sortBy.set($event)"
                      class="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="default">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="newest">Nouveautés</option>
              </select>
              <span class="text-sm text-gray-500">{{ filtered().length }} produits</span>
            </div>
          </div>

          <app-ai-assistant
            title="Conseiller IA du catalogue"
            subtitle="Demandez un résumé, un conseil ou un comparatif sur les produits du moment."
            class="block mb-8"
          />

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
  all               = signal<Produit[]>([]);
  categories        = signal<Categorie[]>([]);
  loading           = signal(true);
  page              = signal(1);
  search            = signal('');
  selectedCategory  = signal('');
  maxPrice          = signal(200);
  sortBy            = signal('default');
  showMobileFilters = signal(false);
  readonly PER_PAGE = 9;

  filtered = computed(() => {
    const q    = this.search().toLowerCase();
    const cat  = this.slugify(this.selectedCategory());
    const max  = this.maxPrice();
    const sort = this.sortBy();

    let result = this.all().filter(p => p.actif);
    if (q)   result = result.filter(p => p.nom.toLowerCase().includes(q));
    if (cat) result = result.filter(p => ((p as any).categorie ?? '') === cat);
    result = result.filter(p => p.prix_ht <= max);

    if (sort === 'price-asc')  return [...result].sort((a, b) => a.prix_ht - b.prix_ht);
    if (sort === 'price-desc') return [...result].sort((a, b) => b.prix_ht - a.prix_ht);
    if (sort === 'newest')     return [...result].sort((a, b) => (b.date_creation ?? '').localeCompare(a.date_creation ?? ''));
    return result;
  });

  activeFilterCount = computed(() => {
    let count = 0;
    if (this.selectedCategory() !== '') count++;
    if (this.maxPrice() < 200) count++;
    if (this.search() !== '') count++;
    return count;
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.PER_PAGE)));
  paginated  = computed(() => this.filtered().slice((this.page() - 1) * this.PER_PAGE, this.page() * this.PER_PAGE));
  pageRange  = computed(() => Array.from({ length: Math.min(this.totalPages(), 5) }, (_, i) => i + 1));

  constructor(
    private productSvc: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      if (p['category']) this.selectedCategory.set(p['category']);
    });

    this.productSvc.getCategories().subscribe(cats => this.categories.set(cats));
    this.productSvc.getAll().subscribe(ps => { this.all.set(ps); this.loading.set(false); });
  }

  slugify(s: string): string {
    return s.toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  resetFilters() {
    this.search.set('');
    this.selectedCategory.set('');
    this.maxPrice.set(200);
    this.sortBy.set('default');
    this.page.set(1);
  }
}
