import {
  KpiCardComponent
} from "./chunk-HAMYNNVJ.js";
import {
  OrderService
} from "./chunk-G5RZROR4.js";
import {
  ArtisanService
} from "./chunk-AZ4XTC6P.js";
import {
  STATUT_LABELS
} from "./chunk-EFSXKDVI.js";
import {
  AvisService
} from "./chunk-ER7DDSLU.js";
import {
  ToastService
} from "./chunk-M6Z66CPB.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/pages/admin/dashboard/admin-dashboard.component.ts
var _c0 = () => [1, 2, 3, 4, 5];
var _forTrack0 = ($index, $item) => $item.id_commande;
var _forTrack1 = ($index, $item) => $item.id_avis;
var _forTrack2 = ($index, $item) => $item.id_artisan;
function AdminDashboardComponent_Conditional_8_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 23)(1, "td", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 26)(6, "button", 27);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_8_For_15_Template_button_click_6_listener() {
      const a_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.valider(a_r2, true));
    });
    \u0275\u0275text(7, "\u2713 Valider");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 28);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_8_For_15_Template_button_click_8_listener() {
      const a_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.valider(a_r2, false));
    });
    \u0275\u0275text(9, "\u2717 Refuser");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r2.nom_boutique);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r2.numero_tva || "\u2014");
  }
}
function AdminDashboardComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "table", 18)(5, "thead")(6, "tr", 19)(7, "th", 20);
    \u0275\u0275text(8, "Boutique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 21);
    \u0275\u0275text(10, "N\xB0 TVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 22);
    \u0275\u0275text(12, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, AdminDashboardComponent_Conditional_8_For_15_Template, 10, 2, "tr", 23, _forTrack2);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx_r2.pendingArtisans().length, " artisan(s) en attente de validation");
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r2.pendingArtisans());
  }
}
function AdminDashboardComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div")(2, "p", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 30)(5, "span", 31);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 32);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r4.reference);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(7, 5, o_r4.total_ttc, "1.2-2"), " \u20AC");
    \u0275\u0275advance(2);
    \u0275\u0275classMap("badge-" + o_r4.statut);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.statutLabel(o_r4.statut));
  }
}
function AdminDashboardComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Aucune commande");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_For_22_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r6 = ctx.$implicit;
    const av_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(i_r6 <= av_r7.note ? "text-amber-500" : "text-gray-200");
  }
}
function AdminDashboardComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 33);
    \u0275\u0275repeaterCreate(2, AdminDashboardComponent_For_22_For_3_Template, 2, 2, "span", 34, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 36)(7, "button", 37);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_22_Template_button_click_7_listener() {
      const av_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.modererAvis(av_r7, "approved"));
    });
    \u0275\u0275text(8, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 38);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_22_Template_button_click_9_listener() {
      const av_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.modererAvis(av_r7, "rejected"));
    });
    \u0275\u0275text(10, "\u2717");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const av_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(av_r7.commentaire);
  }
}
function AdminDashboardComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Aucun avis en attente");
    \u0275\u0275elementEnd();
  }
}
var AdminDashboardComponent = class _AdminDashboardComponent {
  artisanSvc;
  orderSvc;
  avisSvc;
  toast;
  artisans = signal([], ...ngDevMode ? [{ debugName: "artisans" }] : (
    /* istanbul ignore next */
    []
  ));
  orders = signal([], ...ngDevMode ? [{ debugName: "orders" }] : (
    /* istanbul ignore next */
    []
  ));
  pendingAvis = signal([], ...ngDevMode ? [{ debugName: "pendingAvis" }] : (
    /* istanbul ignore next */
    []
  ));
  pendingArtisans = signal([], ...ngDevMode ? [{ debugName: "pendingArtisans" }] : (
    /* istanbul ignore next */
    []
  ));
  activeArtisans = signal(0, ...ngDevMode ? [{ debugName: "activeArtisans" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(artisanSvc, orderSvc, avisSvc, toast) {
    this.artisanSvc = artisanSvc;
    this.orderSvc = orderSvc;
    this.avisSvc = avisSvc;
    this.toast = toast;
  }
  ngOnInit() {
    this.artisanSvc.adminGetAll().subscribe((as) => {
      this.artisans.set(as);
      this.pendingArtisans.set(as.filter((a) => !a.valide));
      this.activeArtisans.set(as.filter((a) => a.valide).length);
    });
    this.orderSvc.getAdminOrders().subscribe((os) => this.orders.set(os));
    this.avisSvc.getAll().subscribe((av) => this.pendingAvis.set(av.filter((a) => a.statut === "pending")));
  }
  valider(a, activer) {
    this.artisanSvc.adminUpdate(a.id_artisan, { valide: activer ? 1 : 0 }).subscribe({
      next: () => {
        this.ngOnInit();
        this.toast.success(activer ? "Artisan valid\xE9" : "Artisan refus\xE9");
      },
      error: () => this.toast.error("Erreur")
    });
  }
  modererAvis(av, statut) {
    this.avisSvc.update(av.id_avis, { statut }).subscribe({
      next: () => {
        this.pendingAvis.update((list) => list.filter((x) => x.id_avis !== av.id_avis));
        this.toast.success("Avis mod\xE9r\xE9");
      },
      error: () => this.toast.error("Erreur")
    });
  }
  statutLabel(s) {
    return STATUT_LABELS[s] ?? s;
  }
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)(\u0275\u0275directiveInject(ArtisanService), \u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(AvisService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 24, vars: 7, consts: [[1, "p-6", "md:p-8", "max-w-6xl"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4", "mb-8"], ["title", "Artisans actifs", 3, "value"], ["title", "En attente", 3, "value"], ["title", "Commandes", 3, "value"], ["title", "Avis \xE0 mod\xE9rer", 3, "value"], [1, "bg-orange-50", "border", "border-orange-200", "rounded-2xl", "p-6", "mb-8"], [1, "grid", "lg:grid-cols-2", "gap-6", "mb-8"], [1, "card", "p-6"], [1, "font-semibold", "mb-4"], [1, "space-y-2"], [1, "flex", "items-center", "justify-between", "text-sm", "py-2", "border-b", "last:border-0"], [1, "text-gray-500", "text-sm"], [1, "space-y-3"], [1, "border", "rounded-xl", "p-3"], [1, "font-semibold", "text-orange-800", "mb-4"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "border-b", "border-orange-200"], [1, "text-left", "pb-2", "font-medium", "text-orange-700"], [1, "text-left", "pb-2", "font-medium", "text-orange-700", "hidden", "sm:table-cell"], [1, "text-right", "pb-2", "font-medium", "text-orange-700"], [1, "border-b", "border-orange-100", "last:border-0"], [1, "py-2", "font-medium"], [1, "py-2", "text-orange-700/70", "hidden", "sm:table-cell", "font-mono", "text-xs"], [1, "py-2", "text-right"], [1, "bg-green-600", "hover:bg-green-700", "text-white", "text-xs", "px-3", "py-1", "rounded-lg", "mr-1", 3, "click"], [1, "bg-red-500", "hover:bg-red-600", "text-white", "text-xs", "px-3", "py-1", "rounded-lg", 3, "click"], [1, "font-mono", "text-xs", "font-medium"], [1, "flex", "items-center", "gap-2"], [1, "font-medium"], [1, "text-xs", "px-2", "py-0.5", "rounded-full"], [1, "flex", "gap-0.5", "mb-1"], [1, "text-xs", 3, "class"], [1, "text-xs", "text-gray-600", "line-clamp-2", "mb-2"], [1, "flex", "gap-2"], [1, "bg-green-600", "hover:bg-green-700", "text-white", "text-xs", "px-2", "py-1", "rounded-lg", 3, "click"], [1, "bg-red-500", "hover:bg-red-600", "text-white", "text-xs", "px-2", "py-1", "rounded-lg", 3, "click"], [1, "text-xs"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Tableau de bord Administration");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275element(4, "app-kpi-card", 3)(5, "app-kpi-card", 4)(6, "app-kpi-card", 5)(7, "app-kpi-card", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, AdminDashboardComponent_Conditional_8_Template, 16, 1, "div", 7);
      \u0275\u0275elementStart(9, "div", 8)(10, "div", 9)(11, "h2", 10);
      \u0275\u0275text(12, "Derni\xE8res commandes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 11);
      \u0275\u0275repeaterCreate(14, AdminDashboardComponent_For_15_Template, 10, 8, "div", 12, _forTrack0);
      \u0275\u0275conditionalCreate(16, AdminDashboardComponent_Conditional_16_Template, 2, 0, "p", 13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9)(18, "h2", 10);
      \u0275\u0275text(19, "Avis \xE0 mod\xE9rer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 14);
      \u0275\u0275repeaterCreate(21, AdminDashboardComponent_For_22_Template, 11, 2, "div", 15, _forTrack1);
      \u0275\u0275conditionalCreate(23, AdminDashboardComponent_Conditional_23_Template, 2, 0, "p", 13);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.activeArtisans());
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.pendingArtisans().length);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.orders().length);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.pendingAvis().length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.pendingArtisans().length > 0 ? 8 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.orders().slice(0, 5));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.orders().length === 0 ? 16 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.pendingAvis().slice(0, 4));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.pendingAvis().length === 0 ? 23 : -1);
    }
  }, dependencies: [CommonModule, KpiCardComponent, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardComponent, [{
    type: Component,
    args: [{
      selector: "app-admin-dashboard",
      standalone: true,
      imports: [CommonModule, KpiCardComponent],
      template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Tableau de bord Administration</h1>

      <!-- KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <app-kpi-card title="Artisans actifs"   [value]="activeArtisans()" />
        <app-kpi-card title="En attente"         [value]="pendingArtisans().length" />
        <app-kpi-card title="Commandes"          [value]="orders().length" />
        <app-kpi-card title="Avis \xE0 mod\xE9rer"     [value]="pendingAvis().length" />
      </div>

      <!-- Artisans en attente -->
      @if (pendingArtisans().length > 0) {
        <div class="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <h2 class="font-semibold text-orange-800 mb-4">\u26A0\uFE0F {{ pendingArtisans().length }} artisan(s) en attente de validation</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="border-b border-orange-200">
                <th class="text-left pb-2 font-medium text-orange-700">Boutique</th>
                <th class="text-left pb-2 font-medium text-orange-700 hidden sm:table-cell">N\xB0 TVA</th>
                <th class="text-right pb-2 font-medium text-orange-700">Actions</th>
              </tr></thead>
              <tbody>
                @for (a of pendingArtisans(); track a.id_artisan) {
                  <tr class="border-b border-orange-100 last:border-0">
                    <td class="py-2 font-medium">{{ a.nom_boutique }}</td>
                    <td class="py-2 text-orange-700/70 hidden sm:table-cell font-mono text-xs">{{ a.numero_tva || '\u2014' }}</td>
                    <td class="py-2 text-right">
                      <button (click)="valider(a, true)"  class="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg mr-1">\u2713 Valider</button>
                      <button (click)="valider(a, false)" class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg">\u2717 Refuser</button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <div class="grid lg:grid-cols-2 gap-6 mb-8">
        <!-- Derni\xE8res commandes -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Derni\xE8res commandes</h2>
          <div class="space-y-2">
            @for (o of orders().slice(0,5); track o.id_commande) {
              <div class="flex items-center justify-between text-sm py-2 border-b last:border-0">
                <div><p class="font-mono text-xs font-medium">{{ o.reference }}</p></div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ o.total_ttc | number:'1.2-2' }} \u20AC</span>
                  <span class="text-xs px-2 py-0.5 rounded-full" [class]="'badge-' + o.statut">{{ statutLabel(o.statut) }}</span>
                </div>
              </div>
            }
            @if (orders().length === 0) { <p class="text-gray-500 text-sm">Aucune commande</p> }
          </div>
        </div>

        <!-- Avis \xE0 mod\xE9rer -->
        <div class="card p-6">
          <h2 class="font-semibold mb-4">Avis \xE0 mod\xE9rer</h2>
          <div class="space-y-3">
            @for (av of pendingAvis().slice(0,4); track av.id_avis) {
              <div class="border rounded-xl p-3">
                <div class="flex gap-0.5 mb-1">
                  @for (i of [1,2,3,4,5]; track i) {
                    <span [class]="i<=av.note ? 'text-amber-500' : 'text-gray-200'" class="text-xs">\u2605</span>
                  }
                </div>
                <p class="text-xs text-gray-600 line-clamp-2 mb-2">{{ av.commentaire }}</p>
                <div class="flex gap-2">
                  <button (click)="modererAvis(av, 'approved')" class="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded-lg">\u2713</button>
                  <button (click)="modererAvis(av, 'rejected')" class="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-lg">\u2717</button>
                </div>
              </div>
            }
            @if (pendingAvis().length === 0) { <p class="text-gray-500 text-sm">Aucun avis en attente</p> }
          </div>
        </div>
      </div>
    </div>
  `
    }]
  }], () => [{ type: ArtisanService }, { type: OrderService }, { type: AvisService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "app/pages/admin/dashboard/admin-dashboard.component.ts", lineNumber: 97 });
})();
export {
  AdminDashboardComponent
};
//# sourceMappingURL=chunk-4BUP3HXQ.js.map
