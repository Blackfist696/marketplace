import {
  KpiCardComponent
} from "./chunk-HAMYNNVJ.js";
import {
  OrderService
} from "./chunk-G5RZROR4.js";
import {
  STATUT_LABELS
} from "./chunk-EFSXKDVI.js";
import {
  ProductService
} from "./chunk-NRTGAO5M.js";
import {
  getProductImageSrc
} from "./chunk-BW22KM5Y.js";
import {
  RouterLink
} from "./chunk-BTJFPSWE.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/pages/artisan/dashboard/artisan-dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.id_commande;
var _forTrack1 = ($index, $item) => $item.id_produit;
function ArtisanDashboardComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div")(2, "p", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 18);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 19)(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 21);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r1.reference);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 6, o_r1.date_commande, "dd/MM/yyyy"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(10, 9, o_r1.total_ttc, "1.2-2"), " \u20AC");
    \u0275\u0275advance(2);
    \u0275\u0275classMap("badge-" + o_r1.statut);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statutLabel(o_r1.statut));
  }
}
function ArtisanDashboardComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "Aucune commande");
    \u0275\u0275elementEnd();
  }
}
function ArtisanDashboardComponent_For_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 23);
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.getProductImageSrc(p_r3.image_principale), \u0275\u0275sanitizeUrl)("alt", p_r3.nom);
  }
}
function ArtisanDashboardComponent_For_24_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4E6} ");
  }
}
function ArtisanDashboardComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 22);
    \u0275\u0275conditionalCreate(2, ArtisanDashboardComponent_For_24_Conditional_2_Template, 1, 2, "img", 23)(3, ArtisanDashboardComponent_For_24_Conditional_3_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 24)(5, "p", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 26)(8, "div", 27);
    \u0275\u0275element(9, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 29);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r3.image_principale ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r3.nom);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r1.stockPercent(p_r3), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r3.stock, " en stock");
  }
}
var ArtisanDashboardComponent = class _ArtisanDashboardComponent {
  productSvc;
  orderSvc;
  getProductImageSrc = getProductImageSrc;
  produits = signal([], ...ngDevMode ? [{ debugName: "produits" }] : (
    /* istanbul ignore next */
    []
  ));
  orders = signal([], ...ngDevMode ? [{ debugName: "orders" }] : (
    /* istanbul ignore next */
    []
  ));
  activeCount = signal(0, ...ngDevMode ? [{ debugName: "activeCount" }] : (
    /* istanbul ignore next */
    []
  ));
  totalStock = signal(0, ...ngDevMode ? [{ debugName: "totalStock" }] : (
    /* istanbul ignore next */
    []
  ));
  caEstime = signal("0.00", ...ngDevMode ? [{ debugName: "caEstime" }] : (
    /* istanbul ignore next */
    []
  ));
  topProduits = signal([], ...ngDevMode ? [{ debugName: "topProduits" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(productSvc, orderSvc) {
    this.productSvc = productSvc;
    this.orderSvc = orderSvc;
  }
  ngOnInit() {
    this.productSvc.getMyProducts().subscribe((ps) => {
      this.produits.set(ps);
      this.activeCount.set(ps.filter((p) => p.actif).length);
      this.totalStock.set(ps.reduce((s, p) => s + p.stock, 0));
      this.topProduits.set([...ps].sort((a, b) => b.stock - a.stock).slice(0, 4));
    });
    this.orderSvc.getArtisanOrders().subscribe((os) => {
      this.orders.set(os);
      const ca = os.reduce((s, o) => s + o.total_ttc, 0);
      this.caEstime.set(ca.toFixed(2));
    });
  }
  statutLabel(s) {
    return STATUT_LABELS[s] ?? s;
  }
  stockPercent(p) {
    const max = Math.max(...this.produits().map((x) => x.stock), 1);
    return Math.round(p.stock / max * 100);
  }
  static \u0275fac = function ArtisanDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtisanDashboardComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(OrderService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtisanDashboardComponent, selectors: [["app-artisan-dashboard"]], decls: 25, vars: 5, consts: [[1, "p-6", "md:p-8", "max-w-6xl"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4", "mb-8"], ["title", "Commandes", 3, "value"], ["title", "Produits actifs", 3, "value"], ["title", "Stock total", 3, "value"], ["title", "CA estim\xE9", "trend", "up", "trendValue", "+15%", 3, "value"], [1, "grid", "lg:grid-cols-2", "gap-6"], [1, "card", "p-6"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "font-semibold"], ["routerLink", "/artisan/commandes", 1, "text-sm", "text-amber-600", "hover:underline"], [1, "space-y-3"], [1, "flex", "items-center", "justify-between", "text-sm", "py-2", "border-b", "last:border-0"], [1, "text-gray-500", "text-sm"], [1, "font-semibold", "mb-4"], [1, "flex", "items-center", "gap-3"], [1, "font-mono", "text-xs", "font-medium"], [1, "text-gray-500", "text-xs"], [1, "flex", "items-center", "gap-2"], [1, "font-medium"], [1, "text-xs", "px-2", "py-0.5", "rounded-full"], [1, "w-10", "h-10", "rounded-lg", "bg-gray-100", "overflow-hidden", "shrink-0", "flex", "items-center", "justify-center", "text-gray-300"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", "truncate"], [1, "flex", "items-center", "gap-2", "mt-1"], [1, "flex-1", "h-1.5", "bg-gray-100", "rounded-full", "overflow-hidden"], [1, "h-full", "bg-amber-500", "rounded-full"], [1, "text-xs", "text-gray-500", "shrink-0"]], template: function ArtisanDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Tableau de bord");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275element(4, "app-kpi-card", 3)(5, "app-kpi-card", 4)(6, "app-kpi-card", 5)(7, "app-kpi-card", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "h2", 10);
      \u0275\u0275text(12, "Derni\xE8res commandes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 11);
      \u0275\u0275text(14, "Voir tout");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 12);
      \u0275\u0275repeaterCreate(16, ArtisanDashboardComponent_For_17_Template, 13, 12, "div", 13, _forTrack0);
      \u0275\u0275conditionalCreate(18, ArtisanDashboardComponent_Conditional_18_Template, 2, 0, "p", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 8)(20, "h2", 15);
      \u0275\u0275text(21, "Mes produits (top stock)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 12);
      \u0275\u0275repeaterCreate(23, ArtisanDashboardComponent_For_24_Template, 12, 5, "div", 16, _forTrack1);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.orders().length);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.activeCount() + "/" + ctx.produits().length);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.totalStock());
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.caEstime() + " \u20AC");
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.orders().slice(0, 4));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.orders().length === 0 ? 18 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.topProduits());
    }
  }, dependencies: [CommonModule, RouterLink, KpiCardComponent, DecimalPipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtisanDashboardComponent, [{
    type: Component,
    args: [{
      selector: "app-artisan-dashboard",
      standalone: true,
      imports: [CommonModule, RouterLink, KpiCardComponent],
      template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Tableau de bord</h1>

      <!-- KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <app-kpi-card title="Commandes" [value]="orders().length" />
        <app-kpi-card title="Produits actifs" [value]="activeCount() + '/' + produits().length" />
        <app-kpi-card title="Stock total" [value]="totalStock()" />
        <app-kpi-card title="CA estim\xE9" [value]="caEstime() + ' \u20AC'" trend="up" trendValue="+15%" />
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Derni\xE8res commandes -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold">Derni\xE8res commandes</h2>
            <a routerLink="/artisan/commandes" class="text-sm text-amber-600 hover:underline">Voir tout</a>
          </div>
          <div class="space-y-3">
            @for (o of orders().slice(0,4); track o.id_commande) {
              <div class="flex items-center justify-between text-sm py-2 border-b last:border-0">
                <div>
                  <p class="font-mono text-xs font-medium">{{ o.reference }}</p>
                  <p class="text-gray-500 text-xs">{{ o.date_commande | date:'dd/MM/yyyy' }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ o.total_ttc | number:'1.2-2' }} \u20AC</span>
                  <span class="text-xs px-2 py-0.5 rounded-full" [class]="'badge-' + o.statut">{{ statutLabel(o.statut) }}</span>
                </div>
              </div>
            }
            @if (orders().length === 0) { <p class="text-gray-500 text-sm">Aucune commande</p> }
          </div>
        </div>

        <!-- Top produits -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Mes produits (top stock)</h2>
          <div class="space-y-3">
            @for (p of topProduits(); track p.id_produit) {
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center text-gray-300">
                  @if (p.image_principale) { <img [src]="getProductImageSrc(p.image_principale)" [alt]="p.nom" class="w-full h-full object-cover" /> }
                  @else { \u{1F4E6} }
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ p.nom }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-amber-500 rounded-full" [style.width.%]="stockPercent(p)"></div>
                    </div>
                    <span class="text-xs text-gray-500 shrink-0">{{ p.stock }} en stock</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
    }]
  }], () => [{ type: ProductService }, { type: OrderService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtisanDashboardComponent, { className: "ArtisanDashboardComponent", filePath: "app/pages/artisan/dashboard/artisan-dashboard.component.ts", lineNumber: 78 });
})();
export {
  ArtisanDashboardComponent
};
//# sourceMappingURL=chunk-WSLBZTVM.js.map
