import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-amber-50">
      <div class="card p-8 w-full max-w-md">
        <h1 class="font-serif text-2xl font-bold text-center mb-6">Créer un compte</h1>
        <form (ngSubmit)="submit()" class="space-y-4">
          <div>
            <label class="text-sm font-medium">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required
                   class="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label class="text-sm font-medium">Mot de passe</label>
            <input type="password" [(ngModel)]="password" name="password" required
                   class="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-2">Je suis…</label>
            <div class="grid grid-cols-2 gap-3">
              <label class="border rounded-xl p-3 text-center cursor-pointer transition-all" [class.border-amber-500]="role===3" [class.bg-amber-50]="role===3">
                <input type="radio" name="role" [value]="3" [(ngModel)]="role" class="hidden" />
                <div class="text-2xl mb-1">🛍️</div>
                <div class="text-sm font-medium">Client</div>
              </label>
              <label class="border rounded-xl p-3 text-center cursor-pointer transition-all" [class.border-amber-500]="role===2" [class.bg-amber-50]="role===2">
                <input type="radio" name="role" [value]="2" [(ngModel)]="role" class="hidden" />
                <div class="text-2xl mb-1">🏪</div>
                <div class="text-sm font-medium">Artisan</div>
              </label>
            </div>
          </div>
          @if (error()) {
            <p class="text-sm text-red-500">{{ error() }}</p>
          }
          <button type="submit" [disabled]="loading()"
                  class="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium">
            {{ loading() ? 'Inscription…' : 'Créer mon compte' }}
          </button>
        </form>
        <p class="text-center text-sm text-gray-500 mt-4">
          Déjà un compte ? <a routerLink="/login" class="text-amber-600 hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  email    = '';
  password = '';
  role     = 3;
  loading  = signal(false);
  error    = signal('');

  constructor(private auth: AuthService, private router: Router, private toast: ToastService) {}

  submit() {
    if (!this.email || !this.password) { this.error.set('Champs requis'); return; }
    this.loading.set(true); this.error.set('');
    this.auth.register(this.email, this.password, this.role).subscribe({
      next: res => {
        this.loading.set(false);
        if (res?.status === 201) {
          this.toast.success('Compte créé ! Connectez-vous.');
          this.router.navigate(['/login']);
        } else {
          this.error.set(res?.message ?? 'Erreur inscription');
        }
      },
      error: (e: any) => { this.loading.set(false); this.error.set(e?.error?.message ?? 'Erreur inscription'); },
    });
  }
}
