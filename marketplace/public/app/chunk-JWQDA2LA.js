import {
  AvisService
} from "./chunk-ER7DDSLU.js";
import {
  ProductCardComponent
} from "./chunk-V3IPBODC.js";
import {
  ProductService
} from "./chunk-NRTGAO5M.js";
import {
  ToastService
} from "./chunk-M6Z66CPB.js";
import {
  getProductImageSrc
} from "./chunk-BW22KM5Y.js";
import {
  CartService
} from "./chunk-PD2SCL3N.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-BTJFPSWE.js";
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/pages/product-detail/product-detail.component.ts
var _c0 = (a0) => ["/boutique", a0];
var _c1 = () => [1, 2, 3, 4, 5];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.id_avis;
var _forTrack2 = ($index, $item) => $item.id_produit;
function ProductDetailComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 7);
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1, "Produit non trouv\xE9");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 10);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.getProductImageSrc(ctx_r1.produit().image_principale), \u0275\u0275sanitizeUrl)("alt", ctx_r1.produit().nom);
  }
}
function ProductDetailComponent_Conditional_14_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1, "\u{1F4E6}");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_14_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Poids : ", ctx_r1.produit().poids);
  }
}
function ProductDetailComponent_Conditional_14_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2713 En stock (", ctx_r1.produit().stock, " disponibles)");
  }
}
function ProductDetailComponent_Conditional_14_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "Rupture de stock");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_14_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_14_For_32_Template_button_click_0_listener() {
      const tab_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeTab = tab_r4.id);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.activeTab === tab_r4.id ? "border-b-2 border-amber-500 text-amber-600 font-medium" : "text-gray-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r4.label);
  }
}
function ProductDetailComponent_Conditional_14_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.produit().description || "Aucune description.");
  }
}
function ProductDetailComponent_Conditional_14_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, "Livraison sous 3-5 jours ouvr\xE9s. Frais de port : 4,95 \u20AC (gratuit d\xE8s 50 \u20AC).");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_14_Conditional_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "Aucun avis pour le moment.");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_14_Conditional_35_For_3_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = ctx.$implicit;
    const a_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(i_r5 <= a_r6.note ? "text-amber-500" : "text-gray-200");
  }
}
function ProductDetailComponent_Conditional_14_Conditional_35_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34);
    \u0275\u0275repeaterCreate(2, ProductDetailComponent_Conditional_14_Conditional_35_For_3_For_3_Template, 2, 2, "span", 35, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r6.commentaire);
  }
}
function ProductDetailComponent_Conditional_14_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275conditionalCreate(1, ProductDetailComponent_Conditional_14_Conditional_35_Conditional_1_Template, 2, 0, "p", 32);
    \u0275\u0275repeaterCreate(2, ProductDetailComponent_Conditional_14_Conditional_35_For_3_Template, 6, 2, "div", 33, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.avis().length === 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.avis());
  }
}
function ProductDetailComponent_Conditional_14_Conditional_36_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 39);
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275property("produit", p_r7);
  }
}
function ProductDetailComponent_Conditional_14_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "h2", 37);
    \u0275\u0275text(2, "Vous aimerez aussi");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 38);
    \u0275\u0275repeaterCreate(4, ProductDetailComponent_Conditional_14_Conditional_36_For_5_Template, 1, 1, "app-product-card", 39, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.similar());
  }
}
function ProductDetailComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div")(2, "div", 9);
    \u0275\u0275conditionalCreate(3, ProductDetailComponent_Conditional_14_Conditional_3_Template, 1, 2, "img", 10)(4, ProductDetailComponent_Conditional_14_Conditional_4_Template, 2, 0, "div", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "a", 12);
    \u0275\u0275text(7, " Voir la boutique de l'artisan \u2192 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h1", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 14);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, ProductDetailComponent_Conditional_14_Conditional_13_Template, 2, 1, "p", 15);
    \u0275\u0275elementStart(14, "div", 16)(15, "span", 17);
    \u0275\u0275text(16, "Quantit\xE9 :");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 18)(18, "button", 19);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_14_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.qty = ctx_r1.qty > 1 ? ctx_r1.qty - 1 : 1);
    });
    \u0275\u0275text(19, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 20);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 19);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_14_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.qty = ctx_r1.qty + 1);
    });
    \u0275\u0275text(23, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 21)(25, "button", 22);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_14_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addToCart());
    });
    \u0275\u0275text(26, " \u{1F6D2} Ajouter au panier ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, ProductDetailComponent_Conditional_14_Conditional_27_Template, 2, 1, "span", 23)(28, ProductDetailComponent_Conditional_14_Conditional_28_Template, 2, 0, "span", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 25)(30, "div", 26);
    \u0275\u0275repeaterCreate(31, ProductDetailComponent_Conditional_14_For_32_Template, 2, 3, "button", 27, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(33, ProductDetailComponent_Conditional_14_Conditional_33_Template, 2, 1, "p", 28);
    \u0275\u0275conditionalCreate(34, ProductDetailComponent_Conditional_14_Conditional_34_Template, 2, 0, "p", 29);
    \u0275\u0275conditionalCreate(35, ProductDetailComponent_Conditional_14_Conditional_35_Template, 4, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(36, ProductDetailComponent_Conditional_14_Conditional_36_Template, 6, 0, "section");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.produit().image_principale ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(15, _c0, ctx_r1.produit().id_artisan));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.produit().nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(12, 12, ctx_r1.produit().prix_ht, "1.2-2"), " \u20AC HT");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.produit().poids ? 13 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.qty);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.produit().stock === 0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.produit().stock > 0 ? 27 : 28);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.tabs);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.activeTab === "description" ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTab === "livraison" ? 34 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTab === "avis" ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.similar().length > 0 ? 36 : -1);
  }
}
var ProductDetailComponent = class _ProductDetailComponent {
  route;
  productSvc;
  avisSvc;
  cart;
  toast;
  produit = signal(null, ...ngDevMode ? [{ debugName: "produit" }] : (
    /* istanbul ignore next */
    []
  ));
  avis = signal([], ...ngDevMode ? [{ debugName: "avis" }] : (
    /* istanbul ignore next */
    []
  ));
  similar = signal([], ...ngDevMode ? [{ debugName: "similar" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  qty = 1;
  getProductImageSrc = getProductImageSrc;
  activeTab = "description";
  tabs = [
    { id: "description", label: "Description" },
    { id: "livraison", label: "Livraison" },
    { id: "avis", label: "Avis" }
  ];
  constructor(route, productSvc, avisSvc, cart, toast) {
    this.route = route;
    this.productSvc = productSvc;
    this.avisSvc = avisSvc;
    this.cart = cart;
    this.toast = toast;
  }
  ngOnInit() {
    this.route.params.subscribe((p) => {
      const id = +p["id"];
      this.productSvc.getById(id).subscribe({
        next: (prod) => {
          this.produit.set(prod);
          this.loading.set(false);
          this.avisSvc.getByProduit(id).subscribe((a) => this.avis.set(a.filter((x) => x.statut === "approved")));
          this.productSvc.getAll().subscribe((all) => this.similar.set(all.filter((x) => x.actif && x.id_produit !== id).slice(0, 3)));
        },
        error: () => this.loading.set(false)
      });
    });
  }
  addToCart() {
    const p = this.produit();
    if (!p)
      return;
    this.cart.add(p.id_produit, this.qty).subscribe({
      next: () => this.toast.success(`${this.qty}\xD7 ${p.nom} ajout\xE9 au panier`),
      error: () => this.toast.error("Erreur ajout panier")
    });
  }
  static \u0275fac = function ProductDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(AvisService), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], decls: 15, vars: 2, consts: [[1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "py-6"], [1, "flex", "items-center", "gap-2", "text-sm", "text-gray-500", "mb-8"], ["routerLink", "/home", 1, "hover:text-gray-900"], ["routerLink", "/catalogue", 1, "hover:text-gray-900"], [1, "text-gray-900", "font-medium", "truncate"], [1, "flex", "justify-center", "py-20"], [1, "text-center", "py-20", "text-gray-500"], [1, "spinner"], [1, "grid", "md:grid-cols-2", "gap-10", "mb-16"], [1, "aspect-square", "rounded-2xl", "bg-gray-100", "overflow-hidden", "mb-4"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "w-full", "h-full", "flex", "items-center", "justify-center", "text-gray-300", "text-8xl"], [1, "text-sm", "text-amber-600", "hover:underline", "mb-2", "block", 3, "routerLink"], [1, "font-serif", "text-3xl", "font-bold", "mb-3"], [1, "text-3xl", "font-bold", "text-amber-600", "mb-4"], [1, "text-sm", "text-gray-500", "mb-4"], [1, "flex", "items-center", "gap-3", "mb-6"], [1, "text-sm", "text-gray-500"], [1, "flex", "items-center", "border", "rounded-lg", "overflow-hidden"], [1, "px-3", "py-2", "hover:bg-gray-50", 3, "click"], [1, "px-4", "font-medium"], [1, "space-y-3", "mb-6"], [1, "w-full", "bg-amber-500", "hover:bg-amber-600", "disabled:bg-gray-300", "text-white", "py-3", "rounded-xl", "font-medium", "transition-colors", 3, "click", "disabled"], [1, "text-sm", "text-green-700", "bg-green-50", "px-3", "py-1", "rounded-full"], [1, "text-sm", "text-red-700", "bg-red-50", "px-3", "py-1", "rounded-full"], [1, "mb-16"], [1, "flex", "gap-2", "border-b", "mb-6"], [1, "px-4", "py-2", "text-sm", "transition-colors", 3, "class"], [1, "text-gray-600", "leading-relaxed", "max-w-2xl"], [1, "text-gray-600", "max-w-2xl"], [1, "space-y-4", "max-w-2xl"], [1, "px-4", "py-2", "text-sm", "transition-colors", 3, "click"], [1, "text-gray-500"], [1, "card", "p-4"], [1, "flex", "gap-0.5", "mb-2"], [3, "class"], [1, "text-sm", "text-gray-600"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-6"], [3, "produit"]], template: function ProductDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "a", 2);
      \u0275\u0275text(3, "Accueil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span");
      \u0275\u0275text(5, "\u203A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 3);
      \u0275\u0275text(7, "Catalogue");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span");
      \u0275\u0275text(9, "\u203A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 4);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, ProductDetailComponent_Conditional_12_Template, 2, 0, "div", 5)(13, ProductDetailComponent_Conditional_13_Template, 2, 0, "div", 6)(14, ProductDetailComponent_Conditional_14_Template, 37, 17);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate((tmp_0_0 = ctx.produit()) == null ? null : tmp_0_0.nom);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 12 : !ctx.produit() ? 13 : 14);
    }
  }, dependencies: [CommonModule, RouterLink, ProductCardComponent, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductDetailComponent, [{
    type: Component,
    args: [{
      selector: "app-product-detail",
      standalone: true,
      imports: [CommonModule, RouterLink, ProductCardComponent],
      template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a routerLink="/home" class="hover:text-gray-900">Accueil</a><span>\u203A</span>
        <a routerLink="/catalogue" class="hover:text-gray-900">Catalogue</a><span>\u203A</span>
        <span class="text-gray-900 font-medium truncate">{{ produit()?.nom }}</span>
      </nav>

      @if (loading()) {
        <div class="flex justify-center py-20"><div class="spinner"></div></div>
      } @else if (!produit()) {
        <div class="text-center py-20 text-gray-500">Produit non trouv\xE9</div>
      } @else {
        <div class="grid md:grid-cols-2 gap-10 mb-16">
          <!-- Image -->
          <div>
            <div class="aspect-square rounded-2xl bg-gray-100 overflow-hidden mb-4">
              @if (produit()!.image_principale) {
                <img [src]="getProductImageSrc(produit()!.image_principale)" [alt]="produit()!.nom" class="w-full h-full object-cover" />
              } @else {
                <div class="w-full h-full flex items-center justify-center text-gray-300 text-8xl">\u{1F4E6}</div>
              }
            </div>
          </div>

          <!-- Infos -->
          <div>
            <a [routerLink]="['/boutique', produit()!.id_artisan]" class="text-sm text-amber-600 hover:underline mb-2 block">
              Voir la boutique de l'artisan \u2192
            </a>
            <h1 class="font-serif text-3xl font-bold mb-3">{{ produit()!.nom }}</h1>
            <p class="text-3xl font-bold text-amber-600 mb-4">{{ produit()!.prix_ht | number:'1.2-2' }} \u20AC HT</p>
            @if (produit()!.poids) {
              <p class="text-sm text-gray-500 mb-4">Poids : {{ produit()!.poids }}</p>
            }

            <!-- Quantit\xE9 -->
            <div class="flex items-center gap-3 mb-6">
              <span class="text-sm text-gray-500">Quantit\xE9 :</span>
              <div class="flex items-center border rounded-lg overflow-hidden">
                <button (click)="qty = qty > 1 ? qty-1 : 1" class="px-3 py-2 hover:bg-gray-50">\u2212</button>
                <span class="px-4 font-medium">{{ qty }}</span>
                <button (click)="qty = qty+1" class="px-3 py-2 hover:bg-gray-50">+</button>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <button (click)="addToCart()" [disabled]="produit()!.stock === 0"
                      class="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition-colors">
                \u{1F6D2} Ajouter au panier
              </button>
            </div>

            @if (produit()!.stock > 0) {
              <span class="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">\u2713 En stock ({{ produit()!.stock }} disponibles)</span>
            } @else {
              <span class="text-sm text-red-700 bg-red-50 px-3 py-1 rounded-full">Rupture de stock</span>
            }
          </div>
        </div>

        <!-- Tabs -->
        <div class="mb-16">
          <div class="flex gap-2 border-b mb-6">
            @for (tab of tabs; track tab.id) {
              <button (click)="activeTab = tab.id"
                      [class]="activeTab===tab.id ? 'border-b-2 border-amber-500 text-amber-600 font-medium' : 'text-gray-500'"
                      class="px-4 py-2 text-sm transition-colors">{{ tab.label }}</button>
            }
          </div>

          @if (activeTab === 'description') {
            <p class="text-gray-600 leading-relaxed max-w-2xl">{{ produit()!.description || 'Aucune description.' }}</p>
          }
          @if (activeTab === 'livraison') {
            <p class="text-gray-600 max-w-2xl">Livraison sous 3-5 jours ouvr\xE9s. Frais de port : 4,95 \u20AC (gratuit d\xE8s 50 \u20AC).</p>
          }
          @if (activeTab === 'avis') {
            <div class="space-y-4 max-w-2xl">
              @if (avis().length === 0) {
                <p class="text-gray-500">Aucun avis pour le moment.</p>
              }
              @for (a of avis(); track a.id_avis) {
                <div class="card p-4">
                  <div class="flex gap-0.5 mb-2">
                    @for (i of [1,2,3,4,5]; track i) {
                      <span [class]="i <= a.note ? 'text-amber-500' : 'text-gray-200'">\u2605</span>
                    }
                  </div>
                  <p class="text-sm text-gray-600">{{ a.commentaire }}</p>
                </div>
              }
            </div>
          }
        </div>

        <!-- Similaires -->
        @if (similar().length > 0) {
          <section>
            <h2 class="font-serif text-2xl font-bold mb-6">Vous aimerez aussi</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (p of similar(); track p.id_produit) {
                <app-product-card [produit]="p" />
              }
            </div>
          </section>
        }
      }
    </div>
  `
    }]
  }], () => [{ type: ActivatedRoute }, { type: ProductService }, { type: AvisService }, { type: CartService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent", filePath: "app/pages/product-detail/product-detail.component.ts", lineNumber: 128 });
})();
export {
  ProductDetailComponent
};
//# sourceMappingURL=chunk-JWQDA2LA.js.map
