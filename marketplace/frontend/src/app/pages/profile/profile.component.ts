import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { Utilisateur, Commande, STATUT_LABELS, StatutCommande } from '../../core/models/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="max-w-5xl mx-auto px-4 py-12">
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Mon compte</p>
            <h1 class="font-serif text-3xl font-bold text-gray-900">
              Bonjour {{ profile()?.prenom || 'Utilisateur' }}
            </h1>
            <p class="text-sm text-gray-500 mt-1">Consultez et modifiez vos informations personnelles ainsi que votre adresse.</p>
          </div>
        </div>

        @if (error()) {
          <div class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {{ error() }}
          </div>
        }

        @if (success()) {
          <div class="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {{ success() }}
          </div>
        }

        <form (ngSubmit)="save()" class="grid gap-4 md:grid-cols-2">
          <label class="block text-sm font-medium text-gray-700">
            Prénom
            <input
              [(ngModel)]="form.prenom"
              name="prenom"
              type="text"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
            />
          </label>

          <label class="block text-sm font-medium text-gray-700">
            Nom
            <input
              [(ngModel)]="form.nom"
              name="nom"
              type="text"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
            />
          </label>

          <label class="block text-sm font-medium text-gray-700">
            Email
            <input
              [(ngModel)]="form.email"
              name="email"
              type="email"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
            />
          </label>

          <label class="block text-sm font-medium text-gray-700">
            Téléphone
            <input
              [(ngModel)]="form.telephone"
              name="telephone"
              type="tel"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
            />
          </label>

          <label class="block text-sm font-medium text-gray-700 md:col-span-2">
            Nouveau mot de passe
            <input
              [(ngModel)]="form.mot_de_passe"
              name="mot_de_passe"
              type="password"
              placeholder="Laisser vide pour conserver le mot de passe actuel"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
            />
          </label>

          <label class="block text-sm font-medium text-gray-700 md:col-span-2">
            Confirmez le nouveau mot de passe
            <input
              [(ngModel)]="form.confirm_mot_de_passe"
              name="confirm_mot_de_passe"
              type="password"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
            />
          </label>

          <div class="md:col-span-2 flex justify-end">
            <button
              type="submit"
              class="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
              [disabled]="loading()"
            >
              {{ loading() ? 'Enregistrement…' : 'Enregistrer les modifications' }}
            </button>
          </div>
        </form>

        <!-- Historique des commandes -->
        <div class="mt-10 border-t border-gray-200 pt-8">
          <h2 class="font-serif text-xl font-semibold text-gray-900 mb-4">Mes commandes</h2>

          @if (ordersLoading()) {
            <p class="text-sm text-gray-500">Chargement…</p>
          } @else if (orders().length === 0) {
            <p class="text-sm text-gray-500">Aucune commande pour le moment.</p>
          } @else {
            <div class="space-y-3">
              @for (order of orders(); track order.id_commande) {
                <div class="rounded-lg border border-gray-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p class="text-sm font-semibold text-gray-800">{{ order.reference }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">{{ order.date_commande | date:'dd/MM/yyyy' }}</p>
                  </div>
                  <span [class]="'text-xs font-medium px-2.5 py-1 rounded-full ' + statutColor(order.statut)">
                    {{ statutLabels[order.statut] }}
                  </span>
                  <p class="text-sm font-bold text-amber-600">{{ order.total_ttc | number:'1.2-2' }} €</p>
                </div>
              }
            </div>
          }
        </div>

        <div class="mt-10 border-t border-gray-200 pt-8">
          @if (addressError()) {
            <div class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {{ addressError() }}
            </div>
          }

          @if (addressSuccess()) {
            <div class="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {{ addressSuccess() }}
            </div>
          }

          <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 class="font-serif text-xl font-semibold text-gray-900">Adresse</h2>
              <p class="text-sm text-gray-500">Modifiez votre adresse enregistrée et précisez son type.</p>
            </div>
          </div>

          <form (ngSubmit)="saveAddress()" class="grid gap-4 md:grid-cols-2">
            <label class="block text-sm font-medium text-gray-700">
              Type d'adresse
              <select
                [(ngModel)]="addressForm.type_adresse"
                name="addressType"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
              >
                @for (type of addressTypeOptions(); track type) {
                  <option [value]="type">{{ type }}</option>
                }
              </select>
            </label>

            <label class="block text-sm font-medium text-gray-700">
              Rue
              <input
                [(ngModel)]="addressForm.rue"
                name="addressRue"
                type="text"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label class="block text-sm font-medium text-gray-700">
              Complément
              <input
                [(ngModel)]="addressForm.complement"
                name="addressComplement"
                type="text"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label class="block text-sm font-medium text-gray-700">
              Code postal
              <input
                [(ngModel)]="addressForm.code_postal"
                name="addressCodePostal"
                type="text"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none"
              />
            </label>

            <div class="md:col-span-2 flex justify-end">
              <button
                type="submit"
                class="rounded-lg border border-amber-600 px-5 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-50"
                [disabled]="addressLoading()"
              >
                {{ addressButtonLabel() }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class ProfileComponent implements OnInit {
  profile = signal<Utilisateur | null>(null);
  addresses = signal<any[]>([]);
  orders = signal<Commande[]>([]);
  loading = signal(false);
  addressLoading = signal(false);
  ordersLoading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  addressError = signal<string | null>(null);
  addressSuccess = signal<string | null>(null);
  readonly statutLabels = STATUT_LABELS;

  form = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    mot_de_passe: '',
    confirm_mot_de_passe: '',
  };

  addressForm = {
    id_adresse: null as number | null,
    rue: '',
    complement: '',
    code_postal: '',
    type_adresse: 'livraison',
  };

  constructor(private auth: AuthService, private order: OrderService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersLoading.set(true);
    this.order.getClientOrders().subscribe({
      next: orders => { this.orders.set(orders); this.ordersLoading.set(false); },
      error: () => this.ordersLoading.set(false),
    });
  }

  statutColor(statut: StatutCommande): string {
    const colors: Record<StatutCommande, string> = {
      en_attente:     'bg-amber-100 text-amber-800',
      en_preparation: 'bg-blue-100 text-blue-800',
      expediee:       'bg-purple-100 text-purple-800',
      livree:         'bg-emerald-100 text-emerald-800',
      annulee:        'bg-red-100 text-red-800',
    };
    return colors[statut] ?? 'bg-gray-100 text-gray-800';
  }

  loadProfile(): void {
    this.loading.set(true);
    this.auth.loadProfile().subscribe({
      next: () => {
        this.profile.set(this.auth.currentUser());
        this.addresses.set(this.auth.currentUserAddresses());
        this.populateForm(this.profile());
        this.populateAddressForm(this.addresses()[0] ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger votre profil pour le moment.');
        this.loading.set(false);
      },
    });
  }

  save(): void {
    this.error.set(null);
    this.success.set(null);
    this.loading.set(true);

    if (this.form.mot_de_passe && this.form.mot_de_passe !== this.form.confirm_mot_de_passe) {
      this.error.set('Les mots de passe ne correspondent pas.');
      this.loading.set(false);
      return;
    }

    const payload: Record<string, string> = {
      prenom: this.form.prenom,
      nom: this.form.nom,
      email: this.form.email,
      telephone: this.form.telephone,
    };

    if (this.form.mot_de_passe.trim()) {
      payload['mot_de_passe'] = this.form.mot_de_passe;
    }

    this.auth.updateProfile(payload).subscribe({
      next: () => {
        this.profile.set(this.auth.currentUser());
        this.populateForm(this.profile());
        this.success.set('Votre profil a bien été mis à jour.');
        this.loading.set(false);
      },
      error: () => {
        this.error.set('La mise à jour de votre profil a échoué.');
        this.loading.set(false);
      },
    });
  }

  saveAddress(): void {
    this.addressError.set(null);
    this.addressSuccess.set(null);
    this.addressLoading.set(true);

    const payload: Record<string, any> = {
      id_adresse: this.addressForm.id_adresse,
      rue: this.addressForm.rue,
      complement: this.addressForm.complement,
      code_postal: this.addressForm.code_postal,
      type_adresse: this.addressForm.type_adresse,
    };

    this.auth.saveAddress(payload).subscribe({
      next: () => {
        this.addressSuccess.set('Votre adresse a bien été enregistrée.');
        this.addressLoading.set(false);
        this.loadProfile();
      },
      error: () => {
        this.addressError.set('L\'enregistrement de votre adresse a échoué.');
        this.addressLoading.set(false);
      },
    });
  }

  addressTypeOptions(): string[] {
    const role = this.profile()?.id_role;
    if (role === 1 || role === 2) {
      return ['livraison', 'facturation', 'atelier', 'bureau', 'siège social'];
    }

    return ['livraison', 'facturation'];
  }

  addressButtonLabel(): string {
    if (this.addressLoading()) {
      return 'Enregistrement…';
    }

    return this.addressForm.id_adresse ? 'Enregistrer l\'adresse' : 'Ajouter l\'adresse';
  }

  private populateForm(user: Utilisateur | null): void {
    this.form = {
      prenom: user?.prenom ?? '',
      nom: user?.nom ?? '',
      email: user?.email ?? '',
      telephone: user?.telephone ?? '',
      mot_de_passe: '',
      confirm_mot_de_passe: '',
    };
  }

  private populateAddressForm(address: any | null): void {
    this.addressForm = {
      id_adresse: address?.id_adresse ?? null,
      rue: address?.rue ?? '',
      complement: address?.complement ?? '',
      code_postal: address?.code_postal ?? '',
      type_adresse: address?.type_adresse ?? 'livraison',
    };
  }
}
