import {
  RouterLink
} from "./chunk-BTJFPSWE.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-HBZS45XM.js";

// src/app/pages/not-found/not-found.component.ts
var NotFoundComponent = class _NotFoundComponent {
  static \u0275fac = function NotFoundComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotFoundComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotFoundComponent, selectors: [["app-not-found"]], decls: 10, vars: 0, consts: [[1, "min-h-screen", "flex", "items-center", "justify-center", "text-center", "px-4"], [1, "text-8xl", "mb-4"], [1, "font-serif", "text-4xl", "font-bold", "mb-2"], [1, "text-gray-500", "mb-6"], ["routerLink", "/home", 1, "bg-amber-500", "hover:bg-amber-600", "text-white", "px-8", "py-3", "rounded-full", "inline-block"]], template: function NotFoundComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "p", 1);
      \u0275\u0275text(3, "\u{1F36F}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 2);
      \u0275\u0275text(5, "Page introuvable");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 3);
      \u0275\u0275text(7, "Cette page n'existe pas ou a \xE9t\xE9 d\xE9plac\xE9e.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "a", 4);
      \u0275\u0275text(9, " Retour \xE0 l'accueil ");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotFoundComponent, [{
    type: Component,
    args: [{
      selector: "app-not-found",
      standalone: true,
      imports: [RouterLink],
      template: `
    <div class="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p class="text-8xl mb-4">\u{1F36F}</p>
        <h1 class="font-serif text-4xl font-bold mb-2">Page introuvable</h1>
        <p class="text-gray-500 mb-6">Cette page n'existe pas ou a \xE9t\xE9 d\xE9plac\xE9e.</p>
        <a routerLink="/home" class="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full inline-block">
          Retour \xE0 l'accueil
        </a>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotFoundComponent, { className: "NotFoundComponent", filePath: "app/pages/not-found/not-found.component.ts", lineNumber: 21 });
})();
export {
  NotFoundComponent
};
//# sourceMappingURL=chunk-DGZNQVZQ.js.map
