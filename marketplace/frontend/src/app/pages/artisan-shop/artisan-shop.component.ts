import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../../core/services/artisan.service';
import { ProductService } from '../../core/services/product.service';
import { AvisService } from '../../core/services/avis.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Artisan, Produit, Avis } from '../../core/models/models';

@Component({
  selector: 'app-artisan-shop',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    @if (loading()) {
      <div class="flex justify-center py-20"><div class="spinner"></div></div>
    } @else if (!artisan()) {
      <div class="text-center py-20 text-gray-500">Artisan non trouvé</div>
    } @else {
      <!-- Bannière -->
      <div class="h-44 md:h-56 bg-gradient-to-br from-amber-100 to-yellow-200 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Infos artisan -->
        <div class="relative -mt-12 mb-8">
          <div class="flex items-end gap-4">
            <div class="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden shrink-0 flex items-center justify-center font-serif text-3xl text-amber-600">
              @if (artisan()!.logo) {
                <img [src]="artisan()!.logo" [alt]="artisan()!.nom_boutique" class="w-full h-full object-cover" />
              } @else {
                {{ artisan()!.nom_boutique[0] }}
              }
            </div>
            <div class="pb-1">
              <h1 class="font-serif text-2xl md:text-3xl font-bold">{{ artisan()!.nom_boutique }}</h1>
              <p class="text-gray-500 text-sm">{{ artisan()!.description?.slice(0,80) }}</p>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-4 mb-8 text-sm text-gray-500">
          <span>📦 {{ produits().length }} produits</span>
          @if (artisan()!.date_validation) {
            <span>📅 Membre depuis {{ artisan()!.date_validation | date:'yyyy' }}</span>
          }
        </div>

        <!-- Description -->
        @if (artisan()!.description) {
          <div class="mb-10 max-w-2xl">
            <h2 class="font-serif text-xl font-bold mb-3">Notre histoire</h2>
            <p class="text-gray-600 leading-relaxed">{{ artisan()!.description }}</p>
          </div>
        }

        <!-- Filtres catégories -->
        @if (categories().length > 0) {
          <div class="flex flex-wrap gap-2 mb-8">
            <button (click)="activeFilter.set('')"
                    [class]="activeFilter()==='' ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-4 py-1.5 rounded-full text-sm transition-colors">Tous</button>
            @for (cat of categories(); track cat) {
              <button (click)="activeFilter.set(cat)"
                      [class]="activeFilter()===cat ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                      class="px-4 py-1.5 rounded-full text-sm capitalize transition-colors">{{ cat }}</button>
            }
          </div>
        }

        <!-- Produits -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          @for (p of filteredProduits(); track p.id_produit) {
            <app-product-card [produit]="p" />
          }
        </div>

        <!-- Avis -->
        @if (avis().length > 0) {
          <section class="mb-16">
            <h2 class="font-serif text-xl font-bold mb-6">Ce que disent nos clients</h2>
            <div class="grid md:grid-cols-3 gap-4">
              @for (a of avis().slice(0,3); track a.id_avis) {
                <div class="card p-5">
                  <div class="flex gap-0.5 mb-2">
                    @for (i of [1,2,3,4,5]; track i) {
                      <span [class]="i<=a.note ? 'text-amber-500' : 'text-gray-200'">★</span>
                    }
                  </div>
                  <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ a.commentaire }}</p>
                </div>
              }
            </div>
          </section>
        }
      </div>
    }
  `,
})
export class ArtisanShopComponent implements OnInit {
  artisan  = signal<Artisan | null>(null);
  produits = signal<Produit[]>([]);
  avis     = signal<Avis[]>([]);
  loading  = signal(true);
  activeFilter = signal('');

  categories       = signal<string[]>([]);
  filteredProduits = computed(() => {
    const f = this.activeFilter();
    return f ? this.produits().filter(p => (p as any).categorie === f) : this.produits();
  });

  constructor(
    private route: ActivatedRoute,
    private artisanSvc: ArtisanService,
    private productSvc: ProductService,
    private avisSvc: AvisService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      const id = +p['id'];
      this.artisanSvc.getById(id).subscribe({
        next: a => { this.artisan.set(a); this.loading.set(false); },
        error: () => this.loading.set(false),
      });
      this.productSvc.getByArtisan(id).subscribe(ps => {
        const active = ps.filter(p => p.actif);
        this.produits.set(active);
        const cats = [...new Set(active.map(p => (p as any).categorie).filter(Boolean))];
        this.categories.set(cats);
      });
    });
  }
}
