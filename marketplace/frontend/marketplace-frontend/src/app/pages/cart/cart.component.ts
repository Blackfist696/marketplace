import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      @if (cart.lines().length === 0) {
        <div class="text-center py-20">
          <div class="text-6xl mb-4">🛒</div>
          <h1 class="font-serif text-2xl font-bold mb-2">Votre panier est vide</h1>
          <p class="text-gray-500 mb-6">Explorez notre catalogue pour trouver votre bonheur</p>
          <a routerLink="/catalogue" class="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full inline-block">
            Découvrir nos produits
          </a>
        </div>
      } @else {
        <h1 class="font-serif text-3xl font-bold mb-8">Mon panier ({{ cart.count() }} articles)</h1>
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Articles -->
          <div class="lg:col-span-2 space-y-4">
            @for (line of cart.lines(); track line.id_produit) {
              <div class="card p-4 flex gap-4">
                <div class="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  @if (line.produit.image_principale) {
                    <img [src]="line.produit.image_principale" [alt]="line.produit.nom" class="w-full h-full object-cover" />
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium text-sm">{{ line.produit.nom }}</p>
                    </div>
                    <p class="font-bold ml-2 whitespace-nowrap">{{ (line.produit.prix_ht * line.quantite) | number:'1.2-2' }} €</p>
                  </div>
                  <div class="flex items-center justify-between mt-3">
                    <div class="flex items-center border rounded-lg overflow-hidden">
                      <button (click)="updateQty(line.id_produit, line.quantite-1)" class="px-3 py-1.5 hover:bg-gray-50 text-sm">−</button>
                      <span class="px-3 text-sm font-medium">{{ line.quantite }}</span>
                      <button (click)="updateQty(line.id_produit, line.quantite+1)" class="px-3 py-1.5 hover:bg-gray-50 text-sm">+</button>
                    </div>
                    <button (click)="remove(line.id_produit)" class="text-red-500 hover:text-red-700 text-sm">🗑 Supprimer</button>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Récap -->
          <div>
            <div class="card p-6 sticky top-24">
              <h2 class="font-semibold text-lg mb-4">Récapitulatif</h2>
              <div class="space-y-2 text-sm mb-4">
                <div class="flex justify-between"><span class="text-gray-500">Sous-total HT</span><span>{{ cart.total() | number:'1.2-2' }} €</span></div>
                <div class="flex justify-between"><span class="text-gray-500">TVA (21%)</span><span>{{ cart.total() * 0.21 | number:'1.2-2' }} €</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Livraison</span><span>{{ cart.total() > 50 ? 'Gratuite' : '4,95 €' }}</span></div>
                <hr />
                <div class="flex justify-between font-bold text-base">
                  <span>Total TTC</span>
                  <span>{{ total() | number:'1.2-2' }} €</span>
                </div>
              </div>
              <button (click)="checkout()" class="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-medium transition-colors">
                Passer commande
              </button>
              <a routerLink="/catalogue" class="block text-center mt-3 text-sm text-gray-500 hover:text-gray-700">
                ← Continuer mes achats
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class CartComponent implements OnInit {
  constructor(public cart: CartService, private auth: AuthService, private router: Router) {}

  ngOnInit() { this.cart.load().subscribe(); }

  updateQty(id: number, qty: number) { this.cart.updateQty(id, qty).subscribe(); }
  remove(id: number) { this.cart.remove(id).subscribe(); }

  total() {
    const sub = this.cart.total();
    const tva = sub * 0.21;
    const ship = sub > 50 ? 0 : (sub > 0 ? 4.95 : 0);
    return sub + tva + ship;
  }

  checkout() {
    if (!this.auth.isLoggedIn()) { this.router.navigate(['/login']); return; }
    this.router.navigate(['/commande']);
  }
}
