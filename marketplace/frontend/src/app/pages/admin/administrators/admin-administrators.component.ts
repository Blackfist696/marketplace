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
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 class="font-serif text-2xl font-bold">Gestion des administrateurs</h1>
        <button (click)="openCreate()" class="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm">+ Ajouter un administrateur</button>
      </div>

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

      @if (showForm) {
        <div class="card p-5 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold">{{ editingId ? 'Modifier l’administrateur' : 'Ajouter un administrateur' }}</h2>
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
            <div>
              <label class="block text-sm font-medium mb-1">Rue</label>
              <input [(ngModel)]="address.rue" name="adminAddressRue" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Complément</label>
              <input [(ngModel)]="address.complement" name="adminAddressComplement" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Code postal</label>
              <input [(ngModel)]="address.code_postal" name="adminAddressCodePostal" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Ville</label>
              <input [(ngModel)]="address.nom_ville" name="adminAddressVille" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Pays</label>
              <input [(ngModel)]="address.nom_pays" name="adminAddressPays" class="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Type d’adresse</label>
              <select [(ngModel)]="address.type_adresse" name="adminAddressType" class="w-full border rounded-lg px-3 py-2 text-sm">
                @for (option of addressTypeOptions; track option) {
                  <option [value]="option">{{ option }}</option>
                }
              </select>
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
                      <button (click)="openEdit(admin)" class="text-xs border border-blue-300 text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg">✏️ Modifier</button>
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
  showForm = false;
  editingId: number | null = null;
  form: any = { prenom: '', nom: '', email: '', telephone: '', mot_de_passe: '', actif: 1 };
  address: any = { rue: '', complement: '', code_postal: '', nom_ville: '', nom_pays: '', type_adresse: 'bureau' };
  addressTypeOptions = ['livraison', 'facturation', 'atelier', 'bureau', 'siège social'];

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

  openCreate() {
    this.editingId = null;
    this.showForm = true;
    this.form = { prenom: '', nom: '', email: '', telephone: '', mot_de_passe: '', actif: 1 };
    this.address = { rue: '', complement: '', code_postal: '', nom_ville: '', nom_pays: '', type_adresse: 'bureau' };
  }

  openEdit(admin: Utilisateur) {
    this.editingId = admin.id_utilisateur;
    this.showForm = true;
    this.form = { prenom: admin.prenom, nom: admin.nom, email: admin.email, telephone: admin.telephone || '', mot_de_passe: '', actif: !!admin.actif };
    this.address = { rue: '', complement: '', code_postal: '', nom_ville: '', nom_pays: '', type_adresse: 'bureau' };
    this.loadAddress(admin.id_utilisateur);
  }

  cancelForm() {
    this.showForm = false;
    this.editingId = null;
    this.form = { prenom: '', nom: '', email: '', telephone: '', mot_de_passe: '', actif: 1 };
    this.address = { rue: '', complement: '', code_postal: '', nom_ville: '', nom_pays: '', type_adresse: 'bureau' };
  }

  private loadAddress(userId: number) {
    this.adminSvc.getUserAddresses(userId).subscribe({
      next: addresses => {
        const current = Array.isArray(addresses) && addresses.length > 0 ? addresses[0] : null;
        this.address = {
          rue: current?.rue ?? '',
          complement: current?.complement ?? '',
          code_postal: current?.code_postal ?? '',
          nom_ville: current?.nom_ville ?? '',
          nom_pays: current?.nom_pays ?? '',
          type_adresse: current?.type_adresse ?? 'bureau',
        };
      },
      error: () => {
        this.address = { rue: '', complement: '', code_postal: '', nom_ville: '', nom_pays: '', type_adresse: 'bureau' };
      },
    });
  }

  submitForm() {
    const payload: any = {
      prenom: this.form.prenom,
      nom: this.form.nom,
      email: this.form.email,
      telephone: this.form.telephone,
      actif: this.form.actif ? 1 : 0,
      rue: this.address.rue,
      complement: this.address.complement,
      code_postal: this.address.code_postal,
      type_adresse: this.address.type_adresse,
      ville: this.address.nom_ville,
      pays: this.address.nom_pays,
    };

    if (this.form.mot_de_passe) {
      payload.mot_de_passe = this.form.mot_de_passe;
    }

    const request = this.editingId !== null
      ? this.adminSvc.updateUser(this.editingId, payload)
      : this.adminSvc.createUser({ ...payload, id_role: 1 });

    const isEditing = this.editingId !== null;

    request.subscribe({
      next: () => {
        this.cancelForm();
        this.ngOnInit();
        this.toast.success(isEditing ? 'Administrateur modifié' : 'Administrateur ajouté');
      },
      error: () => this.toast.error('Erreur lors de la sauvegarde'),
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
