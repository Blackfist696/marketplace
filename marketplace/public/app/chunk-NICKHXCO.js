import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
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
  __spreadValues,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
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

// src/app/pages/artisan/products/artisan-products.component.ts
var _c0 = () => ["all", "active", "inactive"];
var _forTrack0 = ($index, $item) => $item.id_produit;
function ArtisanProductsComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function ArtisanProductsComponent_For_13_Template_button_click_0_listener() {
      const f_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.statusFilter = f_r2);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.statusFilter === f_r2 ? "bg-amber-500 text-white" : "border border-gray-200 text-gray-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r2 === "all" ? "Tous" : f_r2 === "active" ? "Actifs" : "Inactifs", " ");
  }
}
function ArtisanProductsComponent_For_31_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 25);
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r2.getProductImageSrc(p_r5.image_principale), \u0275\u0275sanitizeUrl)("alt", p_r5.nom);
  }
}
function ArtisanProductsComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 21)(1, "td", 22)(2, "div", 23)(3, "div", 24);
    \u0275\u0275conditionalCreate(4, ArtisanProductsComponent_For_31_Conditional_4_Template, 1, 2, "img", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 26);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 27);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 28);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 22)(13, "span", 29);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 30)(16, "button", 31);
    \u0275\u0275listener("click", function ArtisanProductsComponent_For_31_Template_button_click_16_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEdit(p_r5));
    });
    \u0275\u0275text(17, "\u270F\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 32);
    \u0275\u0275listener("click", function ArtisanProductsComponent_For_31_Template_button_click_18_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleActif(p_r5));
    });
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275classProp("opacity-50", !p_r5.actif);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(p_r5.image_principale ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(9, 12, p_r5.prix_ht, "1.2-2"), " \u20AC");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-red-600", p_r5.stock === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5.stock);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(p_r5.actif ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r5.actif ? "Actif" : "Inactif", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", p_r5.actif ? "\u{1F441}\uFE0F" : "\u{1F6AB}", " ");
  }
}
function ArtisanProductsComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 33);
    \u0275\u0275text(2, "Aucun produit");
    \u0275\u0275elementEnd()();
  }
}
function ArtisanProductsComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 34)(2, "h2", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 36)(5, "div")(6, "label", 37);
    \u0275\u0275text(7, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function ArtisanProductsComponent_Conditional_33_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.nom, $event) || (ctx_r2.form.nom = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "label", 37);
    \u0275\u0275text(11, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 39);
    \u0275\u0275twoWayListener("ngModelChange", function ArtisanProductsComponent_Conditional_33_Template_textarea_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.description, $event) || (ctx_r2.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 40)(14, "div")(15, "label", 37);
    \u0275\u0275text(16, "Prix HT (\u20AC)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function ArtisanProductsComponent_Conditional_33_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.prix_ht, $event) || (ctx_r2.form.prix_ht = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "label", 37);
    \u0275\u0275text(20, "Stock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function ArtisanProductsComponent_Conditional_33_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.stock, $event) || (ctx_r2.form.stock = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div")(23, "label", 37);
    \u0275\u0275text(24, "Poids / Contenance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function ArtisanProductsComponent_Conditional_33_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.poids, $event) || (ctx_r2.form.poids = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 44)(27, "label", 37);
    \u0275\u0275text(28, "Produit actif");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function ArtisanProductsComponent_Conditional_33_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.actif, $event) || (ctx_r2.form.actif = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 44)(31, "label", 37);
    \u0275\u0275text(32, "Mis en avant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function ArtisanProductsComponent_Conditional_33_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.mis_en_avant, $event) || (ctx_r2.form.mis_en_avant = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 46)(35, "button", 47);
    \u0275\u0275listener("click", function ArtisanProductsComponent_Conditional_33_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dialogOpen = false);
    });
    \u0275\u0275text(36, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 48);
    \u0275\u0275listener("click", function ArtisanProductsComponent_Conditional_33_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.editing ? "Modifier" : "Ajouter", " un produit");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.nom);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.prix_ht);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.stock);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.poids);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.actif);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.mis_en_avant);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving() ? "Enregistrement\u2026" : "Enregistrer", " ");
  }
}
var ArtisanProductsComponent = class _ArtisanProductsComponent {
  productSvc;
  toast;
  getProductImageSrc = getProductImageSrc;
  produits = signal([], ...ngDevMode ? [{ debugName: "produits" }] : (
    /* istanbul ignore next */
    []
  ));
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  search = "";
  statusFilter = "all";
  dialogOpen = false;
  editing = null;
  form = {};
  get filtered() {
    return this.produits().filter((p) => {
      const ms = !this.search || p.nom.toLowerCase().includes(this.search.toLowerCase());
      const fs = this.statusFilter === "all" || (this.statusFilter === "active" ? !!p.actif : !p.actif);
      return ms && fs;
    });
  }
  constructor(productSvc, toast) {
    this.productSvc = productSvc;
    this.toast = toast;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.productSvc.getMyProducts().subscribe((ps) => this.produits.set(ps));
  }
  openNew() {
    this.editing = null;
    this.form = { nom: "", description: "", prix_ht: 0, stock: 0, poids: "", actif: 1, mis_en_avant: 0 };
    this.dialogOpen = true;
  }
  openEdit(p) {
    this.editing = p;
    this.form = __spreadValues({}, p);
    this.dialogOpen = true;
  }
  save() {
    this.saving.set(true);
    const obs = this.editing ? this.productSvc.update(this.editing.id_produit, this.form) : this.productSvc.create(this.form);
    obs.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogOpen = false;
        this.load();
        this.toast.success(this.editing ? "Produit modifi\xE9" : "Produit ajout\xE9");
      },
      error: () => {
        this.saving.set(false);
        this.toast.error("Erreur");
      }
    });
  }
  toggleActif(p) {
    this.productSvc.update(p.id_produit, { actif: p.actif ? 0 : 1 }).subscribe({
      next: () => {
        this.load();
        this.toast.success("Statut mis \xE0 jour");
      },
      error: () => this.toast.error("Erreur")
    });
  }
  static \u0275fac = function ArtisanProductsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtisanProductsComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtisanProductsComponent, selectors: [["app-artisan-products"]], decls: 34, vars: 5, consts: [[1, "p-6", "md:p-8", "max-w-6xl"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-4", "mb-6"], [1, "font-serif", "text-2xl", "font-bold"], [1, "bg-amber-500", "hover:bg-amber-600", "text-white", "px-4", "py-2", "rounded-xl", "text-sm", "font-medium", 3, "click"], [1, "flex", "flex-wrap", "gap-3", "mb-6"], [1, "relative"], ["placeholder", "Rechercher...", 1, "border", "rounded-lg", "pl-9", "pr-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-gray-400"], [1, "flex", "gap-2"], [1, "px-3", "py-1.5", "rounded-full", "text-sm", 3, "class"], [1, "card", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "bg-gray-50"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500", "hidden", "sm:table-cell"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500", "hidden", "md:table-cell"], [1, "text-right", "px-4", "py-3", "font-medium", "text-gray-500"], [1, "border-t", "hover:bg-gray-50", "transition-colors", 3, "opacity-50"], [1, "fixed", "inset-0", "bg-black/40", "flex", "items-center", "justify-center", "z-50", "p-4"], [1, "px-3", "py-1.5", "rounded-full", "text-sm", 3, "click"], [1, "border-t", "hover:bg-gray-50", "transition-colors"], [1, "px-4", "py-3"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-lg", "bg-gray-100", "overflow-hidden", "shrink-0"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "font-medium", "truncate", "max-w-[180px]"], [1, "px-4", "py-3", "hidden", "sm:table-cell"], [1, "px-4", "py-3", "hidden", "md:table-cell"], [1, "text-xs", "px-2", "py-1", "rounded-full"], [1, "px-4", "py-3", "text-right"], [1, "text-gray-500", "hover:text-amber-600", "mr-2", "text-sm", 3, "click"], [1, "text-gray-500", "hover:text-gray-800", "text-sm", 3, "click"], ["colspan", "5", 1, "px-4", "py-8", "text-center", "text-gray-500"], [1, "bg-white", "rounded-2xl", "w-full", "max-w-lg", "max-h-[85vh]", "overflow-y-auto", "p-6"], [1, "font-serif", "text-xl", "font-bold", "mb-4"], [1, "space-y-4"], [1, "text-sm", "font-medium"], [1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], ["rows", "3", 1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-4"], ["type", "number", "step", "0.01", 1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "number", 1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "ex: 500g", 1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "justify-between"], ["type", "checkbox", 1, "w-4", "h-4", "accent-amber-500", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-3", "mt-6"], [1, "flex-1", "border", "border-gray-200", "rounded-xl", "py-2", "text-sm", 3, "click"], [1, "flex-1", "bg-amber-500", "hover:bg-amber-600", "text-white", "rounded-xl", "py-2", "text-sm", "font-medium", "disabled:opacity-50", 3, "click", "disabled"]], template: function ArtisanProductsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function ArtisanProductsComponent_Template_button_click_4_listener() {
        return ctx.openNew();
      });
      \u0275\u0275text(5, " + Ajouter un produit ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "div", 5)(8, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function ArtisanProductsComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "span", 7);
      \u0275\u0275text(10, "\u{1F50D}");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 8);
      \u0275\u0275repeaterCreate(12, ArtisanProductsComponent_For_13_Template, 2, 3, "button", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 10)(15, "div", 11)(16, "table", 12)(17, "thead", 13)(18, "tr")(19, "th", 14);
      \u0275\u0275text(20, "Produit");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th", 15);
      \u0275\u0275text(22, "Prix HT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th", 16);
      \u0275\u0275text(24, "Stock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th", 14);
      \u0275\u0275text(26, "Statut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th", 17);
      \u0275\u0275text(28, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "tbody");
      \u0275\u0275repeaterCreate(30, ArtisanProductsComponent_For_31_Template, 20, 15, "tr", 18, _forTrack0);
      \u0275\u0275conditionalCreate(32, ArtisanProductsComponent_Conditional_32_Template, 3, 0, "tr");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275conditionalCreate(33, ArtisanProductsComponent_Conditional_33_Template, 39, 10, "div", 19);
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Mes produits (", ctx.produits().length, ")");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.search);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(4, _c0));
      \u0275\u0275advance(18);
      \u0275\u0275repeater(ctx.filtered);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.filtered.length === 0 ? 32 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.dialogOpen ? 33 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtisanProductsComponent, [{
    type: Component,
    args: [{
      selector: "app-artisan-products",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 class="font-serif text-2xl font-bold">Mes produits ({{ produits().length }})</h1>
        <button (click)="openNew()" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
          + Ajouter un produit
        </button>
      </div>

      <!-- Filtres -->
      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative">
          <input [(ngModel)]="search" placeholder="Rechercher..." class="border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">\u{1F50D}</span>
        </div>
        <div class="flex gap-2">
          @for (f of ['all','active','inactive']; track f) {
            <button (click)="statusFilter = f"
                    [class]="statusFilter===f ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-3 py-1.5 rounded-full text-sm">
              {{ f==='all' ? 'Tous' : f==='active' ? 'Actifs' : 'Inactifs' }}
            </button>
          }
        </div>
      </div>

      <!-- Tableau -->
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Produit</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">Prix HT</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Stock</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (p of filtered; track p.id_produit) {
                <tr class="border-t hover:bg-gray-50 transition-colors" [class.opacity-50]="!p.actif">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        @if (p.image_principale) { <img [src]="getProductImageSrc(p.image_principale)" [alt]="p.nom" class="w-full h-full object-cover" /> }
                      </div>
                      <span class="font-medium truncate max-w-[180px]">{{ p.nom }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 hidden sm:table-cell">{{ p.prix_ht | number:'1.2-2' }} \u20AC</td>
                  <td class="px-4 py-3 hidden md:table-cell" [class.text-red-600]="p.stock===0">{{ p.stock }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs px-2 py-1 rounded-full" [class]="p.actif ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'">
                      {{ p.actif ? 'Actif' : 'Inactif' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <button (click)="openEdit(p)" class="text-gray-500 hover:text-amber-600 mr-2 text-sm">\u270F\uFE0F</button>
                    <button (click)="toggleActif(p)" class="text-gray-500 hover:text-gray-800 text-sm">
                      {{ p.actif ? '\u{1F441}\uFE0F' : '\u{1F6AB}' }}
                    </button>
                  </td>
                </tr>
              }
              @if (filtered.length === 0) {
                <tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Aucun produit</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Dialog Ajout/Modif -->
    @if (dialogOpen) {
      <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
          <h2 class="font-serif text-xl font-bold mb-4">{{ editing ? 'Modifier' : 'Ajouter' }} un produit</h2>
          <div class="space-y-4">
            <div><label class="text-sm font-medium">Nom</label>
              <input [(ngModel)]="form.nom" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
            <div><label class="text-sm font-medium">Description</label>
              <textarea [(ngModel)]="form.description" rows="3" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm"></textarea></div>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="text-sm font-medium">Prix HT (\u20AC)</label>
                <input type="number" step="0.01" [(ngModel)]="form.prix_ht" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
              <div><label class="text-sm font-medium">Stock</label>
                <input type="number" [(ngModel)]="form.stock" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
            </div>
            <div><label class="text-sm font-medium">Poids / Contenance</label>
              <input [(ngModel)]="form.poids" placeholder="ex: 500g" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Produit actif</label>
              <input type="checkbox" [(ngModel)]="form.actif" class="w-4 h-4 accent-amber-500" />
            </div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Mis en avant</label>
              <input type="checkbox" [(ngModel)]="form.mis_en_avant" class="w-4 h-4 accent-amber-500" />
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button (click)="dialogOpen=false" class="flex-1 border border-gray-200 rounded-xl py-2 text-sm">Annuler</button>
            <button (click)="save()" [disabled]="saving()" class="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-2 text-sm font-medium disabled:opacity-50">
              {{ saving() ? 'Enregistrement\u2026' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    }
  `
    }]
  }], () => [{ type: ProductService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtisanProductsComponent, { className: "ArtisanProductsComponent", filePath: "app/pages/artisan/products/artisan-products.component.ts", lineNumber: 125 });
})();
export {
  ArtisanProductsComponent
};
//# sourceMappingURL=chunk-NICKHXCO.js.map
