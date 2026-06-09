import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';
import { Commande, Utilisateur } from '../../../core/models/models';

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des Clients</h1>

      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative flex-1 min-w-[220px]">
          <input [(ngModel)]="search" placeholder="Rechercher un client…" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div class="flex gap-2 flex-wrap">
          @for (f of ['all','active','inactive']; track f) {
            <button (click)="filterStatus=f"
                    [class]="filterStatus===f ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-3 py-1.5 rounded-full text-sm">
              {{ f==='all' ? 'Tous' : f==='active' ? 'Actifs' : 'Inactifs' }}
            </button>
          }
        </div>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Client</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Email</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Téléphone</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Chargement…</td></tr>
              }
              @for (c of filtered; track c.id_utilisateur) {
                <tr class="border-t hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3">
                    <div class="font-medium">{{ c.prenom }} {{ c.nom }}</div>
                    <div class="text-xs text-gray-500">Inscrit le {{ c.date_inscription ? (c.date_inscription | date:'dd/MM/yyyy') : '—' }}</div>
                  </td>
                  <td class="px-4 py-3 text-gray-500 hidden md:table-cell">{{ c.email }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ c.telephone || '—' }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-1 rounded-full" [class]="c.actif ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                      {{ c.actif ? 'Actif' : 'Inactif' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="flex justify-end gap-2 flex-wrap">
                      <button (click)="openPanel(c, 'orders')" class="text-xs border border-amber-300 text-amber-600 hover:bg-amber-50 px-2 py-1 rounded-lg">🧾 Commandes</button>
                      <button (click)="openPanel(c, 'details')" class="text-xs border border-gray-300 text-gray-600 hover:bg-gray-50 px-2 py-1 rounded-lg">ℹ️ Détails</button>
                      @if (c.actif) {
                        <button (click)="toggleStatus(c, false)" class="text-xs border border-red-300 text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg">Désactiver</button>
                      } @else {
                        <button (click)="toggleStatus(c, true)" class="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg">Réactiver</button>
                      }
                    </div>
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Aucun client trouvé</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      @if (selectedClient) {
        <div class="mt-6 card p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold">{{ selectedTab() === 'orders' ? 'Commandes du client' : 'Informations client' }}</h2>
            <button (click)="closePanel()" class="text-sm text-gray-500 hover:text-gray-700">✕ Fermer</button>
          </div>

          @if (selectedTab() === 'orders') {
            @if (clientOrders.length === 0) {
              <p class="text-sm text-gray-500">Aucune commande pour ce client.</p>
            } @else {
              <div class="space-y-2">
                @for (order of clientOrders; track order.id_commande) {
                  <div class="border rounded-lg p-3 text-sm">
                    <div class="flex justify-between gap-4">
                      <span class="font-medium">{{ order.reference }}</span>
                      <span class="text-gray-500">{{ order.date_commande | date:'dd/MM/yyyy' }}</span>
                    </div>
                    <div class="text-gray-600 mt-1">Statut : {{ order.statut }}</div>
                    <div class="text-gray-600">Total TTC : {{ order.total_ttc }} €</div>
                  </div>
                }
              </div>
            }
          } @else {
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div class="border rounded-lg p-3">
                <div class="text-gray-500 mb-1">Nom</div>
                <div class="font-medium">{{ selectedClient!.prenom }} {{ selectedClient!.nom }}</div>
              </div>
              <div class="border rounded-lg p-3">
                <div class="text-gray-500 mb-1">Email</div>
                <div class="font-medium">{{ selectedClient!.email }}</div>
              </div>
              <div class="border rounded-lg p-3">
                <div class="text-gray-500 mb-1">Téléphone</div>
                <div class="font-medium">{{ selectedClient!.telephone || '—' }}</div>
              </div>
              <div class="border rounded-lg p-3">
                <div class="text-gray-500 mb-1">Date d’inscription</div>
                <div class="font-medium">{{ selectedClient!.date_inscription ? (selectedClient!.date_inscription | date:'dd/MM/yyyy') : '—' }}</div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class AdminClientsComponent implements OnInit {
  clients = signal<Utilisateur[]>([]);
  orders = signal<Commande[]>([]);
  loading = signal(true);
  search = '';
  filterStatus = 'all';
  selectedClientId = signal<number | null>(null);
  selectedTab = signal<'orders' | 'details' | null>(null);

  get filtered(): Utilisateur[] {
    return this.clients().filter(c => {
      const matchesSearch = !this.search || `${c.prenom} ${c.nom}`.toLowerCase().includes(this.search.toLowerCase()) || c.email.toLowerCase().includes(this.search.toLowerCase());
      const matchesStatus = this.filterStatus === 'all'
        || (this.filterStatus === 'active' ? !!c.actif : !c.actif);
      return matchesSearch && matchesStatus;
    });
  }

  get selectedClient(): Utilisateur | null {
    return this.clients().find(c => c.id_utilisateur === this.selectedClientId()) ?? null;
  }

  get clientOrders(): Commande[] {
    return this.orders().filter(o => o.id_utilisateur === this.selectedClientId());
  }

  constructor(private adminSvc: AdminService, private toast: ToastService) {}

  ngOnInit() {
    forkJoin({
      users: this.adminSvc.getUsers(),
      orders: this.adminSvc.getOrders(),
    }).subscribe(({ users, orders }) => {
      this.clients.set(users.filter(u => u.id_role === 3));
      this.orders.set(orders);
      this.loading.set(false);
    });
  }

  openPanel(client: Utilisateur, tab: 'orders' | 'details') {
    this.selectedClientId.set(client.id_utilisateur);
    this.selectedTab.set(tab);
  }

  closePanel() {
    this.selectedClientId.set(null);
    this.selectedTab.set(null);
  }

  toggleStatus(client: Utilisateur, active: boolean) {
    this.adminSvc.updateUser(client.id_utilisateur, { actif: active ? 1 : 0 }).subscribe({
      next: () => {
        this.ngOnInit();
        this.toast.success(active ? 'Client réactivé' : 'Client désactivé');
      },
      error: () => this.toast.error('Erreur lors de la mise à jour'),
    });
  }
}
