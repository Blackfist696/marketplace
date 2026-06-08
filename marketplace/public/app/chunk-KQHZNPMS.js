import {
  AuthService
} from "./chunk-QDW2YG4J.js";
import {
  getProductImageSrc
} from "./chunk-BW22KM5Y.js";
import {
  CartService
} from "./chunk-PD2SCL3N.js";
import {
  Router,
  RouterLink
} from "./chunk-BTJFPSWE.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/pages/cart/cart.component.ts
var _forTrack0 = ($index, $item) => $item.id_produit;
function CartComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275text(2, "\u{1F6D2}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 3);
    \u0275\u0275text(4, "Votre panier est vide");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 4);
    \u0275\u0275text(6, "Explorez notre catalogue pour trouver votre bonheur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 5);
    \u0275\u0275text(8, " D\xE9couvrir nos produits ");
    \u0275\u0275elementEnd()();
  }
}
function CartComponent_Conditional_2_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 19);
  }
  if (rf & 2) {
    const line_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r3.getProductImageSrc(line_r3.produit.image_principale), \u0275\u0275sanitizeUrl)("alt", line_r3.produit.nom);
  }
}
function CartComponent_Conditional_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 18);
    \u0275\u0275conditionalCreate(2, CartComponent_Conditional_2_For_5_Conditional_2_Template, 1, 2, "img", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "div", 21)(5, "div")(6, "p", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 23);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 24)(12, "div", 25)(13, "button", 26);
    \u0275\u0275listener("click", function CartComponent_Conditional_2_For_5_Template_button_click_13_listener() {
      const line_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateQty(line_r3.id_produit, line_r3.quantite - 1));
    });
    \u0275\u0275text(14, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 27);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 26);
    \u0275\u0275listener("click", function CartComponent_Conditional_2_For_5_Template_button_click_17_listener() {
      const line_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateQty(line_r3.id_produit, line_r3.quantite + 1));
    });
    \u0275\u0275text(18, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 28);
    \u0275\u0275listener("click", function CartComponent_Conditional_2_For_5_Template_button_click_19_listener() {
      const line_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.remove(line_r3.id_produit));
    });
    \u0275\u0275text(20, "\u{1F5D1} Supprimer");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const line_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(line_r3.produit.image_principale ? 2 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(line_r3.produit.nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(10, 4, line_r3.produit.prix_ht * line_r3.quantite, "1.2-2"), " \u20AC");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(line_r3.quantite);
  }
}
function CartComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h1", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 7)(3, "div", 8);
    \u0275\u0275repeaterCreate(4, CartComponent_Conditional_2_For_5_Template, 21, 7, "div", 9, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "div", 10)(8, "h2", 11);
    \u0275\u0275text(9, "R\xE9capitulatif");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 12)(11, "div", 13)(12, "span", 14);
    \u0275\u0275text(13, "Sous-total HT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 13)(18, "span", 14);
    \u0275\u0275text(19, "TVA (21%)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 13)(24, "span", 14);
    \u0275\u0275text(25, "Livraison");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(28, "hr");
    \u0275\u0275elementStart(29, "div", 15)(30, "span");
    \u0275\u0275text(31, "Total TTC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "button", 16);
    \u0275\u0275listener("click", function CartComponent_Conditional_2_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.checkout());
    });
    \u0275\u0275text(36, " Passer commande ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "a", 17);
    \u0275\u0275text(38, " \u2190 Continuer mes achats ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Mon panier (", ctx_r3.cart.count(), " articles)");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r3.cart.lines());
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(16, 5, ctx_r3.cart.total(), "1.2-2"), " \u20AC");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(22, 8, ctx_r3.cart.total() * 0.21, "1.2-2"), " \u20AC");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.cart.total() > 50 ? "Gratuite" : "4,95 \u20AC");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(34, 11, ctx_r3.total(), "1.2-2"), " \u20AC");
  }
}
var CartComponent = class _CartComponent {
  cart;
  auth;
  router;
  getProductImageSrc = getProductImageSrc;
  constructor(cart, auth, router) {
    this.cart = cart;
    this.auth = auth;
    this.router = router;
  }
  ngOnInit() {
    this.cart.load().subscribe();
  }
  updateQty(id, qty) {
    this.cart.updateQty(id, qty).subscribe();
  }
  remove(id) {
    this.cart.remove(id).subscribe();
  }
  total() {
    const sub = this.cart.total();
    const tva = sub * 0.21;
    const ship = sub > 50 ? 0 : sub > 0 ? 4.95 : 0;
    return sub + tva + ship;
  }
  checkout() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return;
    }
    this.router.navigate(["/commande"]);
  }
  static \u0275fac = function CartComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CartComponent)(\u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CartComponent, selectors: [["app-cart"]], decls: 3, vars: 1, consts: [[1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "py-6"], [1, "text-center", "py-20"], [1, "text-6xl", "mb-4"], [1, "font-serif", "text-2xl", "font-bold", "mb-2"], [1, "text-gray-500", "mb-6"], ["routerLink", "/catalogue", 1, "bg-amber-500", "hover:bg-amber-600", "text-white", "px-8", "py-3", "rounded-full", "inline-block"], [1, "font-serif", "text-3xl", "font-bold", "mb-8"], [1, "grid", "lg:grid-cols-3", "gap-8"], [1, "lg:col-span-2", "space-y-4"], [1, "card", "p-4", "flex", "gap-4"], [1, "card", "p-6", "sticky", "top-24"], [1, "font-semibold", "text-lg", "mb-4"], [1, "space-y-2", "text-sm", "mb-4"], [1, "flex", "justify-between"], [1, "text-gray-500"], [1, "flex", "justify-between", "font-bold", "text-base"], [1, "w-full", "bg-amber-500", "hover:bg-amber-600", "text-white", "py-3", "rounded-xl", "font-medium", "transition-colors", 3, "click"], ["routerLink", "/catalogue", 1, "block", "text-center", "mt-3", "text-sm", "text-gray-500", "hover:text-gray-700"], [1, "w-20", "h-20", "rounded-xl", "bg-gray-100", "overflow-hidden", "shrink-0"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "flex-1", "min-w-0"], [1, "flex", "justify-between", "items-start"], [1, "font-medium", "text-sm"], [1, "font-bold", "ml-2", "whitespace-nowrap"], [1, "flex", "items-center", "justify-between", "mt-3"], [1, "flex", "items-center", "border", "rounded-lg", "overflow-hidden"], [1, "px-3", "py-1.5", "hover:bg-gray-50", "text-sm", 3, "click"], [1, "px-3", "text-sm", "font-medium"], [1, "text-red-500", "hover:text-red-700", "text-sm", 3, "click"]], template: function CartComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, CartComponent_Conditional_1_Template, 9, 0, "div", 1)(2, CartComponent_Conditional_2_Template, 39, 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.cart.lines().length === 0 ? 1 : 2);
    }
  }, dependencies: [CommonModule, RouterLink, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CartComponent, [{
    type: Component,
    args: [{
      selector: "app-cart",
      standalone: true,
      imports: [CommonModule, RouterLink],
      template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      @if (cart.lines().length === 0) {
        <div class="text-center py-20">
          <div class="text-6xl mb-4">\u{1F6D2}</div>
          <h1 class="font-serif text-2xl font-bold mb-2">Votre panier est vide</h1>
          <p class="text-gray-500 mb-6">Explorez notre catalogue pour trouver votre bonheur</p>
          <a routerLink="/catalogue" class="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full inline-block">
            D\xE9couvrir nos produits
          </a>
        </div>
      } @else {
        <h1 class="font-serif text-3xl font-bold mb-8">Mon panier ({{ cart.count() }} articles)</h1>
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Articles -->
          <div class="lg:col-span-2 space-y-4">
            @for (line of cart.lines(); track line.id_produit) {
              <div class="card p-4 flex gap-4">
                <div class="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  @if (line.produit.image_principale) {
                    <img [src]="getProductImageSrc(line.produit.image_principale)" [alt]="line.produit.nom" class="w-full h-full object-cover" />
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium text-sm">{{ line.produit.nom }}</p>
                    </div>
                    <p class="font-bold ml-2 whitespace-nowrap">{{ (line.produit.prix_ht * line.quantite) | number:'1.2-2' }} \u20AC</p>
                  </div>
                  <div class="flex items-center justify-between mt-3">
                    <div class="flex items-center border rounded-lg overflow-hidden">
                      <button (click)="updateQty(line.id_produit, line.quantite-1)" class="px-3 py-1.5 hover:bg-gray-50 text-sm">\u2212</button>
                      <span class="px-3 text-sm font-medium">{{ line.quantite }}</span>
                      <button (click)="updateQty(line.id_produit, line.quantite+1)" class="px-3 py-1.5 hover:bg-gray-50 text-sm">+</button>
                    </div>
                    <button (click)="remove(line.id_produit)" class="text-red-500 hover:text-red-700 text-sm">\u{1F5D1} Supprimer</button>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- R\xE9cap -->
          <div>
            <div class="card p-6 sticky top-24">
              <h2 class="font-semibold text-lg mb-4">R\xE9capitulatif</h2>
              <div class="space-y-2 text-sm mb-4">
                <div class="flex justify-between"><span class="text-gray-500">Sous-total HT</span><span>{{ cart.total() | number:'1.2-2' }} \u20AC</span></div>
                <div class="flex justify-between"><span class="text-gray-500">TVA (21%)</span><span>{{ cart.total() * 0.21 | number:'1.2-2' }} \u20AC</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Livraison</span><span>{{ cart.total() > 50 ? 'Gratuite' : '4,95 \u20AC' }}</span></div>
                <hr />
                <div class="flex justify-between font-bold text-base">
                  <span>Total TTC</span>
                  <span>{{ total() | number:'1.2-2' }} \u20AC</span>
                </div>
              </div>
              <button (click)="checkout()" class="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-medium transition-colors">
                Passer commande
              </button>
              <a routerLink="/catalogue" class="block text-center mt-3 text-sm text-gray-500 hover:text-gray-700">
                \u2190 Continuer mes achats
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `
    }]
  }], () => [{ type: CartService }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CartComponent, { className: "CartComponent", filePath: "app/pages/cart/cart.component.ts", lineNumber: 82 });
})();
export {
  CartComponent
};
//# sourceMappingURL=chunk-KQHZNPMS.js.map
