import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  RangeValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-NNN6EYZO.js";
import {
  ProductCardComponent
} from "./chunk-V3IPBODC.js";
import {
  ProductService
} from "./chunk-NRTGAO5M.js";
import "./chunk-M6Z66CPB.js";
import "./chunk-BW22KM5Y.js";
import "./chunk-PD2SCL3N.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-BTJFPSWE.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  TitleCasePipe,
  computed,
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
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/pages/catalogue/catalogue.component.ts
var _c0 = () => [1, 2, 3, 4, 5, 6];
var _forTrack0 = ($index, $item) => $item.id_categorie;
var _forTrack1 = ($index, $item) => $item.id_produit;
function CatalogueComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 11)(1, "input", 31);
    \u0275\u0275listener("change", function CatalogueComponent_For_21_Template_input_change_1_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.selectedCategory.set(cat_r2.nom);
      return \u0275\u0275resetView(ctx_r2.page.set(1));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", cat_r2.nom)("checked", ctx_r2.selectedCategory() === cat_r2.nom);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 3, cat_r2.nom), " ");
  }
}
function CatalogueComponent_Conditional_46_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275element(1, "div", 33);
    \u0275\u0275elementStart(2, "div", 34);
    \u0275\u0275element(3, "div", 35)(4, "div", 36);
    \u0275\u0275elementEnd()();
  }
}
function CatalogueComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275repeaterCreate(1, CatalogueComponent_Conditional_46_For_2_Template, 5, 0, "div", 32, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function CatalogueComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "p", 37);
    \u0275\u0275text(2, "Aucun produit trouv\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 38);
    \u0275\u0275listener("click", function CatalogueComponent_Conditional_47_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetFilters());
    });
    \u0275\u0275text(4, "R\xE9initialiser les filtres");
    \u0275\u0275elementEnd()();
  }
}
function CatalogueComponent_Conditional_48_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 39);
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275property("produit", p_r5);
  }
}
function CatalogueComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275repeaterCreate(1, CatalogueComponent_Conditional_48_For_2_Template, 1, 1, "app-product-card", 39, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.paginated());
  }
}
function CatalogueComponent_Conditional_49_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function CatalogueComponent_Conditional_49_For_4_Template_button_click_0_listener() {
      const p_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.page.set(p_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r2.page() === p_r8 ? "bg-amber-500 text-white px-3 py-1.5 rounded-lg text-sm" : "px-3 py-1.5 border rounded-lg text-sm");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r8, " ");
  }
}
function CatalogueComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "button", 40);
    \u0275\u0275listener("click", function CatalogueComponent_Conditional_49_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.page.set(ctx_r2.page() - 1));
    });
    \u0275\u0275text(2, "\u2190 Pr\xE9c.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, CatalogueComponent_Conditional_49_For_4_Template, 2, 3, "button", 41, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(5, "button", 40);
    \u0275\u0275listener("click", function CatalogueComponent_Conditional_49_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.page.set(ctx_r2.page() + 1));
    });
    \u0275\u0275text(6, "Suiv. \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.page() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.pageRange());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.page() === ctx_r2.totalPages());
  }
}
var CatalogueComponent = class _CatalogueComponent {
  productSvc;
  route;
  all = signal([], ...ngDevMode ? [{ debugName: "all" }] : (
    /* istanbul ignore next */
    []
  ));
  categories = signal([], ...ngDevMode ? [{ debugName: "categories" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  page = signal(1, ...ngDevMode ? [{ debugName: "page" }] : (
    /* istanbul ignore next */
    []
  ));
  search = signal("", ...ngDevMode ? [{ debugName: "search" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedCategory = signal("", ...ngDevMode ? [{ debugName: "selectedCategory" }] : (
    /* istanbul ignore next */
    []
  ));
  maxPrice = signal(200, ...ngDevMode ? [{ debugName: "maxPrice" }] : (
    /* istanbul ignore next */
    []
  ));
  sortBy = signal("default", ...ngDevMode ? [{ debugName: "sortBy" }] : (
    /* istanbul ignore next */
    []
  ));
  PER_PAGE = 9;
  filtered = computed(() => {
    const q = this.search().toLowerCase();
    const cat = this.slugify(this.selectedCategory());
    const max = this.maxPrice();
    const sort = this.sortBy();
    let result = this.all().filter((p) => p.actif);
    if (q)
      result = result.filter((p) => p.nom.toLowerCase().includes(q));
    if (cat)
      result = result.filter((p) => (p.categorie ?? "") === cat);
    result = result.filter((p) => p.prix_ht <= max);
    if (sort === "price-asc")
      return [...result].sort((a, b) => a.prix_ht - b.prix_ht);
    if (sort === "price-desc")
      return [...result].sort((a, b) => b.prix_ht - a.prix_ht);
    if (sort === "newest")
      return [...result].sort((a, b) => (b.date_creation ?? "").localeCompare(a.date_creation ?? ""));
    return result;
  }, ...ngDevMode ? [{ debugName: "filtered" }] : (
    /* istanbul ignore next */
    []
  ));
  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.PER_PAGE)), ...ngDevMode ? [{ debugName: "totalPages" }] : (
    /* istanbul ignore next */
    []
  ));
  paginated = computed(() => this.filtered().slice((this.page() - 1) * this.PER_PAGE, this.page() * this.PER_PAGE), ...ngDevMode ? [{ debugName: "paginated" }] : (
    /* istanbul ignore next */
    []
  ));
  pageRange = computed(() => Array.from({ length: Math.min(this.totalPages(), 5) }, (_, i) => i + 1), ...ngDevMode ? [{ debugName: "pageRange" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(productSvc, route) {
    this.productSvc = productSvc;
    this.route = route;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((p) => {
      if (p["category"])
        this.selectedCategory.set(p["category"]);
    });
    this.productSvc.getCategories().subscribe((cats) => this.categories.set(cats));
    this.productSvc.getAll().subscribe((ps) => {
      this.all.set(ps);
      this.loading.set(false);
    });
  }
  slugify(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  resetFilters() {
    this.search.set("");
    this.selectedCategory.set("");
    this.maxPrice.set(200);
    this.sortBy.set("default");
    this.page.set(1);
  }
  static \u0275fac = function CatalogueComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogueComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CatalogueComponent, selectors: [["app-catalogue"]], decls: 50, vars: 8, consts: [[1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "py-6"], [1, "flex", "items-center", "gap-2", "text-sm", "text-gray-500", "mb-6"], ["routerLink", "/home", 1, "hover:text-gray-900"], [1, "text-gray-900", "font-medium"], [1, "flex", "gap-8"], [1, "hidden", "lg:block", "w-56", "shrink-0"], [1, "card", "p-5", "sticky", "top-24"], [1, "font-semibold", "mb-4"], [1, "mb-4"], [1, "text-xs", "font-medium", "text-gray-500", "uppercase", "mb-2"], [1, "space-y-1"], [1, "flex", "items-center", "gap-2", "text-sm", "cursor-pointer"], ["type", "radio", "name", "cat", "value", "", 3, "change", "checked"], ["type", "range", "min", "0", "max", "200", "step", "5", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "text-xs", "text-amber-600", "hover:underline", 3, "click"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "justify-between", "mb-5", "flex-wrap", "gap-3"], [1, "relative", "flex-1", "min-w-[200px]", "max-w-sm"], ["type", "text", "placeholder", "Rechercher...", 1, "w-full", "border", "border-gray-200", "rounded-lg", "pl-9", "pr-3", "py-2", "text-sm", "focus:outline-none", "focus:border-amber-400", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-gray-400", "text-sm"], [1, "flex", "items-center", "gap-2"], [1, "border", "border-gray-200", "rounded-lg", "px-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], ["value", "default"], ["value", "price-asc"], ["value", "price-desc"], ["value", "newest"], [1, "text-sm", "text-gray-500"], [1, "grid", "grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "text-center", "py-20"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "flex", "items-center", "justify-center", "gap-2", "mt-10"], ["type", "radio", "name", "cat", 3, "change", "value", "checked"], [1, "card", "animate-pulse"], [1, "aspect-square", "bg-gray-200", "rounded-t-lg"], [1, "p-4"], [1, "h-3", "bg-gray-200", "rounded", "mb-2", "w-3/4"], [1, "h-4", "bg-gray-200", "rounded", "w-full"], [1, "text-gray-500", "mb-4"], [1, "text-amber-600", "hover:underline", "text-sm", 3, "click"], [3, "produit"], [1, "px-3", "py-1.5", "border", "rounded-lg", "text-sm", "disabled:opacity-40", 3, "click", "disabled"], [3, "class"], [3, "click"]], template: function CatalogueComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "a", 2);
      \u0275\u0275text(3, "Accueil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span");
      \u0275\u0275text(5, "\u203A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 3);
      \u0275\u0275text(7, "Catalogue");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 4)(9, "aside", 5)(10, "div", 6)(11, "h2", 7);
      \u0275\u0275text(12, "Filtrer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 8)(14, "p", 9);
      \u0275\u0275text(15, "Cat\xE9gorie");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 10)(17, "label", 11)(18, "input", 12);
      \u0275\u0275listener("change", function CatalogueComponent_Template_input_change_18_listener() {
        ctx.selectedCategory.set("");
        return ctx.page.set(1);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " Toutes ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(20, CatalogueComponent_For_21_Template, 4, 5, "label", 11, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 8)(23, "p", 9);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 13);
      \u0275\u0275listener("ngModelChange", function CatalogueComponent_Template_input_ngModelChange_25_listener($event) {
        ctx.maxPrice.set($event);
        return ctx.page.set(1);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "button", 14);
      \u0275\u0275listener("click", function CatalogueComponent_Template_button_click_26_listener() {
        return ctx.resetFilters();
      });
      \u0275\u0275text(27, "R\xE9initialiser");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 15)(29, "div", 16)(30, "div", 17)(31, "input", 18);
      \u0275\u0275listener("ngModelChange", function CatalogueComponent_Template_input_ngModelChange_31_listener($event) {
        ctx.search.set($event);
        return ctx.page.set(1);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span", 19);
      \u0275\u0275text(33, "\u{1F50D}");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 20)(35, "select", 21);
      \u0275\u0275listener("ngModelChange", function CatalogueComponent_Template_select_ngModelChange_35_listener($event) {
        return ctx.sortBy.set($event);
      });
      \u0275\u0275elementStart(36, "option", 22);
      \u0275\u0275text(37, "Pertinence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "option", 23);
      \u0275\u0275text(39, "Prix croissant");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "option", 24);
      \u0275\u0275text(41, "Prix d\xE9croissant");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "option", 25);
      \u0275\u0275text(43, "Nouveaut\xE9s");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "span", 26);
      \u0275\u0275text(45);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(46, CatalogueComponent_Conditional_46_Template, 3, 1, "div", 27)(47, CatalogueComponent_Conditional_47_Template, 5, 0, "div", 28)(48, CatalogueComponent_Conditional_48_Template, 3, 0, "div", 29);
      \u0275\u0275conditionalCreate(49, CatalogueComponent_Conditional_49_Template, 7, 2, "div", 30);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275property("checked", ctx.selectedCategory() === "");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.categories());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Prix max : ", ctx.maxPrice(), " \u20AC");
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.maxPrice());
      \u0275\u0275advance(6);
      \u0275\u0275property("ngModel", ctx.search());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.sortBy());
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1("", ctx.filtered().length, " produits");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 46 : ctx.paginated().length === 0 ? 47 : 48);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.totalPages() > 1 ? 49 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, RangeValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, ProductCardComponent, TitleCasePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogueComponent, [{
    type: Component,
    args: [{
      selector: "app-catalogue",
      standalone: true,
      imports: [CommonModule, RouterLink, FormsModule, ProductCardComponent],
      template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <a routerLink="/home" class="hover:text-gray-900">Accueil</a>
        <span>\u203A</span>
        <span class="text-gray-900 font-medium">Catalogue</span>
      </nav>

      <div class="flex gap-8">
        <!-- Sidebar -->
        <aside class="hidden lg:block w-56 shrink-0">
          <div class="card p-5 sticky top-24">
            <h2 class="font-semibold mb-4">Filtrer</h2>

            <div class="mb-4">
              <p class="text-xs font-medium text-gray-500 uppercase mb-2">Cat\xE9gorie</p>
              <div class="space-y-1">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="cat" value=""
                         [checked]="selectedCategory() === ''"
                         (change)="selectedCategory.set(''); page.set(1)" />
                  Toutes
                </label>
                @for (cat of categories(); track cat.id_categorie) {
                  <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="cat" [value]="cat.nom"
                           [checked]="selectedCategory() === cat.nom"
                           (change)="selectedCategory.set(cat.nom); page.set(1)" />
                    {{ cat.nom | titlecase }}
                  </label>
                }
              </div>
            </div>

            <div class="mb-4">
              <p class="text-xs font-medium text-gray-500 uppercase mb-2">Prix max : {{ maxPrice() }} \u20AC</p>
              <input type="range" min="0" max="200" step="5"
                     [ngModel]="maxPrice()"
                     (ngModelChange)="maxPrice.set($event); page.set(1)"
                     class="w-full" />
            </div>

            <button (click)="resetFilters()" class="text-xs text-amber-600 hover:underline">R\xE9initialiser</button>
          </div>
        </aside>

        <!-- Main -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
            <!-- Search -->
            <div class="relative flex-1 min-w-[200px] max-w-sm">
              <input type="text" placeholder="Rechercher..."
                     [ngModel]="search()"
                     (ngModelChange)="search.set($event); page.set(1)"
                     class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">\u{1F50D}</span>
            </div>
            <div class="flex items-center gap-2">
              <select [ngModel]="sortBy()" (ngModelChange)="sortBy.set($event)"
                      class="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="default">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix d\xE9croissant</option>
                <option value="newest">Nouveaut\xE9s</option>
              </select>
              <span class="text-sm text-gray-500">{{ filtered().length }} produits</span>
            </div>
          </div>

          @if (loading()) {
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
              @for (i of [1,2,3,4,5,6]; track i) {
                <div class="card animate-pulse">
                  <div class="aspect-square bg-gray-200 rounded-t-lg"></div>
                  <div class="p-4"><div class="h-3 bg-gray-200 rounded mb-2 w-3/4"></div><div class="h-4 bg-gray-200 rounded w-full"></div></div>
                </div>
              }
            </div>
          } @else if (paginated().length === 0) {
            <div class="text-center py-20">
              <p class="text-gray-500 mb-4">Aucun produit trouv\xE9</p>
              <button (click)="resetFilters()" class="text-amber-600 hover:underline text-sm">R\xE9initialiser les filtres</button>
            </div>
          } @else {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (p of paginated(); track p.id_produit) {
                <app-product-card [produit]="p" />
              }
            </div>
          }

          <!-- Pagination -->
          @if (totalPages() > 1) {
            <div class="flex items-center justify-center gap-2 mt-10">
              <button [disabled]="page() === 1" (click)="page.set(page()-1)"
                      class="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40">\u2190 Pr\xE9c.</button>
              @for (p of pageRange(); track p) {
                <button (click)="page.set(p)"
                        [class]="page()===p ? 'bg-amber-500 text-white px-3 py-1.5 rounded-lg text-sm' : 'px-3 py-1.5 border rounded-lg text-sm'">
                  {{ p }}
                </button>
              }
              <button [disabled]="page() === totalPages()" (click)="page.set(page()+1)"
                      class="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40">Suiv. \u2192</button>
            </div>
          }
        </div>
      </div>
    </div>
  `
    }]
  }], () => [{ type: ProductService }, { type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CatalogueComponent, { className: "CatalogueComponent", filePath: "app/pages/catalogue/catalogue.component.ts", lineNumber: 125 });
})();
export {
  CatalogueComponent
};
//# sourceMappingURL=chunk-WKZVQW4U.js.map
