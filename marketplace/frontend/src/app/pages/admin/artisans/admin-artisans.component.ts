import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtisanService } from '../../../core/services/artisan.service';
import { ToastService } from '../../../core/services/toast.service';
import { Artisan } from '../../../core/models/models';

@Component({
  selector: 'app-admin-artisans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des Artisans</h1>

      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative flex-1 min-w-[200px]">
          <input [(ngModel)]="search" placeholder="Rechercher…" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div class="flex gap-2 flex-wrap">
          @for (f of ['all','active','inactive']; track f) {
            <button (click)="filterStatus=f"
                    [class]="filterStatus===f ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-3 py-1.5 rounded-full text-sm">
              {{ f==='all' ? 'Tous' : f==='active' ? 'Actifs' : 'Inactifs' }}
              @if (f==='inactive' && pendingCount() > 0) {
                <span class="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">{{ pendingCount() }}</span>
              }
            </button>
          }
        </div>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Boutique</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">N° TVA</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">Chargement…</td></tr>
              }
              @for (a of filtered; track a.id_artisan) {
                <tr class="border-t hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3">
                    <div class="font-medium">{{ a.nom_boutique }}</div>
                    <div class="text-xs text-gray-500">{{ a.description?.slice(0,50) }}</div>
                  </td>
                  <td class="px-4 py-3 text-gray-500 hidden sm:table-cell font-mono text-xs">{{ a.numero_tva || '—' }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-1 rounded-full" [class]="a.valide ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                      {{ a.valide ? 'Actif' : 'En attente' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    @if (!a.valide) {
                      <button (click)="activate(a, true)"  class="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg mr-1">✓ Valider</button>
                      <button (click)="activate(a, false)" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg">✗ Refuser</button>
                    } @else {
                      <button (click)="activate(a, false)" class="text-xs border border-red-300 text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg">Désactiver</button>
                    }
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">Aucun artisan trouvé</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AdminArtisansComponent implements OnInit {
  artisans    = signal<Artisan[]>([]);
  loading     = signal(true);
  search      = '';
  filterStatus = 'all';

  pendingCount = signal(0);

  get filtered(): Artisan[] {
    return this.artisans().filter(a => {
      const ms = !this.search || a.nom_boutique.toLowerCase().includes(this.search.toLowerCase());
      const fs = this.filterStatus === 'all'
        || (this.filterStatus === 'active' ? !!a.valide : !a.valide);
      return ms && fs;
    });
  }

  constructor(private artisanSvc: ArtisanService, private toast: ToastService) {}

  ngOnInit() {
    this.artisanSvc.adminGetAll().subscribe(as => {
      this.artisans.set(as);
      this.pendingCount.set(as.filter(a => !a.valide).length);
      this.loading.set(false);
    });
  }

  activate(a: Artisan, activer: boolean) {
    this.artisanSvc.adminUpdate(a.id_artisan, { valide: activer ? 1 : 0 }).subscribe({
      next: () => { this.ngOnInit(); this.toast.success(activer ? 'Artisan validé' : 'Artisan désactivé'); },
      error: () => this.toast.error('Erreur'),
    });
  }
}
