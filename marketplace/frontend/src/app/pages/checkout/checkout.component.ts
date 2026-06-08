import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AddressService } from '../../core/services/address.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Adresse } from '../../core/models/models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto px-4 py-8">
      <!-- Stepper -->
      <div class="flex items-center justify-center gap-3 mb-10">
        @for (s of steps; track s.n) {
          <div class="flex items-center gap-2">
            <div [class]="stepClass(s.n)" class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
              {{ step() > s.n ? '✓' : s.n }}
            </div>
            <span [class]="step()===s.n ? 'font-medium' : 'text-gray-400'" class="text-sm hidden sm:block">{{ s.label }}</span>
          </div>
          @if (s.n < steps.length) { <div class="w-10 h-0.5 bg-gray-200"></div> }
        }
      </div>

      <!-- Étape 1 : Adresse -->
      @if (step() === 1) {
        <div class="card p-6 md:p-8">
          <h2 class="font-serif text-2xl font-bold mb-6">Adresse de livraison</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label class="text-sm font-medium">Rue</label>
              <input [(ngModel)]="addr.rue" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
            <div><label class="text-sm font-medium">Code postal</label>
              <input [(ngModel)]="addr.code_postal" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
          </div>
          <button (click)="submitAddress()" [disabled]="saving()"
                  class="w-full mt-6 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium">
            {{ saving() ? 'Enregistrement…' : 'Continuer vers le paiement' }}
          </button>
        </div>
      }

      <!-- Étape 2 : Paiement -->
      @if (step() === 2) {
        <div class="card p-6 md:p-8">
          <h2 class="font-serif text-2xl font-bold mb-6">Paiement sécurisé</h2>
          <div class="space-y-4">
            <label class="flex items-center gap-3 border rounded-xl p-4 cursor-pointer" [class.border-amber-500]="payment==='card'">
              <input type="radio" name="pay" value="card" [(ngModel)]="payment" />
              <span>💳 Carte bancaire</span>
            </label>
            @if (payment === 'card') {
              <div class="pl-7 space-y-3">
                <input placeholder="Numéro de carte" class="w-full border rounded-lg px-3 py-2 text-sm" />
                <div class="grid grid-cols-2 gap-3">
                  <input placeholder="MM/AA" class="w-full border rounded-lg px-3 py-2 text-sm" />
                  <input placeholder="CVV" class="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
            }
            <label class="flex items-center gap-3 border rounded-xl p-4 cursor-pointer" [class.border-amber-500]="payment==='virement'">
              <input type="radio" name="pay" value="virement" [(ngModel)]="payment" />
              <span>🏦 Virement bancaire</span>
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-4 flex items-center gap-1">🔒 Paiement sécurisé SSL</p>
          <button (click)="placeOrder()" [disabled]="saving()"
                  class="w-full mt-6 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium">
            {{ saving() ? 'Traitement…' : 'Confirmer et payer ' + totalDisplay() + ' €' }}
          </button>
          <div class="card p-4 mt-4 text-sm">
            <p class="font-semibold mb-1">{{ cart.count() }} articles</p>
            <p class="text-xl font-bold">{{ totalDisplay() }} €</p>
          </div>
        </div>
      }

      <!-- Étape 3 : Confirmation -->
      @if (step() === 3) {
        <div class="card p-8 md:p-12 text-center">
          <div class="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
          <h2 class="font-serif text-3xl font-bold mb-2">Commande confirmée !</h2>
          <p class="text-gray-500 mb-2">Référence : <span class="font-mono font-semibold text-gray-800">{{ orderRef() }}</span></p>
          <p class="text-gray-500 mb-8">Un email de confirmation a été envoyé.</p>
          <a routerLink="/home" class="border border-gray-300 hover:border-gray-400 px-8 py-2 rounded-full text-sm">
            Retour à l'accueil
          </a>
        </div>
      }
    </div>
  `,
})
export class CheckoutComponent implements OnInit {
  step    = signal(1);
  saving  = signal(false);
  orderRef = signal('');
  steps = [{n:1,label:'Adresse'},{n:2,label:'Paiement'},{n:3,label:'Confirmation'}];
  addr: Partial<Adresse> = { rue: '', code_postal: '' };
  payment = 'card';
  addressId = signal<number | null>(null);
  savedAddress: Adresse | null = null;

  constructor(
    public cart: CartService,
    private orderSvc: OrderService,
    private addrSvc: AddressService,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cart.load().subscribe();
    this.loadSavedAddress();
  }

  private loadSavedAddress() {
    const addresses = this.auth.currentUserAddresses();
    if (addresses.length > 0) {
      this.prefillSavedAddress(addresses[0]);
      return;
    }

    this.auth.loadProfile().subscribe(() => {
      const loadedAddresses = this.auth.currentUserAddresses();
      if (loadedAddresses.length > 0) {
        this.prefillSavedAddress(loadedAddresses[0]);
      }
    });
  }

  private prefillSavedAddress(address: Adresse) {
    this.savedAddress = address;
    this.addr = {
      ...this.addr,
      rue: address.rue,
      code_postal: address.code_postal,
      id_ville: address.id_ville,
    };
  }

  stepClass(n: number) {
    if (this.step() > n) return 'bg-green-500 text-white';
    if (this.step() === n) return 'bg-amber-500 text-white';
    return 'bg-gray-200 text-gray-600';
  }

  totalDisplay() {
    const sub = this.cart.total();
    return (sub * 1.21 + (sub > 50 ? 0 : 4.95)).toFixed(2);
  }

  submitAddress() {
    if (!this.addr.rue || !this.addr.code_postal) { this.toast.error('Remplissez tous les champs'); return; }

    if (this.savedAddress
      && this.addr.rue === this.savedAddress.rue
      && this.addr.code_postal === this.savedAddress.code_postal) {
      this.addressId.set(this.savedAddress.id_adresse);
      this.step.set(2);
      return;
    }

    this.saving.set(true);
    this.addrSvc.create(this.addr).subscribe({
      next: res => { this.addressId.set(res?.data?.id_adresse ?? 1); this.saving.set(false); this.step.set(2); },
      error: () => { this.saving.set(false); this.toast.error('Erreur adresse'); },
    });
  }

  placeOrder() {
    const addrId = this.addressId();
    if (!addrId) { this.toast.error('Adresse manquante'); return; }
    this.saving.set(true);
    const ship = this.cart.total() > 50 ? 0 : 4.95;
    this.orderSvc.create(addrId, ship).subscribe({
      next: res => {
        this.orderRef.set(res?.data?.reference ?? 'CMD-' + Date.now());
        this.cart.clear();
        this.saving.set(false);
        this.step.set(3);
      },
      error: () => { this.saving.set(false); this.toast.error('Erreur lors de la commande'); },
    });
  }
}
