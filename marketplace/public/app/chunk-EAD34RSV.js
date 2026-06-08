import {
  ArtisanService
} from "./chunk-AZ4XTC6P.js";
import {
  AvisService
} from "./chunk-ER7DDSLU.js";
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
  ActivatedRoute
} from "./chunk-BTJFPSWE.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  DatePipe,
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
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/pages/artisan-shop/artisan-shop.component.ts
var _c0 = () => [1, 2, 3, 4, 5];
var _forTrack0 = ($index, $item) => $item.id_produit;
var _forTrack1 = ($index, $item) => $item.id_avis;
function ArtisanShopComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 2);
    \u0275\u0275elementEnd();
  }
}
function ArtisanShopComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1, "Artisan non trouv\xE9");
    \u0275\u0275elementEnd();
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 9);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.artisan().logo, \u0275\u0275sanitizeUrl)("alt", ctx_r0.artisan().nom_boutique);
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.artisan().nom_boutique[0], " ");
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4C5} Membre depuis ", \u0275\u0275pipeBind2(2, 1, ctx_r0.artisan().date_validation, "yyyy"));
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "h2", 19);
    \u0275\u0275text(2, "Notre histoire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.artisan().description);
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_18_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function ArtisanShopComponent_Conditional_2_Conditional_18_For_4_Template_button_click_0_listener() {
      const cat_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.activeFilter.set(cat_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r0.activeFilter() === cat_r4 ? "bg-amber-500 text-white" : "border border-gray-200 text-gray-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r4);
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "button", 21);
    \u0275\u0275listener("click", function ArtisanShopComponent_Conditional_2_Conditional_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activeFilter.set(""));
    });
    \u0275\u0275text(2, "Tous");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ArtisanShopComponent_Conditional_2_Conditional_18_For_4_Template, 2, 3, "button", 22, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.activeFilter() === "" ? "bg-amber-500 text-white" : "border border-gray-200 text-gray-600");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.categories());
  }
}
function ArtisanShopComponent_Conditional_2_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 17);
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275property("produit", p_r5);
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_22_For_5_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r6 = ctx.$implicit;
    const a_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(i_r6 <= a_r7.note ? "text-amber-500" : "text-gray-200");
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_22_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27);
    \u0275\u0275repeaterCreate(2, ArtisanShopComponent_Conditional_2_Conditional_22_For_5_For_3_Template, 2, 2, "span", 28, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 29);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.commentaire);
  }
}
function ArtisanShopComponent_Conditional_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 18)(1, "h2", 24);
    \u0275\u0275text(2, "Ce que disent nos clients");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25);
    \u0275\u0275repeaterCreate(4, ArtisanShopComponent_Conditional_2_Conditional_22_For_5_Template, 6, 2, "div", 26, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.avis().slice(0, 3));
  }
}
function ArtisanShopComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 5)(3, "div", 6)(4, "div", 7)(5, "div", 8);
    \u0275\u0275conditionalCreate(6, ArtisanShopComponent_Conditional_2_Conditional_6_Template, 1, 2, "img", 9)(7, ArtisanShopComponent_Conditional_2_Conditional_7_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 10)(9, "h1", 11);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 12);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(13, "div", 13)(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, ArtisanShopComponent_Conditional_2_Conditional_16_Template, 3, 4, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, ArtisanShopComponent_Conditional_2_Conditional_17_Template, 5, 1, "div", 14);
    \u0275\u0275conditionalCreate(18, ArtisanShopComponent_Conditional_2_Conditional_18_Template, 5, 2, "div", 15);
    \u0275\u0275elementStart(19, "div", 16);
    \u0275\u0275repeaterCreate(20, ArtisanShopComponent_Conditional_2_For_21_Template, 1, 1, "app-product-card", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(22, ArtisanShopComponent_Conditional_2_Conditional_22_Template, 6, 0, "section", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.artisan().logo ? 6 : 7);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.artisan().nom_boutique);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.artisan().description) == null ? null : tmp_3_0.slice(0, 80));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4E6} ", ctx_r0.produits().length, " produits");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.artisan().date_validation ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.artisan().description ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.categories().length > 0 ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.filteredProduits());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.avis().length > 0 ? 22 : -1);
  }
}
var ArtisanShopComponent = class _ArtisanShopComponent {
  route;
  artisanSvc;
  productSvc;
  avisSvc;
  artisan = signal(null, ...ngDevMode ? [{ debugName: "artisan" }] : (
    /* istanbul ignore next */
    []
  ));
  produits = signal([], ...ngDevMode ? [{ debugName: "produits" }] : (
    /* istanbul ignore next */
    []
  ));
  avis = signal([], ...ngDevMode ? [{ debugName: "avis" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  activeFilter = signal("", ...ngDevMode ? [{ debugName: "activeFilter" }] : (
    /* istanbul ignore next */
    []
  ));
  categories = signal([], ...ngDevMode ? [{ debugName: "categories" }] : (
    /* istanbul ignore next */
    []
  ));
  filteredProduits = computed(() => {
    const f = this.activeFilter();
    return f ? this.produits().filter((p) => p.categorie === f) : this.produits();
  }, ...ngDevMode ? [{ debugName: "filteredProduits" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(route, artisanSvc, productSvc, avisSvc) {
    this.route = route;
    this.artisanSvc = artisanSvc;
    this.productSvc = productSvc;
    this.avisSvc = avisSvc;
  }
  ngOnInit() {
    this.route.params.subscribe((p) => {
      const id = +p["id"];
      this.artisanSvc.getById(id).subscribe({
        next: (a) => {
          this.artisan.set(a);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
      this.productSvc.getByArtisan(id).subscribe((ps) => {
        const active = ps.filter((p2) => p2.actif);
        this.produits.set(active);
        const cats = [...new Set(active.map((p2) => p2.categorie).filter(Boolean))];
        this.categories.set(cats);
      });
    });
  }
  static \u0275fac = function ArtisanShopComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtisanShopComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ArtisanService), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(AvisService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtisanShopComponent, selectors: [["app-artisan-shop"]], decls: 3, vars: 1, consts: [[1, "flex", "justify-center", "py-20"], [1, "text-center", "py-20", "text-gray-500"], [1, "spinner"], [1, "h-44", "md:h-56", "bg-gradient-to-br", "from-amber-100", "to-yellow-200", "relative", "overflow-hidden"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-black/30", "to-transparent"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8"], [1, "relative", "-mt-12", "mb-8"], [1, "flex", "items-end", "gap-4"], [1, "w-24", "h-24", "rounded-2xl", "bg-white", "border-4", "border-white", "shadow-lg", "overflow-hidden", "shrink-0", "flex", "items-center", "justify-center", "font-serif", "text-3xl", "text-amber-600"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "pb-1"], [1, "font-serif", "text-2xl", "md:text-3xl", "font-bold"], [1, "text-gray-500", "text-sm"], [1, "flex", "flex-wrap", "gap-4", "mb-8", "text-sm", "text-gray-500"], [1, "mb-10", "max-w-2xl"], [1, "flex", "flex-wrap", "gap-2", "mb-8"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-6", "mb-16"], [3, "produit"], [1, "mb-16"], [1, "font-serif", "text-xl", "font-bold", "mb-3"], [1, "text-gray-600", "leading-relaxed"], [1, "px-4", "py-1.5", "rounded-full", "text-sm", "transition-colors", 3, "click"], [1, "px-4", "py-1.5", "rounded-full", "text-sm", "capitalize", "transition-colors", 3, "class"], [1, "px-4", "py-1.5", "rounded-full", "text-sm", "capitalize", "transition-colors", 3, "click"], [1, "font-serif", "text-xl", "font-bold", "mb-6"], [1, "grid", "md:grid-cols-3", "gap-4"], [1, "card", "p-5"], [1, "flex", "gap-0.5", "mb-2"], [3, "class"], [1, "text-sm", "text-gray-600", "mb-3", "line-clamp-3"]], template: function ArtisanShopComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ArtisanShopComponent_Conditional_0_Template, 2, 0, "div", 0)(1, ArtisanShopComponent_Conditional_1_Template, 2, 0, "div", 1)(2, ArtisanShopComponent_Conditional_2_Template, 23, 8);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.loading() ? 0 : !ctx.artisan() ? 1 : 2);
    }
  }, dependencies: [CommonModule, ProductCardComponent, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtisanShopComponent, [{
    type: Component,
    args: [{
      selector: "app-artisan-shop",
      standalone: true,
      imports: [CommonModule, ProductCardComponent],
      template: `
    @if (loading()) {
      <div class="flex justify-center py-20"><div class="spinner"></div></div>
    } @else if (!artisan()) {
      <div class="text-center py-20 text-gray-500">Artisan non trouv\xE9</div>
    } @else {
      <!-- Banni\xE8re -->
      <div class="h-44 md:h-56 bg-gradient-to-br from-amber-100 to-yellow-200 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Infos artisan -->
        <div class="relative -mt-12 mb-8">
          <div class="flex items-end gap-4">
            <div class="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden shrink-0 flex items-center justify-center font-serif text-3xl text-amber-600">
              @if (artisan()!.logo) {
                <img [src]="artisan()!.logo" [alt]="artisan()!.nom_boutique" class="w-full h-full object-cover" />
              } @else {
                {{ artisan()!.nom_boutique[0] }}
              }
            </div>
            <div class="pb-1">
              <h1 class="font-serif text-2xl md:text-3xl font-bold">{{ artisan()!.nom_boutique }}</h1>
              <p class="text-gray-500 text-sm">{{ artisan()!.description?.slice(0,80) }}</p>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-4 mb-8 text-sm text-gray-500">
          <span>\u{1F4E6} {{ produits().length }} produits</span>
          @if (artisan()!.date_validation) {
            <span>\u{1F4C5} Membre depuis {{ artisan()!.date_validation | date:'yyyy' }}</span>
          }
        </div>

        <!-- Description -->
        @if (artisan()!.description) {
          <div class="mb-10 max-w-2xl">
            <h2 class="font-serif text-xl font-bold mb-3">Notre histoire</h2>
            <p class="text-gray-600 leading-relaxed">{{ artisan()!.description }}</p>
          </div>
        }

        <!-- Filtres cat\xE9gories -->
        @if (categories().length > 0) {
          <div class="flex flex-wrap gap-2 mb-8">
            <button (click)="activeFilter.set('')"
                    [class]="activeFilter()==='' ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-4 py-1.5 rounded-full text-sm transition-colors">Tous</button>
            @for (cat of categories(); track cat) {
              <button (click)="activeFilter.set(cat)"
                      [class]="activeFilter()===cat ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                      class="px-4 py-1.5 rounded-full text-sm capitalize transition-colors">{{ cat }}</button>
            }
          </div>
        }

        <!-- Produits -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          @for (p of filteredProduits(); track p.id_produit) {
            <app-product-card [produit]="p" />
          }
        </div>

        <!-- Avis -->
        @if (avis().length > 0) {
          <section class="mb-16">
            <h2 class="font-serif text-xl font-bold mb-6">Ce que disent nos clients</h2>
            <div class="grid md:grid-cols-3 gap-4">
              @for (a of avis().slice(0,3); track a.id_avis) {
                <div class="card p-5">
                  <div class="flex gap-0.5 mb-2">
                    @for (i of [1,2,3,4,5]; track i) {
                      <span [class]="i<=a.note ? 'text-amber-500' : 'text-gray-200'">\u2605</span>
                    }
                  </div>
                  <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ a.commentaire }}</p>
                </div>
              }
            </div>
          </section>
        }
      </div>
    }
  `
    }]
  }], () => [{ type: ActivatedRoute }, { type: ArtisanService }, { type: ProductService }, { type: AvisService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtisanShopComponent, { className: "ArtisanShopComponent", filePath: "app/pages/artisan-shop/artisan-shop.component.ts", lineNumber: 102 });
})();
export {
  ArtisanShopComponent
};
//# sourceMappingURL=chunk-EAD34RSV.js.map
