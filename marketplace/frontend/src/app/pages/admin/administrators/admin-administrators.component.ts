import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';
import { Utilisateur } from '../../../core/models/models';

@Component({
  selector: 'app-admin-administrators',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des administrateurs</h1>

      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative flex-1 min-w-[220px]">
          <input [(ngModel)]="search" placeholder="Rechercher un administrateur…" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div class="flex gap-2 flex-wrap">
          @for (f of ['all','active','inactive']; track f) {
            <button (click)="filterStatus = f"
                    [class]="filterStatus === f ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-3 py-1.5 rounded-full text-sm">
              {{ f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : 'Inactifs' }}
            </button>
          }
        </div>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Administrateur</th>
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
              @for (admin of filtered; track admin.id_utilisateur) {
                <tr class="border-t hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3">
                    <div class="font-medium">{{ admin.prenom }} {{ admin.nom }}</div>
                    <div class="text-xs text-gray-500">Inscrit le {{ admin.date_inscription ? (admin.date_inscription | date:'dd/MM/yyyy') : '—' }}</div>
                  </td>
                  <td class="px-4 py-3 text-gray-500 hidden md:table-cell">{{ admin.email }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ admin.telephone || '—' }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-1 rounded-full" [class]="admin.actif ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                      {{ admin.actif ? 'Actif' : 'Inactif' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="flex justify-end gap-2 flex-wrap">
                      <button (click)="openPanel(admin)" class="text-xs border border-gray-300 text-gray-600 hover:bg-gray-50 px-2 py-1 rounded-lg">ℹ️ Détails</button>
                      @if (admin.actif) {
                        <button (click)="toggleStatus(admin, false)" class="text-xs border border-red-300 text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg">Désactiver</button>
                      } @else {
                        <button (click)="toggleStatus(admin, true)" class="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg">Réactiver</button>
                      }
                    </div>
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Aucun administrateur trouvé</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      @if (selectedAdmin) {
        <div class="mt-6 card p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold">Informations administrateur</h2>
            <button (click)="closePanel()" class="text-sm text-gray-500 hover:text-gray-700">✕ Fermer</button>
          </div>

          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="border rounded-lg p-3">
              <div class="text-gray-500 mb-1">Nom</div>
              <div class="font-medium">{{ selectedAdmin!.prenom }} {{ selectedAdmin!.nom }}</div>
            </div>
            <div class="border rounded-lg p-3">
              <div class="text-gray-500 mb-1">Email</div>
              <div class="font-medium">{{ selectedAdmin!.email }}</div>
            </div>
            <div class="border rounded-lg p-3">
              <div class="text-gray-500 mb-1">Téléphone</div>
              <div class="font-medium">{{ selectedAdmin!.telephone || '—' }}</div>
            </div>
            <div class="border rounded-lg p-3">
              <div class="text-gray-500 mb-1">Statut</div>
              <div class="font-medium">{{ selectedAdmin!.actif ? 'Actif' : 'Inactif' }}</div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class AdminAdministratorsComponent implements OnInit {
  administrators = signal<Utilisateur[]>([]);
  loading = signal(true);
  search = '';
  filterStatus = 'all';
  selectedAdminId = signal<number | null>(null);

  get filtered(): Utilisateur[] {
    return this.administrators().filter(admin => {
      const matchesSearch = !this.search || `${admin.prenom} ${admin.nom}`.toLowerCase().includes(this.search.toLowerCase()) || admin.email.toLowerCase().includes(this.search.toLowerCase());
      const matchesStatus = this.filterStatus === 'all'
        || (this.filterStatus === 'active' ? !!admin.actif : !admin.actif);
      return matchesSearch && matchesStatus;
    });
  }

  get selectedAdmin(): Utilisateur | null {
    return this.administrators().find(admin => admin.id_utilisateur === this.selectedAdminId()) ?? null;
  }

  constructor(private adminSvc: AdminService, private toast: ToastService) {}

  ngOnInit() {
    this.adminSvc.getUsers().subscribe({
      next: users => {
        this.administrators.set(users.filter(user => user.id_role === 1));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Impossible de charger les administrateurs');
      },
    });
  }

  openPanel(admin: Utilisateur) {
    this.selectedAdminId.set(admin.id_utilisateur);
  }

  closePanel() {
    this.selectedAdminId.set(null);
  }

  toggleStatus(admin: Utilisateur, active: boolean) {
    this.adminSvc.updateUser(admin.id_utilisateur, { actif: active ? 1 : 0 }).subscribe({
      next: () => {
        this.ngOnInit();
        this.toast.success(active ? 'Administrateur réactivé' : 'Administrateur désactivé');
      },
      error: () => this.toast.error('Erreur lors de la mise à jour'),
    });
  }
}
