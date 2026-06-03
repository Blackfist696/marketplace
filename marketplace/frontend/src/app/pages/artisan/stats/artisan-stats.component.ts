import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { OrderService } from '../../../core/services/order.service';
import { KpiCardComponent } from '../../../shared/kpi-card/kpi-card.component';
import { Produit, Commande, STATUT_LABELS } from '../../../core/models/models';

@Component({
  selector: 'app-artisan-stats',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Mes statistiques</h1>

      <!-- KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <app-kpi-card title="CA Total" [value]="totalRevenue() + ' €'" trend="up" trendValue="+15%" />
        <app-kpi-card title="Commandes" [value]="orders().length" />
        <app-kpi-card title="Panier moyen" [value]="avgBasket() + ' €'" />
        <app-kpi-card title="Produits" [value]="produits().length" />
      </div>

      <div class="grid lg:grid-cols-2 gap-6 mb-8">
        <!-- Top produits -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Top produits (stock)</h2>
          <div class="space-y-3">
            @for (p of topProduits(); track p.id_produit; let i = $index) {
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold text-gray-400 w-5">{{ i+1 }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ p.nom }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-amber-500 rounded-full" [style.width.%]="stockPct(p)"></div>
                    </div>
                    <span class="text-xs text-gray-500">{{ p.stock }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Répartition statuts -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Répartition des commandes</h2>
          <div class="space-y-2">
            @for (s of statutStats(); track s.statut) {
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">{{ s.label }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-amber-500 rounded-full" [style.width.%]="s.pct"></div>
                  </div>
                  <span class="text-xs text-gray-500 w-4">{{ s.count }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Historique commandes -->
      <div class="card p-6">
        <h2 class="font-semibold mb-4">Historique des ventes</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left pb-3 font-medium text-gray-500">Date</th>
                <th class="text-left pb-3 font-medium text-gray-500">Référence</th>
                <th class="text-left pb-3 font-medium text-gray-500">Montant</th>
                <th class="text-left pb-3 font-medium text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              @for (o of orders().slice(0,10); track o.id_commande) {
                <tr class="border-b last:border-0">
                  <td class="py-3 text-gray-500">{{ o.date_commande | date:'dd/MM/yyyy' }}</td>
                  <td class="py-3 font-mono text-xs">{{ o.reference }}</td>
                  <td class="py-3 font-medium">{{ o.total_ttc | number:'1.2-2' }} €</td>
                  <td class="py-3"><span class="text-xs px-2 py-0.5 rounded-full" [class]="'badge-' + o.statut">{{ statutLabel(o.statut) }}</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ArtisanStatsComponent implements OnInit {
  produits = signal<Produit[]>([]);
  orders   = signal<Commande[]>([]);
  topProduits  = signal<Produit[]>([]);
  totalRevenue = signal('0.00');
  avgBasket    = signal('0.00');
  statutStats  = signal<{statut:string;label:string;count:number;pct:number}[]>([]);

  constructor(private productSvc: ProductService, private orderSvc: OrderService) {}

  ngOnInit() {
    this.productSvc.getMyProducts().subscribe(ps => {
      this.produits.set(ps);
      this.topProduits.set([...ps].sort((a,b) => b.stock - a.stock).slice(0,5));
    });
    this.orderSvc.getArtisanOrders().subscribe(os => {
      this.orders.set(os);
      const total = os.reduce((s,o) => s + o.total_ttc, 0);
      this.totalRevenue.set(total.toFixed(2));
      this.avgBasket.set(os.length ? (total/os.length).toFixed(2) : '0.00');
      const counts: Record<string,number> = {};
      os.forEach(o => { counts[o.statut] = (counts[o.statut] ?? 0) + 1; });
      this.statutStats.set(Object.entries(STATUT_LABELS).map(([statut, label]) => ({
        statut, label, count: counts[statut] ?? 0,
        pct: os.length ? Math.round(((counts[statut] ?? 0) / os.length) * 100) : 0,
      })));
    });
  }

  stockPct(p: Produit) {
    const max = Math.max(...this.produits().map(x => x.stock), 1);
    return Math.round((p.stock / max) * 100);
  }

  statutLabel(s: string) { return (STATUT_LABELS as any)[s] ?? s; }
}
