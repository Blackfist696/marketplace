import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { ToastService } from '../../../core/services/toast.service';
import { Commande, StatutCommande, STATUT_LABELS, STATUT_NEXT } from '../../../core/models/models';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des Commandes</h1>

      <!-- Stats rapides -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        @for (s of statutKeys; track s) {
          <button (click)="filterStatus = filterStatus===s ? 'all' : s"
                  class="rounded-xl border p-3 text-center transition-all"
                  [class]="filterStatus===s ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'">
            <div class="text-lg font-bold">{{ countByStatut(s) }}</div>
            <div class="text-xs text-gray-500">{{ statutLabel(s) }}</div>
          </button>
        }
      </div>

      <!-- Recherche -->
      <div class="relative mb-4">
        <input [(ngModel)]="search" placeholder="Rechercher par référence…" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Référence</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Total TTC</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Chargement…</td></tr>
              }
              @for (o of filtered; track o.id_commande) {
                <tr class="border-t hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 font-mono text-xs font-medium">{{ o.reference }}</td>
                  <td class="px-4 py-3 text-gray-500 hidden md:table-cell">{{ o.date_commande | date:'dd/MM/yyyy' }}</td>
                  <td class="px-4 py-3 font-semibold">{{ o.total_ttc | number:'1.2-2' }} €</td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-1 rounded-full" [class]="'badge-' + o.statut">
                      {{ statutLabel(o.statut) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    @if (nextStatut(o.statut)) {
                      <button (click)="advance(o)" class="text-xs border rounded-lg px-2 py-1 hover:bg-gray-50 mr-1">
                        → {{ statutLabel(nextStatut(o.statut)!) }}
                      </button>
                    }
                    @if (o.statut !== 'annulee' && o.statut !== 'livree') {
                      <button (click)="cancel(o)" class="text-xs text-red-500 hover:text-red-700 px-1">Annuler</button>
                    }
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Aucune commande</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AdminOrdersComponent implements OnInit {
  orders      = signal<Commande[]>([]);
  loading     = signal(true);
  search      = '';
  filterStatus: string = 'all';
  statutKeys  = Object.keys(STATUT_LABELS) as StatutCommande[];

  get filtered(): Commande[] {
    return this.orders().filter(o => {
      const ms = !this.search || o.reference.toLowerCase().includes(this.search.toLowerCase());
      const fs = this.filterStatus === 'all' || o.statut === this.filterStatus;
      return ms && fs;
    });
  }

  constructor(private orderSvc: OrderService, private toast: ToastService) {}

  ngOnInit() {
    this.orderSvc.getAdminOrders().subscribe(os => { this.orders.set(os); this.loading.set(false); });
  }

  countByStatut(s: StatutCommande) { return this.orders().filter(o => o.statut === s).length; }
  statutLabel(s: string) { return (STATUT_LABELS as any)[s] ?? s; }
  nextStatut(s: StatutCommande): StatutCommande | undefined { return STATUT_NEXT[s]; }

  advance(o: Commande) {
    const next = this.nextStatut(o.statut);
    if (!next) return;
    this.orderSvc.updateAdminOrderStatus(o.id_commande, next).subscribe({
      next: () => { this.ngOnInit(); this.toast.success('Statut avancé'); },
      error: () => this.toast.error('Erreur'),
    });
  }

  cancel(o: Commande) {
    this.orderSvc.updateAdminOrderStatus(o.id_commande, 'annulee').subscribe({
      next: () => { this.ngOnInit(); this.toast.success('Commande annulée'); },
      error: () => this.toast.error('Erreur'),
    });
  }
}
