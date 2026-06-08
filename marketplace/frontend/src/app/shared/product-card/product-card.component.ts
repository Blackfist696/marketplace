import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produit } from '../../core/models/models';
import { getProductImageSrc } from '../../core/utils/image-path';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <a [routerLink]="['/produit', produit.id_produit]" class="block aspect-square bg-gray-100 overflow-hidden">
        <img *ngIf="produit.image_principale; else placeholder"
             [src]="getProductImageSrc(produit.image_principale)" [alt]="produit.nom"
             class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        <ng-template #placeholder>
          <div class="w-full h-full flex items-center justify-center text-gray-300">
            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"/>
            </svg>
          </div>
        </ng-template>
      </a>
      <div class="p-4 flex flex-col flex-1">
        <p class="text-xs text-gray-500 mb-1">{{ produit.id_artisan }}</p>
        <a [routerLink]="['/produit', produit.id_produit]"
           class="font-medium text-sm leading-snug mb-2 hover:text-amber-600 line-clamp-2">
          {{ produit.nom }}
        </a>
        <div class="mt-auto flex items-center justify-between">
          <span class="font-bold text-amber-600">{{ produit.prix_ht | number:'1.2-2' }} €</span>
          <button (click)="addToCart()"
                  class="text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg transition-colors">
            + Panier
          </button>
        </div>
        <div *ngIf="produit.stock === 0" class="mt-2">
          <span class="text-xs text-red-600 font-medium">Rupture de stock</span>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() produit!: Produit;
  readonly getProductImageSrc = getProductImageSrc;

  constructor(private cart: CartService, private toast: ToastService) {}

  addToCart() {
    if (this.produit.stock === 0) return;
    this.cart.add(this.produit.id_produit, 1).subscribe({
      next: () => this.toast.success(`${this.produit.nom} ajouté au panier`),
      error: () => this.toast.error('Erreur lors de l\'ajout au panier'),
    });
  }
}
