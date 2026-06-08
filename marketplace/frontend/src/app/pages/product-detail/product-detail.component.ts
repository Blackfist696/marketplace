import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { AvisService } from '../../core/services/avis.service';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { getProductImageSrc } from '../../core/utils/image-path';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Produit, Avis } from '../../core/models/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a routerLink="/home" class="hover:text-gray-900">Accueil</a><span>›</span>
        <a routerLink="/catalogue" class="hover:text-gray-900">Catalogue</a><span>›</span>
        <span class="text-gray-900 font-medium truncate">{{ produit()?.nom }}</span>
      </nav>

      @if (loading()) {
        <div class="flex justify-center py-20"><div class="spinner"></div></div>
      } @else if (!produit()) {
        <div class="text-center py-20 text-gray-500">Produit non trouvé</div>
      } @else {
        <div class="grid md:grid-cols-2 gap-10 mb-16">
          <!-- Image -->
          <div>
            <div class="aspect-square rounded-2xl bg-gray-100 overflow-hidden mb-4">
              @if (produit()!.image_principale) {
                <img [src]="getProductImageSrc(produit()!.image_principale)" [alt]="produit()!.nom" class="w-full h-full object-cover" />
              } @else {
                <div class="w-full h-full flex items-center justify-center text-gray-300 text-8xl">📦</div>
              }
            </div>
          </div>

          <!-- Infos -->
          <div>
            <a [routerLink]="['/boutique', produit()!.id_artisan]" class="text-sm text-amber-600 hover:underline mb-2 block">
              Voir la boutique de l'artisan →
            </a>
            <h1 class="font-serif text-3xl font-bold mb-3">{{ produit()!.nom }}</h1>
            <p class="text-3xl font-bold text-amber-600 mb-4">{{ produit()!.prix_ht | number:'1.2-2' }} € HT</p>
            @if (produit()!.poids) {
              <p class="text-sm text-gray-500 mb-4">Poids : {{ produit()!.poids }}</p>
            }

            <!-- Quantité -->
            <div class="flex items-center gap-3 mb-6">
              <span class="text-sm text-gray-500">Quantité :</span>
              <div class="flex items-center border rounded-lg overflow-hidden">
                <button (click)="qty = qty > 1 ? qty-1 : 1" class="px-3 py-2 hover:bg-gray-50">−</button>
                <span class="px-4 font-medium">{{ qty }}</span>
                <button (click)="qty = qty+1" class="px-3 py-2 hover:bg-gray-50">+</button>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <button (click)="addToCart()" [disabled]="produit()!.stock === 0"
                      class="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition-colors">
                🛒 Ajouter au panier
              </button>
            </div>

            @if (produit()!.stock > 0) {
              <span class="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">✓ En stock ({{ produit()!.stock }} disponibles)</span>
            } @else {
              <span class="text-sm text-red-700 bg-red-50 px-3 py-1 rounded-full">Rupture de stock</span>
            }
          </div>
        </div>

        <!-- Tabs -->
        <div class="mb-16">
          <div class="flex gap-2 border-b mb-6">
            @for (tab of tabs; track tab.id) {
              <button (click)="activeTab = tab.id"
                      [class]="activeTab===tab.id ? 'border-b-2 border-amber-500 text-amber-600 font-medium' : 'text-gray-500'"
                      class="px-4 py-2 text-sm transition-colors">{{ tab.label }}</button>
            }
          </div>

          @if (activeTab === 'description') {
            <p class="text-gray-600 leading-relaxed max-w-2xl">{{ produit()!.description || 'Aucune description.' }}</p>
          }
          @if (activeTab === 'livraison') {
            <p class="text-gray-600 max-w-2xl">Livraison sous 3-5 jours ouvrés. Frais de port : 4,95 € (gratuit dès 50 €).</p>
          }
          @if (activeTab === 'avis') {
            <div class="space-y-4 max-w-2xl">
              @if (avis().length === 0) {
                <p class="text-gray-500">Aucun avis pour le moment.</p>
              }
              @for (a of avis(); track a.id_avis) {
                <div class="card p-4">
                  <div class="flex gap-0.5 mb-2">
                    @for (i of [1,2,3,4,5]; track i) {
                      <span [class]="i <= a.note ? 'text-amber-500' : 'text-gray-200'">★</span>
                    }
                  </div>
                  <p class="text-sm text-gray-600">{{ a.commentaire }}</p>
                </div>
              }
            </div>
          }
        </div>

        <!-- Similaires -->
        @if (similar().length > 0) {
          <section>
            <h2 class="font-serif text-2xl font-bold mb-6">Vous aimerez aussi</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (p of similar(); track p.id_produit) {
                <app-product-card [produit]="p" />
              }
            </div>
          </section>
        }
      }
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  produit = signal<Produit | null>(null);
  avis    = signal<Avis[]>([]);
  similar = signal<Produit[]>([]);
  loading = signal(true);
  qty     = 1;
  readonly getProductImageSrc = getProductImageSrc;
  activeTab = 'description';
  tabs = [
    { id: 'description', label: 'Description' },
    { id: 'livraison',   label: 'Livraison' },
    { id: 'avis',        label: 'Avis' },
  ];

  constructor(
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private avisSvc: AvisService,
    private cart: CartService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      const id = +p['id'];
      this.productSvc.getById(id).subscribe({
        next: prod => {
          this.produit.set(prod);
          this.loading.set(false);
          this.avisSvc.getByProduit(id).subscribe(a => this.avis.set(a.filter(x => x.statut === 'approved')));
          this.productSvc.getAll().subscribe(all =>
            this.similar.set(all.filter(x => x.actif && x.id_produit !== id).slice(0, 3))
          );
        },
        error: () => this.loading.set(false),
      });
    });
  }

  addToCart() {
    const p = this.produit();
    if (!p) return;
    this.cart.add(p.id_produit, this.qty).subscribe({
      next: () => this.toast.success(`${this.qty}× ${p.nom} ajouté au panier`),
      error: () => this.toast.error('Erreur ajout panier'),
    });
  }
}
