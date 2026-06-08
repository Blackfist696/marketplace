import {
  ToastService
} from "./chunk-M6Z66CPB.js";
import {
  AuthService
} from "./chunk-QDW2YG4J.js";
import {
  CartService
} from "./chunk-PD2SCL3N.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-BTJFPSWE.js";
import {
  environment
} from "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  HttpResponse,
  inject,
  provideHttpClient,
  provideZoneChangeDetection,
  setClassMetadata,
  tap,
  withFetch,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-HBZS45XM.js";

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn())
    return true;
  return router.createUrlTree(["/login"]);
};

// src/app/core/guards/role.guard.ts
var roleGuard = (role) => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUser();
  if (!user)
    return router.createUrlTree(["/login"]);
  if (user.id_role === role || user.id_role === 1)
    return true;
  return router.createUrlTree(["/"]);
};

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "login", loadComponent: () => import("./chunk-EQTUPXG3.js").then((m) => m.LoginComponent) },
  { path: "register", loadComponent: () => import("./chunk-GERBNMBT.js").then((m) => m.RegisterComponent) },
  {
    path: "",
    loadComponent: () => import("./chunk-RQW2DIY4.js").then((m) => m.MainLayoutComponent),
    children: [
      { path: "home", loadComponent: () => import("./chunk-P6ZCOBQR.js").then((m) => m.HomeComponent) },
      { path: "catalogue", loadComponent: () => import("./chunk-WKZVQW4U.js").then((m) => m.CatalogueComponent) },
      { path: "produit/:id", loadComponent: () => import("./chunk-JWQDA2LA.js").then((m) => m.ProductDetailComponent) },
      { path: "panier", loadComponent: () => import("./chunk-KQHZNPMS.js").then((m) => m.CartComponent) },
      { path: "commande", loadComponent: () => import("./chunk-WF7F6M2L.js").then((m) => m.CheckoutComponent), canActivate: [authGuard] },
      { path: "boutique/:id", loadComponent: () => import("./chunk-EAD34RSV.js").then((m) => m.ArtisanShopComponent) }
    ]
  },
  {
    path: "artisan",
    loadComponent: () => import("./chunk-D3Z2D6T5.js").then((m) => m.ArtisanLayoutComponent),
    canActivate: [roleGuard(2)],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", loadComponent: () => import("./chunk-WSLBZTVM.js").then((m) => m.ArtisanDashboardComponent) },
      { path: "produits", loadComponent: () => import("./chunk-NICKHXCO.js").then((m) => m.ArtisanProductsComponent) },
      { path: "commandes", loadComponent: () => import("./chunk-UOUZAZTU.js").then((m) => m.ArtisanOrdersComponent) },
      { path: "stats", loadComponent: () => import("./chunk-UPFZJMCR.js").then((m) => m.ArtisanStatsComponent) }
    ]
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-L5MKRYZC.js").then((m) => m.AdminLayoutComponent),
    canActivate: [roleGuard(1)],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", loadComponent: () => import("./chunk-4BUP3HXQ.js").then((m) => m.AdminDashboardComponent) },
      { path: "artisans", loadComponent: () => import("./chunk-FLRMMIGN.js").then((m) => m.AdminArtisansComponent) },
      { path: "commandes", loadComponent: () => import("./chunk-4ZPUVG5Q.js").then((m) => m.AdminOrdersComponent) },
      { path: "produits", loadComponent: () => import("./chunk-XM33Q6AK.js").then((m) => m.AdminProductsComponent) }
    ]
  },
  { path: "**", loadComponent: () => import("./chunk-DGZNQVZQ.js").then((m) => m.NotFoundComponent) }
];

// src/app/core/interceptors/csrf.interceptor.ts
var mutatingMethods = /* @__PURE__ */ new Set(["POST", "PUT", "PATCH", "DELETE"]);
var csrfToken = null;
var csrfInterceptor = (req, next) => {
  const isApiCall = req.url.startsWith(environment.apiUrl);
  const isMutating = mutatingMethods.has(req.method.toUpperCase());
  let request = req;
  if (isApiCall && isMutating && req.withCredentials && csrfToken) {
    request = req.clone({
      setHeaders: {
        "X-CSRF-Token": csrfToken
      }
    });
  }
  return next(request).pipe(tap((event) => {
    if (event instanceof HttpResponse) {
      const nextToken = event.headers.get("X-CSRF-Token");
      if (nextToken) {
        csrfToken = nextToken;
      }
    }
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([csrfInterceptor]))
  ]
};

// src/app/shared/toast-container/toast-container.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ToastContainerComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 2);
    \u0275\u0275domListener("click", function ToastContainerComponent_For_2_Template_div_click_0_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toast.dismiss(t_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275classMap(t_r2.type);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2.message);
  }
}
var ToastContainerComponent = class _ToastContainerComponent {
  toast;
  constructor(toast) {
    this.toast = toast;
  }
  static \u0275fac = function ToastContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastContainerComponent)(\u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastContainerComponent, selectors: [["app-toast-container"]], decls: 3, vars: 0, consts: [[1, "toast-container"], [1, "toast", 3, "class"], [1, "toast", 3, "click"]], template: function ToastContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ToastContainerComponent_For_2_Template, 2, 3, "div", 1, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.toast.toasts());
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastContainerComponent, [{
    type: Component,
    args: [{
      selector: "app-toast-container",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="toast-container">
      @for (t of toast.toasts(); track t.id) {
        <div class="toast" [class]="t.type" (click)="toast.dismiss(t.id)">{{ t.message }}</div>
      }
    </div>
  `
    }]
  }], () => [{ type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastContainerComponent, { className: "ToastContainerComponent", filePath: "app/shared/toast-container/toast-container.component.ts", lineNumber: 17 });
})();

// src/app/app.ts
var App = class _App {
  auth;
  cart;
  constructor(auth, cart) {
    this.auth = auth;
    this.cart = cart;
  }
  ngOnInit() {
    this.auth.loadProfile().subscribe({
      next: () => {
        if (this.auth.isLoggedIn())
          this.cart.load().subscribe({ error: () => {
          } });
      },
      error: () => {
      }
    });
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(CartService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 2, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet")(1, "app-toast-container");
    }
  }, dependencies: [RouterOutlet, ToastContainerComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{
      selector: "app-root",
      standalone: true,
      imports: [RouterOutlet, ToastContainerComponent],
      template: `<router-outlet /><app-toast-container />`
    }]
  }], () => [{ type: AuthService }, { type: CartService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "app/app.ts", lineNumber: 13 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
