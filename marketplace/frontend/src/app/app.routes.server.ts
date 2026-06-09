import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'catalogue', renderMode: RenderMode.Prerender },
  { path: 'panier', renderMode: RenderMode.Server },
  { path: 'produit/:id', renderMode: RenderMode.Server },
  { path: 'boutique/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
