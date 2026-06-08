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
  RouterLink
} from "./chunk-BTJFPSWE.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  Input,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/shared/product-card/product-card.component.ts
var _c0 = (a0) => ["/produit", a0];
function ProductCardComponent_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 11);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.getProductImageSrc(ctx_r0.produit.image_principale), \u0275\u0275sanitizeUrl)("alt", ctx_r0.produit.nom);
  }
}
function ProductCardComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "path", 14);
    \u0275\u0275elementEnd()();
  }
}
function ProductCardComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 16);
    \u0275\u0275text(2, "Rupture de stock");
    \u0275\u0275elementEnd()();
  }
}
var ProductCardComponent = class _ProductCardComponent {
  cart;
  toast;
  produit;
  getProductImageSrc = getProductImageSrc;
  constructor(cart, toast) {
    this.cart = cart;
    this.toast = toast;
  }
  addToCart() {
    if (this.produit.stock === 0)
      return;
    this.cart.add(this.produit.id_produit, 1).subscribe({
      next: () => this.toast.success(`${this.produit.nom} ajout\xE9 au panier`),
      error: () => this.toast.error("Erreur lors de l'ajout au panier")
    });
  }
  static \u0275fac = function ProductCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductCardComponent)(\u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductCardComponent, selectors: [["app-product-card"]], inputs: { produit: "produit" }, decls: 17, vars: 15, consts: [["placeholder", ""], [1, "card", "overflow-hidden", "hover:shadow-md", "transition-shadow", "flex", "flex-col"], [1, "block", "aspect-square", "bg-gray-100", "overflow-hidden", 3, "routerLink"], ["class", "w-full h-full object-cover hover:scale-105 transition-transform duration-300", 3, "src", "alt", 4, "ngIf", "ngIfElse"], [1, "p-4", "flex", "flex-col", "flex-1"], [1, "text-xs", "text-gray-500", "mb-1"], [1, "font-medium", "text-sm", "leading-snug", "mb-2", "hover:text-amber-600", "line-clamp-2", 3, "routerLink"], [1, "mt-auto", "flex", "items-center", "justify-between"], [1, "font-bold", "text-amber-600"], [1, "text-xs", "bg-amber-500", "hover:bg-amber-600", "text-white", "px-3", "py-1.5", "rounded-lg", "transition-colors", 3, "click"], ["class", "mt-2", 4, "ngIf"], [1, "w-full", "h-full", "object-cover", "hover:scale-105", "transition-transform", "duration-300", 3, "src", "alt"], [1, "w-full", "h-full", "flex", "items-center", "justify-center", "text-gray-300"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-16", "h-16"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1", "d", "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"], [1, "mt-2"], [1, "text-xs", "text-red-600", "font-medium"]], template: function ProductCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "a", 2);
      \u0275\u0275template(2, ProductCardComponent_img_2_Template, 1, 2, "img", 3)(3, ProductCardComponent_ng_template_3_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "p", 5);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "a", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "span", 8);
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 9);
      \u0275\u0275listener("click", function ProductCardComponent_Template_button_click_14_listener() {
        return ctx.addToCart();
      });
      \u0275\u0275text(15, " + Panier ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(16, ProductCardComponent_div_16_Template, 3, 0, "div", 10);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const placeholder_r2 = \u0275\u0275reference(4);
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c0, ctx.produit.id_produit));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.produit.image_principale)("ngIfElse", placeholder_r2);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.produit.id_artisan);
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, ctx.produit.id_produit));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.produit.nom, " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(13, 8, ctx.produit.prix_ht, "1.2-2"), " \u20AC");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.produit.stock === 0);
    }
  }, dependencies: [CommonModule, NgIf, RouterLink, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductCardComponent, [{
    type: Component,
    args: [{
      selector: "app-product-card",
      standalone: true,
      imports: [CommonModule, RouterLink],
      template: `
    <div class="card overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <a [routerLink]="['/produit', produit.id_produit]" class="block aspect-square bg-gray-100 overflow-hidden">
        <img *ngIf="produit.image_principale; else placeholder"
             [src]="getProductImageSrc(produit.image_principale)" [alt]="produit.nom"
             class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        <ng-template #placeholder>
          <div class="w-full h-full flex items-center justify-center text-gray-300">
            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"/>
            </svg>
          </div>
        </ng-template>
      </a>
      <div class="p-4 flex flex-col flex-1">
        <p class="text-xs text-gray-500 mb-1">{{ produit.id_artisan }}</p>
        <a [routerLink]="['/produit', produit.id_produit]"
           class="font-medium text-sm leading-snug mb-2 hover:text-amber-600 line-clamp-2">
          {{ produit.nom }}
        </a>
        <div class="mt-auto flex items-center justify-between">
          <span class="font-bold text-amber-600">{{ produit.prix_ht | number:'1.2-2' }} \u20AC</span>
          <button (click)="addToCart()"
                  class="text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg transition-colors">
            + Panier
          </button>
        </div>
        <div *ngIf="produit.stock === 0" class="mt-2">
          <span class="text-xs text-red-600 font-medium">Rupture de stock</span>
        </div>
      </div>
    </div>
  `
    }]
  }], () => [{ type: CartService }, { type: ToastService }], { produit: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductCardComponent, { className: "ProductCardComponent", filePath: "app/shared/product-card/product-card.component.ts", lineNumber: 48 });
})();

export {
  ProductCardComponent
};
//# sourceMappingURL=chunk-V3IPBODC.js.map
