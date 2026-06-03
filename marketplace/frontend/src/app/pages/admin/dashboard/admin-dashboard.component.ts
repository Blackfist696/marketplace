import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../../../core/services/artisan.service';
import { OrderService } from '../../../core/services/order.service';
import { AvisService } from '../../../core/services/avis.service';
import { KpiCardComponent } from '../../../shared/kpi-card/kpi-card.component';
import { ToastService } from '../../../core/services/toast.service';
import { Artisan, Commande, Avis, STATUT_LABELS } from '../../../core/models/models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Tableau de bord Administration</h1>

      <!-- KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <app-kpi-card title="Artisans actifs"   [value]="activeArtisans()" />
        <app-kpi-card title="En attente"         [value]="pendingArtisans().length" />
        <app-kpi-card title="Commandes"          [value]="orders().length" />
        <app-kpi-card title="Avis à modérer"     [value]="pendingAvis().length" />
      </div>

      <!-- Artisans en attente -->
      @if (pendingArtisans().length > 0) {
        <div class="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <h2 class="font-semibold text-orange-800 mb-4">⚠️ {{ pendingArtisans().length }} artisan(s) en attente de validation</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="border-b border-orange-200">
                <th class="text-left pb-2 font-medium text-orange-700">Boutique</th>
                <th class="text-left pb-2 font-medium text-orange-700 hidden sm:table-cell">N° TVA</th>
                <th class="text-right pb-2 font-medium text-orange-700">Actions</th>
              </tr></thead>
              <tbody>
                @for (a of pendingArtisans(); track a.id_artisan) {
                  <tr class="border-b border-orange-100 last:border-0">
                    <td class="py-2 font-medium">{{ a.nom_boutique }}</td>
                    <td class="py-2 text-orange-700/70 hidden sm:table-cell font-mono text-xs">{{ a.numero_tva || '—' }}</td>
                    <td class="py-2 text-right">
                      <button (click)="valider(a, true)"  class="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg mr-1">✓ Valider</button>
                      <button (click)="valider(a, false)" class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg">✗ Refuser</button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <div class="grid lg:grid-cols-2 gap-6 mb-8">
        <!-- Dernières commandes -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Dernières commandes</h2>
          <div class="space-y-2">
            @for (o of orders().slice(0,5); track o.id_commande) {
              <div class="flex items-center justify-between text-sm py-2 border-b last:border-0">
                <div><p class="font-mono text-xs font-medium">{{ o.reference }}</p></div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ o.total_ttc | number:'1.2-2' }} €</span>
                  <span class="text-xs px-2 py-0.5 rounded-full" [class]="'badge-' + o.statut">{{ statutLabel(o.statut) }}</span>
                </div>
              </div>
            }
            @if (orders().length === 0) { <p class="text-gray-500 text-sm">Aucune commande</p> }
          </div>
        </div>

        <!-- Avis à modérer -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Avis à modérer</h2>
          <div class="space-y-3">
            @for (av of pendingAvis().slice(0,4); track av.id_avis) {
              <div class="border rounded-xl p-3">
                <div class="flex gap-0.5 mb-1">
                  @for (i of [1,2,3,4,5]; track i) {
                    <span [class]="i<=av.note ? 'text-amber-500' : 'text-gray-200'" class="text-xs">★</span>
                  }
                </div>
                <p class="text-xs text-gray-600 line-clamp-2 mb-2">{{ av.commentaire }}</p>
                <div class="flex gap-2">
                  <button (click)="modererAvis(av, 'approved')" class="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded-lg">✓</button>
                  <button (click)="modererAvis(av, 'rejected')" class="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-lg">✗</button>
                </div>
              </div>
            }
            @if (pendingAvis().length === 0) { <p class="text-gray-500 text-sm">Aucun avis en attente</p> }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent implements OnInit {
  artisans       = signal<Artisan[]>([]);
  orders         = signal<Commande[]>([]);
  pendingAvis    = signal<Avis[]>([]);
  pendingArtisans = signal<Artisan[]>([]);
  activeArtisans  = signal(0);

  constructor(
    private artisanSvc: ArtisanService,
    private orderSvc: OrderService,
    private avisSvc: AvisService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.artisanSvc.adminGetAll().subscribe(as => {
      this.artisans.set(as);
      this.pendingArtisans.set(as.filter(a => !a.valide));
      this.activeArtisans.set(as.filter(a => a.valide).length);
    });
    this.orderSvc.getAdminOrders().subscribe(os => this.orders.set(os));
    this.avisSvc.getAll().subscribe(av => this.pendingAvis.set(av.filter(a => a.statut === 'pending')));
  }

  valider(a: Artisan, activer: boolean) {
    this.artisanSvc.adminUpdate(a.id_artisan, { valide: activer ? 1 : 0 }).subscribe({
      next: () => { this.ngOnInit(); this.toast.success(activer ? 'Artisan validé' : 'Artisan refusé'); },
      error: () => this.toast.error('Erreur'),
    });
  }

  modererAvis(av: Avis, statut: 'approved' | 'rejected') {
    this.avisSvc.update(av.id_avis, { statut }).subscribe({
      next: () => { this.pendingAvis.update(list => list.filter(x => x.id_avis !== av.id_avis)); this.toast.success('Avis modéré'); },
      error: () => this.toast.error('Erreur'),
    });
  }

  statutLabel(s: string) { return (STATUT_LABELS as any)[s] ?? s; }
}
