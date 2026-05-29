import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p class="text-8xl mb-4">🍯</p>
        <h1 class="font-serif text-4xl font-bold mb-2">Page introuvable</h1>
        <p class="text-gray-500 mb-6">Cette page n'existe pas ou a été déplacée.</p>
        <a routerLink="/home" class="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full inline-block">
          Retour à l'accueil
        </a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
