import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiAssistantService } from '../../core/services/ai-assistant.service';
import { Produit } from '../../core/models/models';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white p-5 shadow-sm">
      <div class="flex items-start justify-between gap-3 mb-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">Assistant IA</p>
          <h3 class="font-semibold text-gray-900">{{ title }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
        </div>
        <span class="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">En ligne</span>
      </div>

      <div class="rounded-xl border border-gray-200 bg-white p-3 space-y-3 mb-4 min-h-[180px]">
        @for (message of messages; track message.content + message.role) {
          <div [class]="message.role === 'assistant' ? 'bg-amber-50 text-gray-700' : 'bg-gray-50 text-gray-700'" class="rounded-lg p-3 text-sm leading-relaxed">
            <p class="text-[11px] font-semibold uppercase tracking-[0.25em] mb-1">{{ message.role === 'assistant' ? 'Assistant' : 'Vous' }}</p>
            <p class="whitespace-pre-wrap">{{ message.content }}</p>
          </div>
        }

        @if (loading) {
          <div class="rounded-lg bg-gray-50 p-3 text-sm text-gray-500">Réflexion en cours…</div>
        }
      </div>

      <div class="flex flex-wrap gap-2 mb-3">
        @for (suggestion of suggestions; track suggestion) {
          <button type="button" (click)="sendMessage(suggestion)" class="rounded-full border border-amber-200 bg-white px-3 py-1.5 text-sm text-amber-700 hover:bg-amber-50 transition-colors">
            {{ suggestion }}
          </button>
        }
      </div>

      <form class="flex flex-col sm:flex-row gap-2" (ngSubmit)="sendMessage()">
        <input
          [(ngModel)]="draft"
          name="draft"
          type="text"
          class="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
          [placeholder]="product ? 'Posez une question sur ' + product.nom : 'Demandez un conseil sur le catalogue'"
        />
        <button type="submit" [disabled]="loading" class="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-60">
          {{ loading ? 'Envoi…' : 'Envoyer' }}
        </button>
      </form>

      @if (error) {
        <p class="mt-3 text-sm text-red-600">{{ error }}</p>
      }
    </section>
  `,
})
export class AiAssistantComponent implements OnInit {
  @Input() title = 'Votre conseiller IA';
  @Input() subtitle = 'Obtenez des conseils instantanés sur les produits du catalogue.';
  @Input() product: Produit | null = null;

  messages: ChatMessage[] = [];
  draft = '';
  loading = false;
  error = '';

  constructor(private ai: AiAssistantService) {}

  ngOnInit(): void {
    this.resetConversation();
  }

  get suggestions(): string[] {
    if (this.product) {
      return [
        `Résume-moi ${this.product.nom}`,
        `Quelles sont les avantages de ${this.product.nom}?`,
        `Est-ce un bon cadeau ?`,
      ];
    }

    return [
      'Quel produit me conseillez-vous ?',
      'Aidez-moi à comparer deux produits',
      'Quel produit convient à un cadeau ?',
    ];
  }

  sendMessage(text?: string) {
    const prompt = (text ?? this.draft).trim();
    if (!prompt || this.loading) {
      return;
    }

    this.messages.push({ role: 'user', content: prompt });
    this.draft = '';
    this.error = '';
    this.loading = true;

    const fullPrompt = this.product
      ? `${prompt}\nContexte produit: ${this.product.nom}${this.product.description ? ` — ${this.product.description}` : ''}`
      : prompt;

    this.ai.ask(fullPrompt).subscribe({
      next: response => {
        this.messages.push({ role: 'assistant', content: response.data?.reply || 'Je n’ai pas de réponse à vous fournir pour le moment.' });
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        if (err?.status === 401) {
          this.error = 'Vous devez être connecté pour utiliser l’assistant IA.';
        } else if (err?.status === 502) {
          this.error = 'Le service IA est temporairement indisponible. Veuillez réessayer plus tard.';
        } else {
          this.error = 'Impossible de contacter l’assistant IA pour le moment.';
        }
      },
    });
  }

  private resetConversation() {
    this.messages = [
      {
        role: 'assistant',
        content: this.product
          ? `Je peux vous aider à mieux comprendre ${this.product.nom}.`
          : 'Je peux vous aider à choisir un produit ou à obtenir un résumé rapide.',
      },
    ];
  }
}
