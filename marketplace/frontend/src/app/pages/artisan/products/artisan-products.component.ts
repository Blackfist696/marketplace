import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../core/services/toast.service';
import { Produit, CATEGORY_LABELS } from '../../../core/models/models';

@Component({
  selector: 'app-artisan-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 class="font-serif text-2xl font-bold">Mes produits ({{ produits().length }})</h1>
        <button (click)="openNew()" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
          + Ajouter un produit
        </button>
      </div>

      <!-- Filtres -->
      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative">
          <input [(ngModel)]="search" placeholder="Rechercher..." class="border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div class="flex gap-2">
          @for (f of ['all','active','inactive']; track f) {
            <button (click)="statusFilter = f"
                    [class]="statusFilter===f ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-3 py-1.5 rounded-full text-sm">
              {{ f==='all' ? 'Tous' : f==='active' ? 'Actifs' : 'Inactifs' }}
            </button>
          }
        </div>
      </div>

      <!-- Tableau -->
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Produit</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">Prix HT</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Stock</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (p of filtered; track p.id_produit) {
                <tr class="border-t hover:bg-gray-50 transition-colors" [class.opacity-50]="!p.actif">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        @if (p.image_principale) { <img [src]="'/' + p.image_principale" [alt]="p.nom" class="w-full h-full object-cover" /> }
                      </div>
                      <span class="font-medium truncate max-w-[180px]">{{ p.nom }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 hidden sm:table-cell">{{ p.prix_ht | number:'1.2-2' }} €</td>
                  <td class="px-4 py-3 hidden md:table-cell" [class.text-red-600]="p.stock===0">{{ p.stock }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs px-2 py-1 rounded-full" [class]="p.actif ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'">
                      {{ p.actif ? 'Actif' : 'Inactif' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <button (click)="openEdit(p)" class="text-gray-500 hover:text-amber-600 mr-2 text-sm">✏️</button>
                    <button (click)="toggleActif(p)" class="text-gray-500 hover:text-gray-800 text-sm">
                      {{ p.actif ? '👁️' : '🚫' }}
                    </button>
                  </td>
                </tr>
              }
              @if (filtered.length === 0) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Aucun produit</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Dialog Ajout/Modif -->
    @if (dialogOpen) {
      <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
          <h2 class="font-serif text-xl font-bold mb-4">{{ editing ? 'Modifier' : 'Ajouter' }} un produit</h2>
          <div class="space-y-4">
            <div><label class="text-sm font-medium">Nom</label>
              <input [(ngModel)]="form.nom" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
            <div><label class="text-sm font-medium">Description</label>
              <textarea [(ngModel)]="form.description" rows="3" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm"></textarea></div>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="text-sm font-medium">Prix HT (€)</label>
                <input type="number" step="0.01" [(ngModel)]="form.prix_ht" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
              <div><label class="text-sm font-medium">Stock</label>
                <input type="number" [(ngModel)]="form.stock" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
            </div>
            <div><label class="text-sm font-medium">Poids / Contenance</label>
              <input [(ngModel)]="form.poids" placeholder="ex: 500g" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Produit actif</label>
              <input type="checkbox" [(ngModel)]="form.actif" class="w-4 h-4 accent-amber-500" />
            </div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Mis en avant</label>
              <input type="checkbox" [(ngModel)]="form.mis_en_avant" class="w-4 h-4 accent-amber-500" />
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button (click)="dialogOpen=false" class="flex-1 border border-gray-200 rounded-xl py-2 text-sm">Annuler</button>
            <button (click)="save()" [disabled]="saving()" class="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-2 text-sm font-medium disabled:opacity-50">
              {{ saving() ? 'Enregistrement…' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ArtisanProductsComponent implements OnInit {
  produits  = signal<Produit[]>([]);
  saving    = signal(false);
  search    = '';
  statusFilter = 'all';
  dialogOpen   = false;
  editing: Produit | null = null;
  form: Partial<Produit> = {};

  get filtered(): Produit[] {
    return this.produits().filter(p => {
      const ms = !this.search || p.nom.toLowerCase().includes(this.search.toLowerCase());
      const fs = this.statusFilter === 'all' || (this.statusFilter === 'active' ? !!p.actif : !p.actif);
      return ms && fs;
    });
  }

  constructor(private productSvc: ProductService, private toast: ToastService) {}

  ngOnInit() { this.load(); }
  load() { this.productSvc.getMyProducts().subscribe(ps => this.produits.set(ps)); }

  openNew() {
    this.editing = null;
    this.form = { nom:'', description:'', prix_ht:0, stock:0, poids:'', actif:1, mis_en_avant:0 };
    this.dialogOpen = true;
  }
  openEdit(p: Produit) {
    this.editing = p;
    this.form = { ...p };
    this.dialogOpen = true;
  }

  save() {
    this.saving.set(true);
    const obs = this.editing
      ? this.productSvc.update(this.editing.id_produit, this.form)
      : this.productSvc.create(this.form);
    obs.subscribe({
      next: () => { this.saving.set(false); this.dialogOpen = false; this.load(); this.toast.success(this.editing ? 'Produit modifié' : 'Produit ajouté'); },
      error: () => { this.saving.set(false); this.toast.error('Erreur'); },
    });
  }

  toggleActif(p: Produit) {
    this.productSvc.update(p.id_produit, { actif: p.actif ? 0 : 1 }).subscribe({
      next: () => { this.load(); this.toast.success('Statut mis à jour'); },
      error: () => this.toast.error('Erreur'),
    });
  }
}
