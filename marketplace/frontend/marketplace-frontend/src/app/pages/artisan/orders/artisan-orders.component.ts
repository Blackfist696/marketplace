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
                <th class="text-left p-4 font-medium text-gray-500">Référence</th>
                <th class="text-left p-4 font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th class="text-left p-4 font-medium text-gray-500">Total TTC</th>
                <th class="text-left p-4 font-medium text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="4" class="p-8 text-center text-gray-500">Chargement…</td></tr>
              }
              @for (o of orders(); track o.id_commande) {
                <tr class="border-t hover:bg-gray-50">
                  <td class="p-4 font-mono text-xs font-medium">{{ o.reference }}</td>
                  <td class="p-4 text-gray-500 hidden md:table-cell">{{ o.date_commande | date:'dd/MM/yyyy' }}</td>
                  <td class="p-4 font-medium">{{ o.total_ttc | number:'1.2-2' }} €</td>
                  <td class="p-4">
                    <select [(ngModel)]="o.statut" (ngModelChange)="updateStatut(o, $event)"
                            class="border rounded-lg px-2 py-1 text-xs">
                      @for (s of statutOptions; track s.value) {
                        <option [value]="s.value">{{ s.label }}</option>
                      }
                    </select>
                  </td>
                </tr>
              }
              @if (!loading() && orders().length === 0) {
                <tr><td colspan="4" class="p-12 text-center text-gray-500">Aucune commande</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ArtisanOrdersComponent implements OnInit {
  orders  = signal<Commande[]>([]);
  loading = signal(true);

  statutOptions = Object.entries(STATUT_LABELS).map(([value, label]) => ({ value: value as StatutCommande, label }));

  constructor(private orderSvc: OrderService, private toast: ToastService) {}

  ngOnInit() {
    this.orderSvc.getMyOrders().subscribe(os => { this.orders.set(os); this.loading.set(false); });
  }

  updateStatut(order: Commande, statut: StatutCommande) {
    this.orderSvc.adminUpdateStatut(order.id_commande, statut).subscribe({
      next: () => this.toast.success('Statut mis à jour'),
      error: () => this.toast.error('Erreur'),
    });
  }
}
