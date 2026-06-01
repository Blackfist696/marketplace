import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-amber-50">
      <div class="card p-8 w-full max-w-md">
        <h1 class="font-serif text-2xl font-bold text-center mb-6">Connexion</h1>
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
          @if (error()) {
            <p class="text-sm text-red-500">{{ error() }}</p>
          }
          <button type="submit" [disabled]="loading()"
                  class="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium">
            {{ loading() ? 'Connexion…' : 'Se connecter' }}
          </button>
        </form>
        <p class="text-center text-sm text-gray-500 mt-4">
          Pas encore de compte ? <a routerLink="/register" class="text-amber-600 hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email    = '';
  password = '';
  loading  = signal(false);
  error    = signal('');

  constructor(private auth: AuthService, private router: Router, private toast: ToastService) {}

  submit() {
    if (!this.email || !this.password) { this.error.set('Champs requis'); return; }
    this.loading.set(true); this.error.set('');
    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        this.loading.set(false);
        if (res?.status === 200) {
          this.toast.success('Bienvenue !');
          const user = this.auth.currentUser();
          if (user?.id_role === 1) this.router.navigate(['/admin/dashboard']);
          else if (user?.id_role === 2) this.router.navigate(['/artisan/dashboard']);
          else this.router.navigate(['/catalogue']);
        } else {
          this.error.set(res?.message ?? 'Identifiants invalides');
        }
      },
      error: () => { this.loading.set(false); this.error.set('Identifiants invalides'); },
    });
  }
}
