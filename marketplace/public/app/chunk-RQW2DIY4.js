import {
  AuthService
} from "./chunk-QDW2YG4J.js";
import {
  CartService
} from "./chunk-PD2SCL3N.js";
import {
  Router,
  RouterLink,
  RouterOutlet
} from "./chunk-BTJFPSWE.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/layouts/main-layout/main-layout.component.ts
function MainLayoutComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.cart.count(), " ");
  }
}
function MainLayoutComponent_Conditional_15_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 17);
    \u0275\u0275text(1, "Mon espace");
    \u0275\u0275elementEnd();
  }
}
function MainLayoutComponent_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 18);
    \u0275\u0275text(1, "Admin");
    \u0275\u0275elementEnd();
  }
}
function MainLayoutComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, MainLayoutComponent_Conditional_15_Conditional_0_Template, 2, 0, "a", 17);
    \u0275\u0275conditionalCreate(1, MainLayoutComponent_Conditional_15_Conditional_1_Template, 2, 0, "a", 18);
    \u0275\u0275elementStart(2, "button", 19);
    \u0275\u0275listener("click", function MainLayoutComponent_Conditional_15_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.logout());
    });
    \u0275\u0275text(3, "D\xE9connexion");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.auth.isArtisan() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.auth.isAdmin() ? 1 : -1);
  }
}
function MainLayoutComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12);
    \u0275\u0275text(1, " Connexion ");
    \u0275\u0275elementEnd();
  }
}
var MainLayoutComponent = class _MainLayoutComponent {
  auth;
  cart;
  router;
  constructor(auth, cart, router) {
    this.auth = auth;
    this.cart = cart;
    this.router = router;
  }
  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(["/home"]));
  }
  static \u0275fac = function MainLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MainLayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MainLayoutComponent, selectors: [["app-main-layout"]], decls: 25, vars: 2, consts: [[1, "sticky", "top-0", "z-50", "bg-white", "border-b", "border-gray-200", "shadow-sm"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8"], [1, "flex", "items-center", "justify-between", "h-16"], ["routerLink", "/home", 1, "font-serif", "text-xl", "font-bold", "text-amber-600"], [1, "hidden", "md:flex", "items-center", "gap-6", "text-sm"], ["routerLink", "/home", "routerLinkActive", "text-amber-600 font-medium", 1, "text-gray-600", "hover:text-gray-900"], ["routerLink", "/catalogue", "routerLinkActive", "text-amber-600 font-medium", 1, "text-gray-600", "hover:text-gray-900"], [1, "flex", "items-center", "gap-3"], ["routerLink", "/panier", 1, "relative", "text-gray-600", "hover:text-amber-600", "p-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"], [1, "absolute", "-top-1", "-right-1", "bg-amber-500", "text-white", "text-xs", "rounded-full", "w-4", "h-4", "flex", "items-center", "justify-center"], ["routerLink", "/login", 1, "text-sm", "bg-amber-500", "hover:bg-amber-600", "text-white", "px-4", "py-2", "rounded-lg", "transition-colors"], [1, "min-h-screen"], [1, "bg-gray-900", "text-gray-400", "py-10", "mt-16"], [1, "max-w-7xl", "mx-auto", "px-4", "text-center", "text-sm"], [1, "font-serif", "text-white", "text-lg", "mb-2"], ["routerLink", "/artisan/dashboard", 1, "text-sm", "text-gray-600", "hover:text-amber-600"], ["routerLink", "/admin/dashboard", 1, "text-sm", "text-gray-600", "hover:text-amber-600"], [1, "text-sm", "text-gray-500", "hover:text-red-500", 3, "click"]], template: function MainLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
      \u0275\u0275text(4, "\u{1F36F} Artizanat");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "nav", 4)(6, "a", 5);
      \u0275\u0275text(7, "Accueil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "a", 6);
      \u0275\u0275text(9, "Catalogue");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 7)(11, "a", 8);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(12, "svg", 9);
      \u0275\u0275element(13, "path", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, MainLayoutComponent_Conditional_14_Template, 2, 1, "span", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, MainLayoutComponent_Conditional_15_Template, 4, 2)(16, MainLayoutComponent_Conditional_16_Template, 2, 0, "a", 12);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(17, "main", 13);
      \u0275\u0275element(18, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "footer", 14)(20, "div", 15)(21, "p", 16);
      \u0275\u0275text(22, "Artizanat");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "p");
      \u0275\u0275text(24, "\xA9 2025 \u2014 Marketplace artisanal belge");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.cart.count() > 0 ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.auth.isLoggedIn() ? 15 : 16);
    }
  }, dependencies: [RouterOutlet, RouterLink, CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MainLayoutComponent, [{
    type: Component,
    args: [{
      selector: "app-main-layout",
      standalone: true,
      imports: [RouterOutlet, RouterLink, CommonModule],
      template: `
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/home" class="font-serif text-xl font-bold text-amber-600">\u{1F36F} Artizanat</a>

          <!-- Nav -->
          <nav class="hidden md:flex items-center gap-6 text-sm">
            <a routerLink="/home"      routerLinkActive="text-amber-600 font-medium" class="text-gray-600 hover:text-gray-900">Accueil</a>
            <a routerLink="/catalogue" routerLinkActive="text-amber-600 font-medium" class="text-gray-600 hover:text-gray-900">Catalogue</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Panier -->
            <a routerLink="/panier" class="relative text-gray-600 hover:text-amber-600 p-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"/>
              </svg>
              @if (cart.count() > 0) {
                <span class="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {{ cart.count() }}
                </span>
              }
            </a>

            @if (auth.isLoggedIn()) {
              <!-- Menu utilisateur -->
              @if (auth.isArtisan()) {
                <a routerLink="/artisan/dashboard" class="text-sm text-gray-600 hover:text-amber-600">Mon espace</a>
              }
              @if (auth.isAdmin()) {
                <a routerLink="/admin/dashboard" class="text-sm text-gray-600 hover:text-amber-600">Admin</a>
              }
              <button (click)="logout()" class="text-sm text-gray-500 hover:text-red-500">D\xE9connexion</button>
            } @else {
              <a routerLink="/login" class="text-sm bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
                Connexion
              </a>
            }
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="min-h-screen">
      <router-outlet />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-10 mt-16">
      <div class="max-w-7xl mx-auto px-4 text-center text-sm">
        <p class="font-serif text-white text-lg mb-2">Artizanat</p>
        <p>\xA9 2025 \u2014 Marketplace artisanal belge</p>
      </div>
    </footer>
  `
    }]
  }], () => [{ type: AuthService }, { type: CartService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MainLayoutComponent, { className: "MainLayoutComponent", filePath: "app/layouts/main-layout/main-layout.component.ts", lineNumber: 73 });
})();
export {
  MainLayoutComponent
};
//# sourceMappingURL=chunk-RQW2DIY4.js.map
