import {
  ArtisanService
} from "./chunk-AZ4XTC6P.js";
import {
  CATEGORY_LABELS
} from "./chunk-EFSXKDVI.js";
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
  RouterLink
} from "./chunk-BTJFPSWE.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-HBZS45XM.js";

// src/app/pages/home/home.component.ts
var _c0 = () => ["/catalogue"];
var _c1 = (a0) => ({ category: a0 });
var _c2 = (a0) => ["/boutique", a0];
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id_artisan;
var _forTrack2 = ($index, $item) => $item.id_produit;
function HomeComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8)(1, "p", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(4, _c0))("queryParams", \u0275\u0275pureFunction1(5, _c1, cat_r1.label));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r1.emoji);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r1.label);
  }
}
function HomeComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "div", 20);
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_Conditional_19_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 21);
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    \u0275\u0275property("produit", p_r2);
  }
}
function HomeComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, HomeComponent_Conditional_19_For_2_Template, 1, 1, "app-product-card", 21, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 22)(4, "a", 23);
    \u0275\u0275text(5, "Voir tous les produits \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.featured());
  }
}
function HomeComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 13)(1, "div", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "p", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 26);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r4 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c2, a_r4.id_artisan));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", a_r4.nom_boutique[0], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r4.nom_boutique);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", a_r4.description == null ? null : a_r4.description.slice(0, 60), "", a_r4.description && a_r4.description.length > 60 ? "\u2026" : "");
  }
}
var HomeComponent = class _HomeComponent {
  productSvc;
  artisanSvc;
  featured = signal([], ...ngDevMode ? [{ debugName: "featured" }] : (
    /* istanbul ignore next */
    []
  ));
  artisans = signal([], ...ngDevMode ? [{ debugName: "artisans" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  categories = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
    key,
    label,
    emoji: { miels: "\u{1F36F}", savons: "\u{1F9FC}", confiseries: "\u{1F36C}", cosmetiques: "\u{1F484}", bougies: "\u{1F56F}\uFE0F", pollen: "\u{1F33C}", propolis: "\u{1FAD9}", coffrets: "\u{1F381}" }[key] ?? "\u{1F6CD}\uFE0F"
  }));
  constructor(productSvc, artisanSvc) {
    this.productSvc = productSvc;
    this.artisanSvc = artisanSvc;
  }
  ngOnInit() {
    this.productSvc.getAll().subscribe((products) => {
      this.featured.set(products.filter((p) => p.mis_en_avant && p.actif).slice(0, 6));
      this.loading.set(false);
    });
    this.artisanSvc.getAll().subscribe((a) => this.artisans.set(a.slice(0, 6)));
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(ArtisanService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 49, vars: 1, consts: [[1, "bg-gradient-to-br", "from-amber-50", "to-yellow-100", "py-20", "px-4", "text-center"], [1, "font-serif", "text-4xl", "md:text-5xl", "font-bold", "text-gray-900", "mb-4"], [1, "text-amber-600"], [1, "text-gray-600", "max-w-xl", "mx-auto", "mb-8"], ["routerLink", "/catalogue", 1, "inline-block", "bg-amber-500", "hover:bg-amber-600", "text-white", "px-8", "py-3", "rounded-full", "font-medium", "transition-colors"], [1, "max-w-7xl", "mx-auto", "px-4", "py-12"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-2", "sm:grid-cols-4", "gap-4"], [1, "card", "p-5", "text-center", "hover:border-amber-400", "hover:shadow", "transition-all", "cursor-pointer", 3, "routerLink", "queryParams"], [1, "flex", "justify-center", "py-12"], [1, "bg-amber-50", "py-12"], [1, "max-w-7xl", "mx-auto", "px-4"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "card", "p-5", "flex", "items-center", "gap-4", "hover:shadow", "transition-shadow", 3, "routerLink"], [1, "max-w-7xl", "mx-auto", "px-4", "py-16", "grid", "sm:grid-cols-3", "gap-8", "text-center"], [1, "text-3xl", "mb-2"], [1, "font-semibold"], [1, "text-sm", "text-gray-500", "mt-1"], [1, "text-2xl", "mb-2"], [1, "font-medium", "text-sm"], [1, "spinner"], [3, "produit"], [1, "text-center", "mt-8"], ["routerLink", "/catalogue", 1, "text-amber-600", "hover:underline", "font-medium"], [1, "w-14", "h-14", "rounded-xl", "bg-amber-100", "flex", "items-center", "justify-center", "font-serif", "text-2xl", "shrink-0"], [1, "font-medium"], [1, "text-xs", "text-gray-500", "mt-0.5"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "h1", 1);
      \u0275\u0275text(2, " L'artisanat belge ");
      \u0275\u0275elementStart(3, "span", 2);
      \u0275\u0275text(4, "\xE0 port\xE9e de clic");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " D\xE9couvrez des produits faits \xE0 la main par des artisans locaux passionn\xE9s. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "a", 4);
      \u0275\u0275text(8, " Explorer le catalogue ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "section", 5)(10, "h2", 6);
      \u0275\u0275text(11, "Nos cat\xE9gories");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 7);
      \u0275\u0275repeaterCreate(13, HomeComponent_For_14_Template, 5, 7, "a", 8, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "section", 5)(16, "h2", 6);
      \u0275\u0275text(17, "Produits mis en avant");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(18, HomeComponent_Conditional_18_Template, 2, 0, "div", 9)(19, HomeComponent_Conditional_19_Template, 6, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "section", 10)(21, "div", 11)(22, "h2", 6);
      \u0275\u0275text(23, "Nos artisans");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 12);
      \u0275\u0275repeaterCreate(25, HomeComponent_For_26_Template, 8, 7, "a", 13, _forTrack1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "section", 14)(28, "div")(29, "p", 15);
      \u0275\u0275text(30, "\u{1F33F}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p", 16);
      \u0275\u0275text(32, "100% naturel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "p", 17);
      \u0275\u0275text(34, "Produits issus de l'agriculture locale");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div")(36, "p", 15);
      \u0275\u0275text(37, "\u{1F69A}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "p", 16);
      \u0275\u0275text(39, "Livraison rapide");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p", 17);
      \u0275\u0275text(41, "Exp\xE9di\xE9 sous 3-5 jours ouvr\xE9s");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div")(43, "p", 15);
      \u0275\u0275text(44, "\u{1F91D}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "p", 16);
      \u0275\u0275text(46, "Soutien local");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "p", 17);
      \u0275\u0275text(48, "Chaque achat soutient un artisan belge");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.loading() ? 18 : 19);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.artisans());
    }
  }, dependencies: [CommonModule, RouterLink, ProductCardComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{
      selector: "app-home",
      standalone: true,
      imports: [CommonModule, RouterLink, ProductCardComponent],
      template: `
    <!-- Hero -->
    <section class="bg-gradient-to-br from-amber-50 to-yellow-100 py-20 px-4 text-center">
      <h1 class="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        L'artisanat belge <span class="text-amber-600">\xE0 port\xE9e de clic</span>
      </h1>
      <p class="text-gray-600 max-w-xl mx-auto mb-8">
        D\xE9couvrez des produits faits \xE0 la main par des artisans locaux passionn\xE9s.
      </p>
      <a routerLink="/catalogue"
         class="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
        Explorer le catalogue
      </a>
    </section>

    <!-- Cat\xE9gories -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="font-serif text-2xl font-bold mb-6">Nos cat\xE9gories</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        @for (cat of categories; track cat.key) {
          <a [routerLink]="['/catalogue']" [queryParams]="{category: cat.label}"
             class="card p-5 text-center hover:border-amber-400 hover:shadow transition-all cursor-pointer">
            <p class="text-2xl mb-2">{{ cat.emoji }}</p>
            <p class="font-medium text-sm">{{ cat.label }}</p>
          </a>
        }
      </div>
    </section>

    <!-- Produits en vedette -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="font-serif text-2xl font-bold mb-6">Produits mis en avant</h2>
      @if (loading()) {
        <div class="flex justify-center py-12"><div class="spinner"></div></div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (p of featured(); track p.id_produit) {
            <app-product-card [produit]="p" />
          }
        </div>
        <div class="text-center mt-8">
          <a routerLink="/catalogue" class="text-amber-600 hover:underline font-medium">Voir tous les produits \u2192</a>
        </div>
      }
    </section>

    <!-- Artisans -->
    <section class="bg-amber-50 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="font-serif text-2xl font-bold mb-6">Nos artisans</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (a of artisans(); track a.id_artisan) {
            <a [routerLink]="['/boutique', a.id_artisan]" class="card p-5 flex items-center gap-4 hover:shadow transition-shadow">
              <div class="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center font-serif text-2xl shrink-0">
                {{ a.nom_boutique[0] }}
              </div>
              <div>
                <p class="font-medium">{{ a.nom_boutique }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ a.description?.slice(0,60) }}{{ a.description && a.description.length > 60 ? '\u2026' : '' }}</p>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Confiance -->
    <section class="max-w-7xl mx-auto px-4 py-16 grid sm:grid-cols-3 gap-8 text-center">
      <div><p class="text-3xl mb-2">\u{1F33F}</p><p class="font-semibold">100% naturel</p><p class="text-sm text-gray-500 mt-1">Produits issus de l'agriculture locale</p></div>
      <div><p class="text-3xl mb-2">\u{1F69A}</p><p class="font-semibold">Livraison rapide</p><p class="text-sm text-gray-500 mt-1">Exp\xE9di\xE9 sous 3-5 jours ouvr\xE9s</p></div>
      <div><p class="text-3xl mb-2">\u{1F91D}</p><p class="font-semibold">Soutien local</p><p class="text-sm text-gray-500 mt-1">Chaque achat soutient un artisan belge</p></div>
    </section>
  `
    }]
  }], () => [{ type: ProductService }, { type: ArtisanService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "app/pages/home/home.component.ts", lineNumber: 87 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-P6ZCOBQR.js.map
