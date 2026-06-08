import {
  CommonModule,
  Component,
  Input,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HBZS45XM.js";

// src/app/shared/kpi-card/kpi-card.component.ts
function KpiCardComponent_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.trend === "up" ? "text-green-600" : "text-red-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.trendValue, " ");
  }
}
var KpiCardComponent = class _KpiCardComponent {
  title = "";
  value = "";
  trend;
  trendValue;
  static \u0275fac = function KpiCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KpiCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KpiCardComponent, selectors: [["app-kpi-card"]], inputs: { title: "title", value: "value", trend: "trend", trendValue: "trendValue" }, decls: 6, vars: 3, consts: [[1, "card", "p-5"], [1, "text-xs", "text-gray-500", "mb-1"], [1, "text-2xl", "font-bold"], ["class", "text-xs mt-1", 3, "class", 4, "ngIf"], [1, "text-xs", "mt-1"]], template: function KpiCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "p", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(5, KpiCardComponent_p_5_Template, 2, 3, "p", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.value);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.trend);
    }
  }, dependencies: [CommonModule, NgIf], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KpiCardComponent, [{
    type: Component,
    args: [{
      selector: "app-kpi-card",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="card p-5">
      <p class="text-xs text-gray-500 mb-1">{{ title }}</p>
      <p class="text-2xl font-bold">{{ value }}</p>
      <p *ngIf="trend" class="text-xs mt-1"
         [class]="trend === 'up' ? 'text-green-600' : 'text-red-600'">
        {{ trendValue }}
      </p>
    </div>
  `
    }]
  }], null, { title: [{
    type: Input
  }], value: [{
    type: Input
  }], trend: [{
    type: Input
  }], trendValue: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KpiCardComponent, { className: "KpiCardComponent", filePath: "app/shared/kpi-card/kpi-card.component.ts", lineNumber: 19 });
})();

export {
  KpiCardComponent
};
//# sourceMappingURL=chunk-HAMYNNVJ.js.map
