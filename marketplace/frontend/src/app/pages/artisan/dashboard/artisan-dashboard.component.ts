import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { OrderService } from '../../../core/services/order.service';
import { ArtisanService } from '../../../core/services/artisan.service';
import { KpiCardComponent } from '../../../shared/kpi-card/kpi-card.component';
import { Produit, Commande, ArtisanStats, STATUT_LABELS } from '../../../core/models/models';

@Component({
  selector: 'app-artisan-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, KpiCardComponent],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Tableau de bord</h1>

      <!-- KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <app-kpi-card title="Commandes" [value]="orders().length" />
        <app-kpi-card title="Produits actifs" [value]="activeCount() + '/' + produits().length" />
        <app-kpi-card title="Stock total" [value]="totalStock()" />
        <app-kpi-card title="CA estimé" [value]="caEstime() + ' €'" trend="up" trendValue="+15%" />
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Dernières commandes -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold">Dernières commandes</h2>
            <a routerLink="/artisan/commandes" class="text-sm text-amber-600 hover:underline">Voir tout</a>
          </div>
          <div class="space-y-3">
            @for (o of orders().slice(0,4); track o.id_commande) {
              <div class="flex items-center justify-between text-sm py-2 border-b last:border-0">
                <div>
                  <p class="font-mono text-xs font-medium">{{ o.reference }}</p>
                  <p class="text-gray-500 text-xs">{{ o.date_commande | date:'dd/MM/yyyy' }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ o.total_ttc | number:'1.2-2' }} €</span>
                  <span class="text-xs px-2 py-0.5 rounded-full" [class]="'badge-' + o.statut">{{ statutLabel(o.statut) }}</span>
                </div>
              </div>
            }
            @if (orders().length === 0) { <p class="text-gray-500 text-sm">Aucune commande</p> }
          </div>
        </div>

        <!-- Top produits -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Mes produits (top stock)</h2>
          <div class="space-y-3">
            @for (p of topProduits(); track p.id_produit) {
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center text-gray-300">
                  @if (p.image_principale) { <img [src]="p.image_principale" [alt]="p.nom" class="w-full h-full object-cover" /> }
                  @else { 📦 }
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ p.nom }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-amber-500 rounded-full" [style.width.%]="stockPercent(p)"></div>
                    </div>
                    <span class="text-xs text-gray-500 shrink-0">{{ p.stock }} en stock</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ArtisanDashboardComponent implements OnInit {
  produits = signal<Produit[]>([]);
  orders   = signal<Commande[]>([]);

  activeCount = signal(0);
  totalStock  = signal(0);
  caEstime    = signal('0.00');
  topProduits = signal<Produit[]>([]);

  constructor(
    private productSvc: ProductService,
    private orderSvc: OrderService,
  ) {}

  ngOnInit() {
    this.productSvc.getMyProducts().subscribe(ps => {
      this.produits.set(ps);
      this.activeCount.set(ps.filter(p => p.actif).length);
      this.totalStock.set(ps.reduce((s,p) => s + p.stock, 0));
      this.topProduits.set([...ps].sort((a,b) => b.stock - a.stock).slice(0,4));
    });
    this.orderSvc.getMyOrders().subscribe(os => {
      this.orders.set(os);
      const ca = os.reduce((s,o) => s + o.total_ttc, 0);
      this.caEstime.set(ca.toFixed(2));
    });
  }

  statutLabel(s: string) { return (STATUT_LABELS as any)[s] ?? s; }

  stockPercent(p: Produit) {
    const max = Math.max(...this.produits().map(x => x.stock), 1);
    return Math.round((p.stock / max) * 100);
  }
}
