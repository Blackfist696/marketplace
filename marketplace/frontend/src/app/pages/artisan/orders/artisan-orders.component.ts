import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { ToastService } from '../../../core/services/toast.service';
import { Commande, StatutCommande, STATUT_LABELS } from '../../../core/models/models';

@Component({
  selector: 'app-artisan-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Commandes</h1>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="w-8 p-4"></th>
                <th class="text-left p-4 font-medium text-gray-500">Référence</th>
                <th class="text-left p-4 font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th class="text-left p-4 font-medium text-gray-500">Total TTC</th>
                <th class="text-left p-4 font-medium text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="5" class="p-8 text-center text-gray-500">Chargement…</td></tr>
              }
              @for (o of orders(); track o.id_commande) {
                <tr class="border-t hover:bg-gray-50 cursor-pointer" (click)="toggleDetail(o)">
                  <td class="p-4 text-gray-400 text-xs select-none">
                    {{ expandedId() === o.id_commande ? '▼' : '▶' }}
                  </td>
                  <td class="p-4 font-mono text-xs font-medium">{{ o.reference }}</td>
                  <td class="p-4 text-gray-500 hidden md:table-cell">{{ o.date_commande | date:'dd/MM/yyyy' }}</td>
                  <td class="p-4 font-medium">{{ o.total_ttc | number:'1.2-2' }} €</td>
                  <td class="p-4" (click)="$event.stopPropagation()">
                    <select [(ngModel)]="o.statut" (ngModelChange)="updateStatut(o, $event)"
                            class="border rounded-lg px-2 py-1 text-xs">
                      @for (s of statutOptions; track s.value) {
                        <option [value]="s.value">{{ s.label }}</option>
                      }
                    </select>
                  </td>
                </tr>

                @if (expandedId() === o.id_commande) {
                  <tr class="bg-amber-50 border-t border-amber-100">
                    <td colspan="5" class="px-6 py-4">
                      @if (detailLoading()) {
                        <p class="text-sm text-gray-500">Chargement des lignes…</p>
                      } @else if (detail().length === 0) {
                        <p class="text-sm text-gray-500">Aucune ligne trouvée.</p>
                      } @else {
                        <table class="w-full text-sm">
                          <thead>
                            <tr class="text-xs text-gray-500 uppercase tracking-wide">
                              <th class="text-left pb-2">Produit</th>
                              <th class="text-right pb-2">Qté</th>
                              <th class="text-right pb-2">Prix unit. HT</th>
                              <th class="text-right pb-2">Total HT</th>
                            </tr>
                          </thead>
                          <tbody>
                            @for (l of detail(); track l.id_ligne_commande) {
                              <tr class="border-t border-amber-100">
                                <td class="py-2 font-medium">{{ l.nom_produit }}</td>
                                <td class="py-2 text-right">{{ l.quantite }}</td>
                                <td class="py-2 text-right text-gray-600">{{ l.prix_unitaire_ht | number:'1.2-2' }} €</td>
                                <td class="py-2 text-right font-semibold text-amber-700">
                                  {{ (l.prix_unitaire_ht * l.quantite) | number:'1.2-2' }} €
                                </td>
                              </tr>
                            }
                          </tbody>
                        </table>
                      }
                    </td>
                  </tr>
                }
              }
              @if (!loading() && orders().length === 0) {
                <tr><td colspan="5" class="p-12 text-center text-gray-500">Aucune commande</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ArtisanOrdersComponent implements OnInit {
  orders        = signal<Commande[]>([]);
  loading       = signal(true);
  expandedId    = signal<number | null>(null);
  detail        = signal<any[]>([]);
  detailLoading = signal(false);

  statutOptions = Object.entries(STATUT_LABELS).map(([value, label]) => ({ value: value as StatutCommande, label }));

  constructor(private orderSvc: OrderService, private toast: ToastService) {}

  ngOnInit() {
    this.orderSvc.getArtisanOrders().subscribe(os => { this.orders.set(os); this.loading.set(false); });
  }

  toggleDetail(order: Commande) {
    if (this.expandedId() === order.id_commande) {
      this.expandedId.set(null);
      return;
    }
    this.expandedId.set(order.id_commande);
    this.detail.set([]);
    this.detailLoading.set(true);
    this.orderSvc.getArtisanOrderDetail(order.id_commande).subscribe({
      next: res => { this.detail.set(res?.lignes ?? []); this.detailLoading.set(false); },
      error: () => { this.toast.error('Impossible de charger les détails'); this.detailLoading.set(false); },
    });
  }

  updateStatut(order: Commande, statut: StatutCommande) {
    this.orderSvc.updateAdminOrderStatus(order.id_commande, statut).subscribe({
      next: () => this.toast.success('Statut mis à jour'),
      error: () => this.toast.error('Erreur'),
    });
  }
}
