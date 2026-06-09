import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { ToastContainerComponent } from './shared/toast-container/toast-container.component';

export function buildCanonicalUrl(pathname: string, origin: string | null | undefined): string {
  const siteBasePath = '/project02/public/app';
  const normalizedPath = pathname && pathname !== '/' ? pathname : '/home';
  const pathWithoutBase = normalizedPath.startsWith(siteBasePath)
    ? normalizedPath.slice(siteBasePath.length)
    : normalizedPath;
  const cleanPath = pathWithoutBase === '' || pathWithoutBase === '/' ? '/home' : pathWithoutBase;
  const trimmedOrigin = origin?.trim();
  const isLocalOrigin = (() => {
    if (!trimmedOrigin) return true;

    try {
      return ['localhost', '127.0.0.1', '0.0.0.0'].includes(new URL(trimmedOrigin).hostname);
    } catch {
      return false;
    }
  })();
  const baseOrigin = isLocalOrigin ? 'https://bacinfo.eci-liege.info' : (trimmedOrigin || 'https://bacinfo.eci-liege.info');

  return `${baseOrigin}${siteBasePath}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent],
  template: `<router-outlet /><app-toast-container />`,
})
export class App implements OnInit {
  constructor(
    private auth: AuthService,
    private cart: CartService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe((event) => {
      this.applySeoFromRoute(event.urlAfterRedirects);
    });

    this.applySeoFromRoute(this.document.location.pathname);

    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.auth.loadProfile().subscribe({
      next: () => { if (this.auth.isLoggedIn()) this.cart.load().subscribe({ error: () => {} }); },
      error: () => {},
    });
  }

  private applySeoFromRoute(url: string): void {
    const routeData = this.getRouteData(this.router.routerState.snapshot.root);
    const siteName = 'Marketplace';
    const defaultDescription = 'Découvrez des produits artisanaux et gérez votre boutique en ligne avec une expérience d’achat moderne.';
    const title = routeData.title ? `${routeData.title} | ${siteName}` : siteName;
    const description = routeData.description || defaultDescription;
    const absoluteUrl = buildCanonicalUrl(url, this.document.location.origin);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
    this.meta.updateTag({ name: 'keywords', content: routeData.keywords || 'marketplace, artisanat, e-commerce, produits faits main' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: absoluteUrl });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    this.setCanonicalUrl(absoluteUrl);
  }

  private getRouteData(route: ActivatedRouteSnapshot): { title?: string; description?: string; keywords?: string } {
    let currentRoute = route;
    let data: Record<string, unknown> = {};

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      data = { ...data, ...currentRoute.data };
    }

    return data as { title?: string; description?: string; keywords?: string };
  }

  private setCanonicalUrl(canonicalUrl: string): void {
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }
}
