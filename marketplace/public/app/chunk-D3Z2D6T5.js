import {
  AuthService
} from "./chunk-QDW2YG4J.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-BTJFPSWE.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
} from "./chunk-HBZS45XM.js";

// src/app/layouts/artisan-layout/artisan-layout.component.ts
var ArtisanLayoutComponent = class _ArtisanLayoutComponent {
  auth;
  router;
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(["/home"]));
  }
  static \u0275fac = function ArtisanLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtisanLayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtisanLayoutComponent, selectors: [["app-artisan-layout"]], decls: 21, vars: 0, consts: [[1, "flex", "min-h-screen"], [1, "w-60", "flex-shrink-0", "flex", "flex-col", 2, "background", "var(--sidebar-bg)", "color", "var(--sidebar-foreground)"], [1, "px-6", "py-5", "border-b", 2, "border-color", "var(--sidebar-border)"], ["routerLink", "/home", 1, "font-serif", "text-lg", "font-bold", 2, "color", "var(--primary)"], [1, "text-xs", "mt-1", "opacity-60"], [1, "flex-1", "px-3", "py-4", "space-y-1"], ["routerLink", "/artisan/dashboard", "routerLinkActive", "sidebar-active", 1, "sidebar-link"], ["routerLink", "/artisan/produits", "routerLinkActive", "sidebar-active", 1, "sidebar-link"], ["routerLink", "/artisan/commandes", "routerLinkActive", "sidebar-active", 1, "sidebar-link"], ["routerLink", "/artisan/stats", "routerLinkActive", "sidebar-active", 1, "sidebar-link"], [1, "px-3", "py-4", "border-t", 2, "border-color", "var(--sidebar-border)"], [1, "sidebar-link", "w-full", "text-left", "text-red-400", "hover:text-red-300", 3, "click"], [1, "flex-1", "overflow-auto", "bg-gray-50"]], template: function ArtisanLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "a", 3);
      \u0275\u0275text(4, "\u{1F36F} Artizanat");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Espace Artisan");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "nav", 5)(8, "a", 6);
      \u0275\u0275text(9, " \u{1F4CA} Tableau de bord ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "a", 7);
      \u0275\u0275text(11, " \u{1F4E6} Mes produits ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "a", 8);
      \u0275\u0275text(13, " \u{1F6D2} Commandes ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "a", 9);
      \u0275\u0275text(15, " \u{1F4C8} Statistiques ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 10)(17, "button", 11);
      \u0275\u0275listener("click", function ArtisanLayoutComponent_Template_button_click_17_listener() {
        return ctx.logout();
      });
      \u0275\u0275text(18, " \u{1F6AA} D\xE9connexion ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "main", 12);
      \u0275\u0275element(20, "router-outlet");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule], styles: ["\n.sidebar-link[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0.5rem 0.75rem;\n  border-radius: 0.5rem;\n  font-size: 0.875rem;\n  transition: background 0.15s;\n  color: var(--sidebar-foreground);\n}\n.sidebar-link[_ngcontent-%COMP%]:hover {\n  background: var(--sidebar-accent);\n}\n.sidebar-active[_ngcontent-%COMP%] {\n  background: var(--sidebar-accent) !important;\n  color: var(--primary) !important;\n  font-weight: 600;\n}\n/*# sourceMappingURL=artisan-layout.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtisanLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-artisan-layout", standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule], template: `
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-60 flex-shrink-0 flex flex-col" style="background:var(--sidebar-bg);color:var(--sidebar-foreground)">
        <div class="px-6 py-5 border-b" style="border-color:var(--sidebar-border)">
          <a routerLink="/home" class="font-serif text-lg font-bold" style="color:var(--primary)">\u{1F36F} Artizanat</a>
          <p class="text-xs mt-1 opacity-60">Espace Artisan</p>
        </div>
        <nav class="flex-1 px-3 py-4 space-y-1">
          <a routerLink="/artisan/dashboard" routerLinkActive="sidebar-active" class="sidebar-link">
            \u{1F4CA} Tableau de bord
          </a>
          <a routerLink="/artisan/produits" routerLinkActive="sidebar-active" class="sidebar-link">
            \u{1F4E6} Mes produits
          </a>
          <a routerLink="/artisan/commandes" routerLinkActive="sidebar-active" class="sidebar-link">
            \u{1F6D2} Commandes
          </a>
          <a routerLink="/artisan/stats" routerLinkActive="sidebar-active" class="sidebar-link">
            \u{1F4C8} Statistiques
          </a>
        </nav>
        <div class="px-3 py-4 border-t" style="border-color:var(--sidebar-border)">
          <button (click)="logout()" class="sidebar-link w-full text-left text-red-400 hover:text-red-300">
            \u{1F6AA} D\xE9connexion
          </button>
        </div>
      </aside>

      <!-- Content -->
      <main class="flex-1 overflow-auto bg-gray-50">
        <router-outlet />
      </main>
    </div>
  `, styles: ["/* angular:styles/component:scss;f63e11d91581e2e9d9fe5fbdf08497f6f7d25fca0586759c216ebcb57c354de6;C:/laragon/www/project02/marketplace/frontend/src/app/layouts/artisan-layout/artisan-layout.component.ts */\n.sidebar-link {\n  display: block;\n  padding: 0.5rem 0.75rem;\n  border-radius: 0.5rem;\n  font-size: 0.875rem;\n  transition: background 0.15s;\n  color: var(--sidebar-foreground);\n}\n.sidebar-link:hover {\n  background: var(--sidebar-accent);\n}\n.sidebar-active {\n  background: var(--sidebar-accent) !important;\n  color: var(--primary) !important;\n  font-weight: 600;\n}\n/*# sourceMappingURL=artisan-layout.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtisanLayoutComponent, { className: "ArtisanLayoutComponent", filePath: "app/layouts/artisan-layout/artisan-layout.component.ts", lineNumber: 55 });
})();
export {
  ArtisanLayoutComponent
};
//# sourceMappingURL=chunk-D3Z2D6T5.js.map
