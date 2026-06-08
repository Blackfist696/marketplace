import {
  OrderService
} from "./chunk-G5RZROR4.js";
import {
  STATUT_LABELS
} from "./chunk-EFSXKDVI.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBZS45XM.js";

// src/app/pages/artisan/orders/artisan-orders.component.ts
var _forTrack0 = ($index, $item) => $item.id_commande;
var _forTrack1 = ($index, $item) => $item.value;
function ArtisanOrdersComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 9);
    \u0275\u0275text(2, "Chargement\u2026");
    \u0275\u0275elementEnd()();
  }
}
function ArtisanOrdersComponent_For_19_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    \u0275\u0275property("value", s_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r4.label);
  }
}
function ArtisanOrdersComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 8)(1, "td", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 11);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 12);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 13)(10, "select", 14);
    \u0275\u0275twoWayListener("ngModelChange", function ArtisanOrdersComponent_For_19_Template_select_ngModelChange_10_listener($event) {
      const o_r2 = \u0275\u0275restoreView(_r1).$implicit;
      \u0275\u0275twoWayBindingSet(o_r2.statut, $event) || (o_r2.statut = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ArtisanOrdersComponent_For_19_Template_select_ngModelChange_10_listener($event) {
      const o_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateStatut(o_r2, $event));
    });
    \u0275\u0275repeaterCreate(11, ArtisanOrdersComponent_For_19_For_12_Template, 2, 2, "option", 15, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r2.reference);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 4, o_r2.date_commande, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 7, o_r2.total_ttc, "1.2-2"), " \u20AC");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", o_r2.statut);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.statutOptions);
  }
}
function ArtisanOrdersComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 16);
    \u0275\u0275text(2, "Aucune commande");
    \u0275\u0275elementEnd()();
  }
}
var ArtisanOrdersComponent = class _ArtisanOrdersComponent {
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
  statutOptions = Object.entries(STATUT_LABELS).map(([value, label]) => ({ value, label }));
  constructor(orderSvc, toast) {
    this.orderSvc = orderSvc;
    this.toast = toast;
  }
  ngOnInit() {
    this.orderSvc.getArtisanOrders().subscribe((os) => {
      this.orders.set(os);
      this.loading.set(false);
    });
  }
  updateStatut(order, statut) {
    this.orderSvc.updateAdminOrderStatus(order.id_commande, statut).subscribe({
      next: () => this.toast.success("Statut mis \xE0 jour"),
      error: () => this.toast.error("Erreur")
    });
  }
  static \u0275fac = function ArtisanOrdersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtisanOrdersComponent)(\u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtisanOrdersComponent, selectors: [["app-artisan-orders"]], decls: 21, vars: 2, consts: [[1, "p-6", "md:p-8", "max-w-6xl"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "card", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "bg-gray-50", "border-b"], [1, "text-left", "p-4", "font-medium", "text-gray-500"], [1, "text-left", "p-4", "font-medium", "text-gray-500", "hidden", "md:table-cell"], [1, "border-t", "hover:bg-gray-50"], ["colspan", "4", 1, "p-8", "text-center", "text-gray-500"], [1, "p-4", "font-mono", "text-xs", "font-medium"], [1, "p-4", "text-gray-500", "hidden", "md:table-cell"], [1, "p-4", "font-medium"], [1, "p-4"], [1, "border", "rounded-lg", "px-2", "py-1", "text-xs", 3, "ngModelChange", "ngModel"], [3, "value"], ["colspan", "4", 1, "p-12", "text-center", "text-gray-500"]], template: function ArtisanOrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Commandes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "table", 4)(6, "thead", 5)(7, "tr")(8, "th", 6);
      \u0275\u0275text(9, "R\xE9f\xE9rence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "th", 7);
      \u0275\u0275text(11, "Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "th", 6);
      \u0275\u0275text(13, "Total TTC");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "th", 6);
      \u0275\u0275text(15, "Statut");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "tbody");
      \u0275\u0275conditionalCreate(17, ArtisanOrdersComponent_Conditional_17_Template, 3, 0, "tr");
      \u0275\u0275repeaterCreate(18, ArtisanOrdersComponent_For_19_Template, 13, 10, "tr", 8, _forTrack0);
      \u0275\u0275conditionalCreate(20, ArtisanOrdersComponent_Conditional_20_Template, 3, 0, "tr");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275conditional(ctx.loading() ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.orders());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading() && ctx.orders().length === 0 ? 20 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtisanOrdersComponent, [{
    type: Component,
    args: [{
      selector: "app-artisan-orders",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Commandes</h1>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="text-left p-4 font-medium text-gray-500">R\xE9f\xE9rence</th>
                <th class="text-left p-4 font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th class="text-left p-4 font-medium text-gray-500">Total TTC</th>
                <th class="text-left p-4 font-medium text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="4" class="p-8 text-center text-gray-500">Chargement\u2026</td></tr>
              }
              @for (o of orders(); track o.id_commande) {
                <tr class="border-t hover:bg-gray-50">
                  <td class="p-4 font-mono text-xs font-medium">{{ o.reference }}</td>
                  <td class="p-4 text-gray-500 hidden md:table-cell">{{ o.date_commande | date:'dd/MM/yyyy' }}</td>
                  <td class="p-4 font-medium">{{ o.total_ttc | number:'1.2-2' }} \u20AC</td>
                  <td class="p-4">
                    <select [(ngModel)]="o.statut" (ngModelChange)="updateStatut(o, $event)"
                            class="border rounded-lg px-2 py-1 text-xs">
                      @for (s of statutOptions; track s.value) {
                        <option [value]="s.value">{{ s.label }}</option>
                      }
                    </select>
                  </td>
                </tr>
              }
              @if (!loading() && orders().length === 0) {
                <tr><td colspan="4" class="p-12 text-center text-gray-500">Aucune commande</td></tr>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtisanOrdersComponent, { className: "ArtisanOrdersComponent", filePath: "app/pages/artisan/orders/artisan-orders.component.ts", lineNumber: 55 });
})();
export {
  ArtisanOrdersComponent
};
//# sourceMappingURL=chunk-UOUZAZTU.js.map
