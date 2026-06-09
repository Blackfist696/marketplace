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
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 class="font-serif text-2xl font-bold">Gestion des Clients</h1>
        <button (click)="openCreate()" class="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm">+ Ajouter un client</button>
      </div>

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

      @if (showForm) {
        <div class="card p-5 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold">{{ editingId ? 'Modifier le client' : 'Ajouter un client' }}</h2>
            <button (click)="cancelForm()" class="text-sm text-gray-500 hover:text-gray-700">✕ Fermer</button>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Prénom</label>
              <input [(ngModel)]="form.prenom" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Nom</label>
              <input [(ngModel)]="form.nom" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input [(ngModel)]="form.email" type="email" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Téléphone</label>
              <input [(ngModel)]="form.telephone" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Mot de passe</label>
              <input [(ngModel)]="form.mot_de_passe" type="password" class="w-full border rounded-lg px-3 py-2 text-sm" [placeholder]="editingId ? 'Laisser vide pour conserver' : 'Requis'" />
            </div>
            <div class="flex items-center gap-2 pt-6">
              <input type="checkbox" [(ngModel)]="form.actif" class="w-4 h-4" />
              <label class="text-sm">Compte actif</label>
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button (click)="cancelForm()" class="border border-gray-300 px-3 py-2 rounded-lg text-sm">Annuler</button>
            <button (click)="submitForm()" class="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm">Enregistrer</button>
          </div>
        </div>
      }

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
                      <button (click)="openEdit(c)" class="text-xs border border-blue-300 text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg">✏️ Modifier</button>
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
  showForm = false;
  editingId: number | null = null;
  form: any = { prenom: '', nom: '', email: '', telephone: '', mot_de_passe: '', actif: 1 };

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

  openCreate() {
    this.editingId = null;
    this.showForm = true;
    this.form = { prenom: '', nom: '', email: '', telephone: '', mot_de_passe: '', actif: 1 };
  }

  openEdit(client: Utilisateur) {
    this.editingId = client.id_utilisateur;
    this.showForm = true;
    this.form = { prenom: client.prenom, nom: client.nom, email: client.email, telephone: client.telephone || '', mot_de_passe: '', actif: !!client.actif };
  }

  cancelForm() {
    this.showForm = false;
    this.editingId = null;
    this.form = { prenom: '', nom: '', email: '', telephone: '', mot_de_passe: '', actif: 1 };
  }

  submitForm() {
    const payload: any = {
      prenom: this.form.prenom,
      nom: this.form.nom,
      email: this.form.email,
      telephone: this.form.telephone,
      actif: this.form.actif ? 1 : 0,
    };

    if (this.form.mot_de_passe) {
      payload.mot_de_passe = this.form.mot_de_passe;
    }

    const request = this.editingId !== null
      ? this.adminSvc.updateUser(this.editingId, payload)
      : this.adminSvc.createUser({ ...payload, id_role: 3 });

    request.subscribe({
      next: () => {
        this.cancelForm();
        this.ngOnInit();
        this.toast.success(this.editingId ? 'Client modifié' : 'Client ajouté');
      },
      error: () => this.toast.error('Erreur lors de la sauvegarde'),
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
