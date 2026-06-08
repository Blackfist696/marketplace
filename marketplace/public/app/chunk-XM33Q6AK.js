import {
  CATEGORY_LABELS
} from "./chunk-EFSXKDVI.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-NNN6EYZO.js";
import {
  ProductService
} from "./chunk-NRTGAO5M.js";
import {
  ToastService
} from "./chunk-M6Z66CPB.js";
import {
  getProductImageSrc
} from "./chunk-BW22KM5Y.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBZS45XM.js";

// src/app/pages/admin/products/admin-products.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id_produit;
function AdminProductsComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    \u0275\u0275property("value", cat_r1.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r1.label);
  }
}
function AdminProductsComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 19);
    \u0275\u0275text(2, "Chargement\u2026");
    \u0275\u0275elementEnd()();
  }
}
function AdminProductsComponent_For_31_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 24);
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r3.getProductImageSrc(p_r3.image_principale), \u0275\u0275sanitizeUrl)("alt", p_r3.nom);
  }
}
function AdminProductsComponent_For_31_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1, "Mis en avant");
    \u0275\u0275elementEnd();
  }
}
function AdminProductsComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 21)(2, "div", 22)(3, "div", 23);
    \u0275\u0275conditionalCreate(4, AdminProductsComponent_For_31_Conditional_4_Template, 1, 2, "img", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "div", 25);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, AdminProductsComponent_For_31_Conditional_8_Template, 2, 0, "span", 26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "td", 27);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 28);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 29);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 30)(17, "button", 31);
    \u0275\u0275listener("click", function AdminProductsComponent_For_31_Template_button_click_17_listener() {
      const p_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleVisibility(p_r3));
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275classProp("opacity-50", !p_r3.actif);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(p_r3.image_principale ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r3.nom);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r3.mis_en_avant ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", p_r3.id_artisan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(13, 13, p_r3.prix_ht, "1.2-2"), " \u20AC");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-red-600", p_r3.stock === 0)("font-medium", p_r3.stock === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r3.stock);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r3.actif ? "\u{1F441}\uFE0F" : "\u{1F6AB}");
  }
}
function AdminProductsComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 19);
    \u0275\u0275text(2, "Aucun produit");
    \u0275\u0275elementEnd()();
  }
}
var AdminProductsComponent = class _AdminProductsComponent {
  productSvc;
  toast;
  getProductImageSrc = getProductImageSrc;
  produits = signal([], ...ngDevMode ? [{ debugName: "produits" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  search = "";
  filterCategory = "";
  categories = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label }));
  get filtered() {
    return this.produits().filter((p) => {
      const ms = !this.search || p.nom.toLowerCase().includes(this.search.toLowerCase());
      const fc = !this.filterCategory || p.categorie === this.filterCategory;
      return ms && fc;
    });
  }
  constructor(productSvc, toast) {
    this.productSvc = productSvc;
    this.toast = toast;
  }
  ngOnInit() {
    this.productSvc.adminGetAll().subscribe((ps) => {
      this.produits.set(ps);
      this.loading.set(false);
    });
  }
  toggleVisibility(p) {
    this.productSvc.adminUpdate(p.id_produit, { actif: p.actif ? 0 : 1 }).subscribe({
      next: () => {
        this.ngOnInit();
        this.toast.success("Visibilit\xE9 mise \xE0 jour");
      },
      error: () => this.toast.error("Erreur")
    });
  }
  static \u0275fac = function AdminProductsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminProductsComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminProductsComponent, selectors: [["app-admin-products"]], decls: 35, vars: 5, consts: [[1, "p-6", "md:p-8", "max-w-6xl"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "flex", "flex-wrap", "gap-3", "mb-6"], [1, "relative", "flex-1", "min-w-[200px]"], ["placeholder", "Rechercher un produit\u2026", 1, "w-full", "border", "rounded-lg", "pl-9", "pr-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-gray-400"], [1, "border", "rounded-lg", "px-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "card", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "bg-gray-50"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500", "hidden", "md:table-cell"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500", "hidden", "lg:table-cell"], [1, "text-right", "px-4", "py-3", "font-medium", "text-gray-500"], [1, "border-t", "hover:bg-gray-50", "transition-colors", 3, "opacity-50"], [1, "px-4", "py-3", "border-t", "bg-gray-50", "text-xs", "text-gray-500"], ["colspan", "5", 1, "px-4", "py-8", "text-center", "text-gray-500"], [1, "border-t", "hover:bg-gray-50", "transition-colors"], [1, "px-4", "py-3"], [1, "flex", "items-center", "gap-3"], [1, "w-9", "h-9", "rounded-lg", "bg-gray-100", "overflow-hidden", "shrink-0"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "font-medium", "leading-tight"], [1, "text-xs", "bg-amber-100", "text-amber-800", "px-1.5", "rounded"], [1, "px-4", "py-3", "text-gray-500", "hidden", "md:table-cell"], [1, "px-4", "py-3", "font-semibold"], [1, "px-4", "py-3", "hidden", "lg:table-cell"], [1, "px-4", "py-3", "text-right"], [1, "text-xl", 3, "click"]], template: function AdminProductsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Gestion des Produits");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_Template_input_ngModelChange_5_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7, "\u{1F50D}");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "select", 6);
      \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_Template_select_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filterCategory, $event) || (ctx.filterCategory = $event);
        return $event;
      });
      \u0275\u0275elementStart(9, "option", 7);
      \u0275\u0275text(10, "Toutes cat\xE9gories");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(11, AdminProductsComponent_For_12_Template, 2, 2, "option", 8, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 9)(14, "div", 10)(15, "table", 11)(16, "thead", 12)(17, "tr")(18, "th", 13);
      \u0275\u0275text(19, "Produit");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th", 14);
      \u0275\u0275text(21, "Artisan ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th", 13);
      \u0275\u0275text(23, "Prix HT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th", 15);
      \u0275\u0275text(25, "Stock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th", 16);
      \u0275\u0275text(27, "Visible");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "tbody");
      \u0275\u0275conditionalCreate(29, AdminProductsComponent_Conditional_29_Template, 3, 0, "tr");
      \u0275\u0275repeaterCreate(30, AdminProductsComponent_For_31_Template, 19, 16, "tr", 17, _forTrack1);
      \u0275\u0275conditionalCreate(32, AdminProductsComponent_Conditional_32_Template, 3, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "div", 18);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.search);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.filterCategory);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(18);
      \u0275\u0275conditional(ctx.loading() ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.filtered);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading() && ctx.filtered.length === 0 ? 32 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.filtered.length, " produit(s) affich\xE9(s) ");
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminProductsComponent, [{
    type: Component,
    args: [{
      selector: "app-admin-products",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des Produits</h1>

      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative flex-1 min-w-[200px]">
          <input [(ngModel)]="search" placeholder="Rechercher un produit\u2026" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">\u{1F50D}</span>
        </div>
        <select [(ngModel)]="filterCategory" class="border rounded-lg px-3 py-2 text-sm">
          <option value="">Toutes cat\xE9gories</option>
          @for (cat of categories; track cat.key) {
            <option [value]="cat.key">{{ cat.label }}</option>
          }
        </select>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Produit</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Artisan ID</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Prix HT</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Stock</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Visible</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Chargement\u2026</td></tr>
              }
              @for (p of filtered; track p.id_produit) {
                <tr class="border-t hover:bg-gray-50 transition-colors" [class.opacity-50]="!p.actif">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        @if (p.image_principale) {
                          <img [src]="getProductImageSrc(p.image_principale)" [alt]="p.nom" class="w-full h-full object-cover" />
                        }
                      </div>
                      <div>
                        <div class="font-medium leading-tight">{{ p.nom }}</div>
                        @if (p.mis_en_avant) {
                          <span class="text-xs bg-amber-100 text-amber-800 px-1.5 rounded">Mis en avant</span>
                        }
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-gray-500 hidden md:table-cell">#{{ p.id_artisan }}</td>
                  <td class="px-4 py-3 font-semibold">{{ p.prix_ht | number:'1.2-2' }} \u20AC</td>
                  <td class="px-4 py-3 hidden lg:table-cell" [class.text-red-600]="p.stock===0" [class.font-medium]="p.stock===0">{{ p.stock }}</td>
                  <td class="px-4 py-3 text-right">
                    <button (click)="toggleVisibility(p)" class="text-xl">{{ p.actif ? '\u{1F441}\uFE0F' : '\u{1F6AB}' }}</button>
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Aucun produit</td></tr>
              }
            </tbody>
          </table>
        </div>
        <div class="px-4 py-3 border-t bg-gray-50 text-xs text-gray-500">
          {{ filtered.length }} produit(s) affich\xE9(s)
        </div>
      </div>
    </div>
  `
    }]
  }], () => [{ type: ProductService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminProductsComponent, { className: "AdminProductsComponent", filePath: "app/pages/admin/products/admin-products.component.ts", lineNumber: 84 });
})();
export {
  AdminProductsComponent
};
//# sourceMappingURL=chunk-XM33Q6AK.js.map
