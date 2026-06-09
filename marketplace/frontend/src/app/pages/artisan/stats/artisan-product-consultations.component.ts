import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultProductsService } from '../../../core/services/consult-products.service';
import { ProductConsultationStat } from '../../../core/models/models';

@Component({
  selector: 'app-artisan-product-consultations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="font-serif text-2xl font-bold">Consultation produits</h1>
          <p class="text-gray-500 text-sm">Suivi des visites des produits consultés par les visiteurs.</p>
        </div>
        <a routerLink="/artisan/stats" class="text-amber-600 hover:underline">← Retour aux statistiques</a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div class="card p-5">
          <p class="text-xs uppercase text-gray-500 mb-2">Total consultations</p>
          <p class="text-3xl font-semibold">{{ totalConsultations() }}</p>
        </div>
        <div class="card p-5">
          <p class="text-xs uppercase text-gray-500 mb-2">Produits uniques</p>
          <p class="text-3xl font-semibold">{{ uniqueProducts() }}</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Top produits consultés</h2>
          @if (topProducts().length === 0) {
            <p class="text-gray-500">Aucune consultation enregistrée.</p>
          } @else {
            <div class="space-y-3">
              @for (item of topProducts(); track item.id_produit) {
                <div class="flex items-center justify-between">
                  <span class="font-medium">Produit #{{ item.id_produit }}</span>
                  <span class="text-sm text-gray-500">{{ item.count }} consultations</span>
                </div>
              }
            </div>
          }
        </div>

        <div class="card p-6">
          <h2 class="font-semibold mb-4">Dernières consultations</h2>
          @if (consultations().length === 0) {
            <p class="text-gray-500">Aucune consultation enregistrée.</p>
          } @else {
            <div class="space-y-3 text-sm text-gray-600">
              @for (consultation of recentConsultations(); track consultation.id_statistique) {
                <div class="border-b pb-3 last:border-0">
                  <div class="flex items-center justify-between gap-3">
                    <span>Produit #{{ consultation.id_produit }}</span>
                    <span class="text-xs text-gray-400">{{ consultation.date_consultation | date:'dd/MM/yyyy HH:mm' }}</span>
                  </div>
                  <p class="text-xs text-gray-500">IP : {{ consultation.ip_adress }}</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ArtisanProductConsultationsComponent implements OnInit {
  consultations = signal<ProductConsultationStat[]>([]);
  topProducts = signal<{ id_produit: number; count: number }[]>([]);
  totalConsultations = signal(0);

  constructor(private consultProductsSvc: ConsultProductsService) {}

  ngOnInit() {
    this.consultProductsSvc.getMyConsultations().subscribe(cons => {
      const sorted = [...cons].sort((a, b) => new Date(b.date_consultation).getTime() - new Date(a.date_consultation).getTime());
      this.consultations.set(sorted);
      this.totalConsultations.set(sorted.length);

      const counts: Record<number, number> = {};
      sorted.forEach(item => {
        counts[item.id_produit] = (counts[item.id_produit] ?? 0) + 1;
      });

      this.topProducts.set(
        Object.entries(counts)
          .map(([id, count]) => ({ id_produit: Number(id), count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      );
    });
  }

  uniqueProducts() {
    return new Set(this.consultations().map(item => item.id_produit)).size;
  }

  recentConsultations() {
    return this.consultations().slice(0, 10);
  }
}
