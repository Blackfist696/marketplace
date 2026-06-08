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
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/pages/artisan/stats/artisan-stats.component.ts
var _forTrack0 = ($index, $item) => $item.id_produit;
var _forTrack1 = ($index, $item) => $item.statut;
var _forTrack2 = ($index, $item) => $item.id_commande;
function ArtisanStatsComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "p", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 22)(7, "div", 23);
    \u0275\u0275element(8, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 25);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const \u0275$index_25_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_25_r2 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r1.nom);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r2.stockPct(p_r1), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r1.stock);
  }
}
function ArtisanStatsComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27)(4, "div", 28);
    \u0275\u0275element(5, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 29);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r4.label);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", s_r4.pct, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r4.count);
  }
}
function ArtisanStatsComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 18)(1, "td", 30);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 32);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 33)(10, "span", 34);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 6, o_r5.date_commande, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r5.reference);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 9, o_r5.total_ttc, "1.2-2"), " \u20AC");
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge-" + o_r5.statut);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.statutLabel(o_r5.statut));
  }
}
var ArtisanStatsComponent = class _ArtisanStatsComponent {
  productSvc;
  orderSvc;
  produits = signal([], ...ngDevMode ? [{ debugName: "produits" }] : (
    /* istanbul ignore next */
    []
  ));
  orders = signal([], ...ngDevMode ? [{ debugName: "orders" }] : (
    /* istanbul ignore next */
    []
  ));
  topProduits = signal([], ...ngDevMode ? [{ debugName: "topProduits" }] : (
    /* istanbul ignore next */
    []
  ));
  totalRevenue = signal("0.00", ...ngDevMode ? [{ debugName: "totalRevenue" }] : (
    /* istanbul ignore next */
    []
  ));
  avgBasket = signal("0.00", ...ngDevMode ? [{ debugName: "avgBasket" }] : (
    /* istanbul ignore next */
    []
  ));
  statutStats = signal([], ...ngDevMode ? [{ debugName: "statutStats" }] : (
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
      this.topProduits.set([...ps].sort((a, b) => b.stock - a.stock).slice(0, 5));
    });
    this.orderSvc.getArtisanOrders().subscribe((os) => {
      this.orders.set(os);
      const total = os.reduce((s, o) => s + o.total_ttc, 0);
      this.totalRevenue.set(total.toFixed(2));
      this.avgBasket.set(os.length ? (total / os.length).toFixed(2) : "0.00");
      const counts = {};
      os.forEach((o) => {
        counts[o.statut] = (counts[o.statut] ?? 0) + 1;
      });
      this.statutStats.set(Object.entries(STATUT_LABELS).map(([statut, label]) => ({
        statut,
        label,
        count: counts[statut] ?? 0,
        pct: os.length ? Math.round((counts[statut] ?? 0) / os.length * 100) : 0
      })));
    });
  }
  stockPct(p) {
    const max = Math.max(...this.produits().map((x) => x.stock), 1);
    return Math.round(p.stock / max * 100);
  }
  statutLabel(s) {
    return STATUT_LABELS[s] ?? s;
  }
  static \u0275fac = function ArtisanStatsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtisanStatsComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(OrderService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtisanStatsComponent, selectors: [["app-artisan-stats"]], decls: 39, vars: 4, consts: [[1, "p-6", "md:p-8", "max-w-6xl"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4", "mb-8"], ["title", "CA Total", "trend", "up", "trendValue", "+15%", 3, "value"], ["title", "Commandes", 3, "value"], ["title", "Panier moyen", 3, "value"], ["title", "Produits", 3, "value"], [1, "grid", "lg:grid-cols-2", "gap-6", "mb-8"], [1, "card", "p-6"], [1, "font-semibold", "mb-4"], [1, "space-y-3"], [1, "flex", "items-center", "gap-3"], [1, "space-y-2"], [1, "flex", "items-center", "justify-between", "text-sm"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "border-b"], [1, "text-left", "pb-3", "font-medium", "text-gray-500"], [1, "border-b", "last:border-0"], [1, "text-xs", "font-bold", "text-gray-400", "w-5"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", "truncate"], [1, "flex", "items-center", "gap-2", "mt-1"], [1, "flex-1", "h-1.5", "bg-gray-100", "rounded-full", "overflow-hidden"], [1, "h-full", "bg-amber-500", "rounded-full"], [1, "text-xs", "text-gray-500"], [1, "text-gray-600"], [1, "flex", "items-center", "gap-2"], [1, "w-24", "h-2", "bg-gray-100", "rounded-full", "overflow-hidden"], [1, "text-xs", "text-gray-500", "w-4"], [1, "py-3", "text-gray-500"], [1, "py-3", "font-mono", "text-xs"], [1, "py-3", "font-medium"], [1, "py-3"], [1, "text-xs", "px-2", "py-0.5", "rounded-full"]], template: function ArtisanStatsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Mes statistiques");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275element(4, "app-kpi-card", 3)(5, "app-kpi-card", 4)(6, "app-kpi-card", 5)(7, "app-kpi-card", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "h2", 9);
      \u0275\u0275text(11, "Top produits (stock)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 10);
      \u0275\u0275repeaterCreate(13, ArtisanStatsComponent_For_14_Template, 11, 5, "div", 11, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 8)(16, "h2", 9);
      \u0275\u0275text(17, "R\xE9partition des commandes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 12);
      \u0275\u0275repeaterCreate(19, ArtisanStatsComponent_For_20_Template, 8, 4, "div", 13, _forTrack1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 8)(22, "h2", 9);
      \u0275\u0275text(23, "Historique des ventes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 14)(25, "table", 15)(26, "thead")(27, "tr", 16)(28, "th", 17);
      \u0275\u0275text(29, "Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "th", 17);
      \u0275\u0275text(31, "R\xE9f\xE9rence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "th", 17);
      \u0275\u0275text(33, "Montant");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "th", 17);
      \u0275\u0275text(35, "Statut");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "tbody");
      \u0275\u0275repeaterCreate(37, ArtisanStatsComponent_For_38_Template, 12, 12, "tr", 18, _forTrack2);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.totalRevenue() + " \u20AC");
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.orders().length);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.avgBasket() + " \u20AC");
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.produits().length);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.topProduits());
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.statutStats());
      \u0275\u0275advance(18);
      \u0275\u0275repeater(ctx.orders().slice(0, 10));
    }
  }, dependencies: [CommonModule, KpiCardComponent, DecimalPipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtisanStatsComponent, [{
    type: Component,
    args: [{
      selector: "app-artisan-stats",
      standalone: true,
      imports: [CommonModule, KpiCardComponent],
      template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Mes statistiques</h1>

      <!-- KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <app-kpi-card title="CA Total" [value]="totalRevenue() + ' \u20AC'" trend="up" trendValue="+15%" />
        <app-kpi-card title="Commandes" [value]="orders().length" />
        <app-kpi-card title="Panier moyen" [value]="avgBasket() + ' \u20AC'" />
        <app-kpi-card title="Produits" [value]="produits().length" />
      </div>

      <div class="grid lg:grid-cols-2 gap-6 mb-8">
        <!-- Top produits -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Top produits (stock)</h2>
          <div class="space-y-3">
            @for (p of topProduits(); track p.id_produit; let i = $index) {
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold text-gray-400 w-5">{{ i+1 }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ p.nom }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-amber-500 rounded-full" [style.width.%]="stockPct(p)"></div>
                    </div>
                    <span class="text-xs text-gray-500">{{ p.stock }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- R\xE9partition statuts -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">R\xE9partition des commandes</h2>
          <div class="space-y-2">
            @for (s of statutStats(); track s.statut) {
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">{{ s.label }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-amber-500 rounded-full" [style.width.%]="s.pct"></div>
                  </div>
                  <span class="text-xs text-gray-500 w-4">{{ s.count }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Historique commandes -->
      <div class="card p-6">
        <h2 class="font-semibold mb-4">Historique des ventes</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left pb-3 font-medium text-gray-500">Date</th>
                <th class="text-left pb-3 font-medium text-gray-500">R\xE9f\xE9rence</th>
                <th class="text-left pb-3 font-medium text-gray-500">Montant</th>
                <th class="text-left pb-3 font-medium text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              @for (o of orders().slice(0,10); track o.id_commande) {
                <tr class="border-b last:border-0">
                  <td class="py-3 text-gray-500">{{ o.date_commande | date:'dd/MM/yyyy' }}</td>
                  <td class="py-3 font-mono text-xs">{{ o.reference }}</td>
                  <td class="py-3 font-medium">{{ o.total_ttc | number:'1.2-2' }} \u20AC</td>
                  <td class="py-3"><span class="text-xs px-2 py-0.5 rounded-full" [class]="'badge-' + o.statut">{{ statutLabel(o.statut) }}</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
    }]
  }], () => [{ type: ProductService }, { type: OrderService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtisanStatsComponent, { className: "ArtisanStatsComponent", filePath: "app/pages/artisan/stats/artisan-stats.component.ts", lineNumber: 94 });
})();
export {
  ArtisanStatsComponent
};
//# sourceMappingURL=chunk-UPFZJMCR.js.map
