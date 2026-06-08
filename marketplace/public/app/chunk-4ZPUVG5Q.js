import {
  OrderService
} from "./chunk-G5RZROR4.js";
import {
  STATUT_LABELS,
  STATUT_NEXT
} from "./chunk-EFSXKDVI.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-NNN6EYZO.js";
import {
  ToastService
} from "./chunk-M6Z66CPB.js";
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBZS45XM.js";

// src/app/pages/admin/orders/admin-orders.component.ts
var _forTrack0 = ($index, $item) => $item.id_commande;
function AdminOrdersComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function AdminOrdersComponent_For_5_Template_button_click_0_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterStatus = ctx_r2.filterStatus === s_r2 ? "all" : s_r2);
    });
    \u0275\u0275elementStart(1, "div", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.filterStatus === s_r2 ? "border-amber-500 bg-amber-50" : "border-gray-200 bg-white");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.countByStatut(s_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.statutLabel(s_r2));
  }
}
function AdminOrdersComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, "Chargement\u2026");
    \u0275\u0275elementEnd()();
  }
}
function AdminOrdersComponent_For_28_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function AdminOrdersComponent_For_28_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const o_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.advance(o_r5));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2192 ", ctx_r2.statutLabel(ctx_r2.nextStatut(o_r5.statut)), " ");
  }
}
function AdminOrdersComponent_For_28_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function AdminOrdersComponent_For_28_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const o_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancel(o_r5));
    });
    \u0275\u0275text(1, "Annuler");
    \u0275\u0275elementEnd();
  }
}
function AdminOrdersComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 14)(1, "td", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 20);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 21);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 22)(10, "span", 23);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 24);
    \u0275\u0275conditionalCreate(13, AdminOrdersComponent_For_28_Conditional_13_Template, 2, 1, "button", 25);
    \u0275\u0275conditionalCreate(14, AdminOrdersComponent_For_28_Conditional_14_Template, 2, 0, "button", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r5.reference);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 8, o_r5.date_commande, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 11, o_r5.total_ttc, "1.2-2"), " \u20AC");
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge-" + o_r5.statut);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.statutLabel(o_r5.statut), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.nextStatut(o_r5.statut) ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(o_r5.statut !== "annulee" && o_r5.statut !== "livree" ? 14 : -1);
  }
}
function AdminOrdersComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, "Aucune commande");
    \u0275\u0275elementEnd()();
  }
}
var AdminOrdersComponent = class _AdminOrdersComponent {
  orderSvc;
  toast;
  orders = signal([], ...ngDevMode ? [{ debugName: "orders" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  search = "";
  filterStatus = "all";
  statutKeys = Object.keys(STATUT_LABELS);
  get filtered() {
    return this.orders().filter((o) => {
      const ms = !this.search || o.reference.toLowerCase().includes(this.search.toLowerCase());
      const fs = this.filterStatus === "all" || o.statut === this.filterStatus;
      return ms && fs;
    });
  }
  constructor(orderSvc, toast) {
    this.orderSvc = orderSvc;
    this.toast = toast;
  }
  ngOnInit() {
    this.orderSvc.getAdminOrders().subscribe((os) => {
      this.orders.set(os);
      this.loading.set(false);
    });
  }
  countByStatut(s) {
    return this.orders().filter((o) => o.statut === s).length;
  }
  statutLabel(s) {
    return STATUT_LABELS[s] ?? s;
  }
  nextStatut(s) {
    return STATUT_NEXT[s];
  }
  advance(o) {
    const next = this.nextStatut(o.statut);
    if (!next)
      return;
    this.orderSvc.updateAdminOrderStatus(o.id_commande, next).subscribe({
      next: () => {
        this.ngOnInit();
        this.toast.success("Statut avanc\xE9");
      },
      error: () => this.toast.error("Erreur")
    });
  }
  cancel(o) {
    this.orderSvc.updateAdminOrderStatus(o.id_commande, "annulee").subscribe({
      next: () => {
        this.ngOnInit();
        this.toast.success("Commande annul\xE9e");
      },
      error: () => this.toast.error("Erreur")
    });
  }
  static \u0275fac = function AdminOrdersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminOrdersComponent)(\u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminOrdersComponent, selectors: [["app-admin-orders"]], decls: 30, vars: 3, consts: [[1, "p-6", "md:p-8", "max-w-6xl"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-2", "sm:grid-cols-5", "gap-3", "mb-6"], [1, "rounded-xl", "border", "p-3", "text-center", "transition-all", 3, "class"], [1, "relative", "mb-4"], ["placeholder", "Rechercher par r\xE9f\xE9rence\u2026", 1, "w-full", "border", "rounded-lg", "pl-9", "pr-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-gray-400"], [1, "card", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "bg-gray-50"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500", "hidden", "md:table-cell"], [1, "text-right", "px-4", "py-3", "font-medium", "text-gray-500"], [1, "border-t", "hover:bg-gray-50", "transition-colors"], [1, "rounded-xl", "border", "p-3", "text-center", "transition-all", 3, "click"], [1, "text-lg", "font-bold"], [1, "text-xs", "text-gray-500"], ["colspan", "5", 1, "px-4", "py-8", "text-center", "text-gray-500"], [1, "px-4", "py-3", "font-mono", "text-xs", "font-medium"], [1, "px-4", "py-3", "text-gray-500", "hidden", "md:table-cell"], [1, "px-4", "py-3", "font-semibold"], [1, "px-4", "py-3"], [1, "text-xs", "font-medium", "px-2", "py-1", "rounded-full"], [1, "px-4", "py-3", "text-right"], [1, "text-xs", "border", "rounded-lg", "px-2", "py-1", "hover:bg-gray-50", "mr-1"], [1, "text-xs", "text-red-500", "hover:text-red-700", "px-1"], [1, "text-xs", "border", "rounded-lg", "px-2", "py-1", "hover:bg-gray-50", "mr-1", 3, "click"], [1, "text-xs", "text-red-500", "hover:text-red-700", "px-1", 3, "click"]], template: function AdminOrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Gestion des Commandes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275repeaterCreate(4, AdminOrdersComponent_For_5_Template, 5, 4, "button", 3, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 4)(7, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 6);
      \u0275\u0275text(9, "\u{1F50D}");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 7)(11, "div", 8)(12, "table", 9)(13, "thead", 10)(14, "tr")(15, "th", 11);
      \u0275\u0275text(16, "R\xE9f\xE9rence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "th", 12);
      \u0275\u0275text(18, "Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "th", 11);
      \u0275\u0275text(20, "Total TTC");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th", 11);
      \u0275\u0275text(22, "Statut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th", 13);
      \u0275\u0275text(24, "Action");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "tbody");
      \u0275\u0275conditionalCreate(26, AdminOrdersComponent_Conditional_26_Template, 3, 0, "tr");
      \u0275\u0275repeaterCreate(27, AdminOrdersComponent_For_28_Template, 15, 14, "tr", 14, _forTrack0);
      \u0275\u0275conditionalCreate(29, AdminOrdersComponent_Conditional_29_Template, 3, 0, "tr");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.statutKeys);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.search);
      \u0275\u0275advance(19);
      \u0275\u0275conditional(ctx.loading() ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.filtered);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading() && ctx.filtered.length === 0 ? 29 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminOrdersComponent, [{
    type: Component,
    args: [{
      selector: "app-admin-orders",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des Commandes</h1>

      <!-- Stats rapides -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        @for (s of statutKeys; track s) {
          <button (click)="filterStatus = filterStatus===s ? 'all' : s"
                  class="rounded-xl border p-3 text-center transition-all"
                  [class]="filterStatus===s ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'">
            <div class="text-lg font-bold">{{ countByStatut(s) }}</div>
            <div class="text-xs text-gray-500">{{ statutLabel(s) }}</div>
          </button>
        }
      </div>

      <!-- Recherche -->
      <div class="relative mb-4">
        <input [(ngModel)]="search" placeholder="Rechercher par r\xE9f\xE9rence\u2026" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">\u{1F50D}</span>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">R\xE9f\xE9rence</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Total TTC</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Chargement\u2026</td></tr>
              }
              @for (o of filtered; track o.id_commande) {
                <tr class="border-t hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 font-mono text-xs font-medium">{{ o.reference }}</td>
                  <td class="px-4 py-3 text-gray-500 hidden md:table-cell">{{ o.date_commande | date:'dd/MM/yyyy' }}</td>
                  <td class="px-4 py-3 font-semibold">{{ o.total_ttc | number:'1.2-2' }} \u20AC</td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-1 rounded-full" [class]="'badge-' + o.statut">
                      {{ statutLabel(o.statut) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    @if (nextStatut(o.statut)) {
                      <button (click)="advance(o)" class="text-xs border rounded-lg px-2 py-1 hover:bg-gray-50 mr-1">
                        \u2192 {{ statutLabel(nextStatut(o.statut)!) }}
                      </button>
                    }
                    @if (o.statut !== 'annulee' && o.statut !== 'livree') {
                      <button (click)="cancel(o)" class="text-xs text-red-500 hover:text-red-700 px-1">Annuler</button>
                    }
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Aucune commande</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
    }]
  }], () => [{ type: OrderService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminOrdersComponent, { className: "AdminOrdersComponent", filePath: "app/pages/admin/orders/admin-orders.component.ts", lineNumber: 82 });
})();
export {
  AdminOrdersComponent
};
//# sourceMappingURL=chunk-4ZPUVG5Q.js.map
