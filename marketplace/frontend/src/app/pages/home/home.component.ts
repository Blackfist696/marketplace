import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ArtisanService } from '../../core/services/artisan.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Produit, Artisan, CATEGORY_LABELS } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <!-- Hero -->
    <section class="bg-gradient-to-br from-amber-50 to-yellow-100 py-20 px-4 text-center">
      <h1 class="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        L'artisanat belge <span class="text-amber-600">à portée de clic</span>
      </h1>
      <p class="text-gray-600 max-w-xl mx-auto mb-8">
        Découvrez des produits faits à la main par des artisans locaux passionnés.
      </p>
      <a routerLink="/catalogue"
         class="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
        Explorer le catalogue
      </a>
    </section>

    <!-- Catégories -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="font-serif text-2xl font-bold mb-6">Nos catégories</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        @for (cat of categories; track cat.key) {
          <a [routerLink]="['/catalogue']" [queryParams]="{category: cat.label}"
             class="card p-5 text-center hover:border-amber-400 hover:shadow transition-all cursor-pointer">
            <p class="text-2xl mb-2">{{ cat.emoji }}</p>
            <p class="font-medium text-sm">{{ cat.label }}</p>
          </a>
        }
      </div>
    </section>

    <!-- Produits en vedette -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="font-serif text-2xl font-bold mb-6">Produits mis en avant</h2>
      @if (loading()) {
        <div class="flex justify-center py-12"><div class="spinner"></div></div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (p of featured(); track p.id_produit) {
            <app-product-card [produit]="p" />
          }
        </div>
        <div class="text-center mt-8">
          <a routerLink="/catalogue" class="text-amber-600 hover:underline font-medium">Voir tous les produits →</a>
        </div>
      }
    </section>

    <!-- Artisans -->
    <section class="bg-amber-50 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="font-serif text-2xl font-bold mb-6">Nos artisans</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (a of artisans(); track a.id_artisan) {
            <a [routerLink]="['/boutique', a.id_artisan]" class="card p-5 flex items-center gap-4 hover:shadow transition-shadow">
              <div class="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center font-serif text-2xl shrink-0">
                {{ a.nom_boutique[0] }}
              </div>
              <div>
                <p class="font-medium">{{ a.nom_boutique }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ a.description?.slice(0,60) }}{{ a.description && a.description.length > 60 ? '…' : '' }}</p>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Confiance -->
    <section class="max-w-7xl mx-auto px-4 py-16 grid sm:grid-cols-3 gap-8 text-center">
      <div><p class="text-3xl mb-2">🌿</p><p class="font-semibold">100% naturel</p><p class="text-sm text-gray-500 mt-1">Produits issus de l'agriculture locale</p></div>
      <div><p class="text-3xl mb-2">🚚</p><p class="font-semibold">Livraison rapide</p><p class="text-sm text-gray-500 mt-1">Expédié sous 3-5 jours ouvrés</p></div>
      <div><p class="text-3xl mb-2">🤝</p><p class="font-semibold">Soutien local</p><p class="text-sm text-gray-500 mt-1">Chaque achat soutient un artisan belge</p></div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  featured = signal<Produit[]>([]);
  artisans  = signal<Artisan[]>([]);
  loading   = signal(true);

  categories = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
    key, label,
    emoji: ({ miels:'🍯', savons:'🧼', confiseries:'🍬', cosmetiques:'💄', bougies:'🕯️', pollen:'🌼', propolis:'🫙', coffrets:'🎁' } as any)[key] ?? '🛍️',
  }));

  constructor(
    private productSvc: ProductService,
    private artisanSvc: ArtisanService,
  ) {}

  ngOnInit() {
    this.productSvc.getAll().subscribe(products => {
      this.featured.set(products.filter(p => p.mis_en_avant && p.actif).slice(0, 6));
      this.loading.set(false);
    });
    this.artisanSvc.getAll().subscribe(a => this.artisans.set(a.slice(0, 6)));
  }
}
