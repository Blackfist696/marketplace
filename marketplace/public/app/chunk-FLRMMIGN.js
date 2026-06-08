import {
  ArtisanService
} from "./chunk-AZ4XTC6P.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-NNN6EYZO.js";
import {
  ToastService
} from "./chunk-M6Z66CPB.js";
import "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBZS45XM.js";

// src/app/pages/admin/artisans/admin-artisans.component.ts
var _c0 = () => ["all", "active", "inactive"];
var _forTrack0 = ($index, $item) => $item.id_artisan;
function AdminArtisansComponent_For_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.pendingCount());
  }
}
function AdminArtisansComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function AdminArtisansComponent_For_10_Template_button_click_0_listener() {
      const f_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterStatus = f_r2);
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, AdminArtisansComponent_For_10_Conditional_2_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.filterStatus === f_r2 ? "bg-amber-500 text-white" : "border border-gray-200 text-gray-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r2 === "all" ? "Tous" : f_r2 === "active" ? "Actifs" : "Inactifs", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(f_r2 === "inactive" && ctx_r2.pendingCount() > 0 ? 2 : -1);
  }
}
function AdminArtisansComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, "Chargement\u2026");
    \u0275\u0275elementEnd()();
  }
}
function AdminArtisansComponent_For_27_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function AdminArtisansComponent_For_27_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const a_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activate(a_r5, true));
    });
    \u0275\u0275text(1, "\u2713 Valider");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 27);
    \u0275\u0275listener("click", function AdminArtisansComponent_For_27_Conditional_12_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const a_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activate(a_r5, false));
    });
    \u0275\u0275text(3, "\u2717 Refuser");
    \u0275\u0275elementEnd();
  }
}
function AdminArtisansComponent_For_27_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function AdminArtisansComponent_For_27_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const a_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activate(a_r5, false));
    });
    \u0275\u0275text(1, "D\xE9sactiver");
    \u0275\u0275elementEnd();
  }
}
function AdminArtisansComponent_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 15)(1, "td", 19)(2, "div", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 19)(9, "span", 23);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 24);
    \u0275\u0275conditionalCreate(12, AdminArtisansComponent_For_27_Conditional_12_Template, 4, 0)(13, AdminArtisansComponent_For_27_Conditional_13_Template, 2, 0, "button", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r5.nom_boutique);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r5.description == null ? null : a_r5.description.slice(0, 50));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r5.numero_tva || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(a_r5.valide ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", a_r5.valide ? "Actif" : "En attente", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!a_r5.valide ? 12 : 13);
  }
}
function AdminArtisansComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, "Aucun artisan trouv\xE9");
    \u0275\u0275elementEnd()();
  }
}
var AdminArtisansComponent = class _AdminArtisansComponent {
  artisanSvc;
  toast;
  artisans = signal([], ...ngDevMode ? [{ debugName: "artisans" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  search = "";
  filterStatus = "all";
  pendingCount = signal(0, ...ngDevMode ? [{ debugName: "pendingCount" }] : (
    /* istanbul ignore next */
    []
  ));
  get filtered() {
    return this.artisans().filter((a) => {
      const ms = !this.search || a.nom_boutique.toLowerCase().includes(this.search.toLowerCase());
      const fs = this.filterStatus === "all" || (this.filterStatus === "active" ? !!a.valide : !a.valide);
      return ms && fs;
    });
  }
  constructor(artisanSvc, toast) {
    this.artisanSvc = artisanSvc;
    this.toast = toast;
  }
  ngOnInit() {
    this.artisanSvc.adminGetAll().subscribe((as) => {
      this.artisans.set(as);
      this.pendingCount.set(as.filter((a) => !a.valide).length);
      this.loading.set(false);
    });
  }
  activate(a, activer) {
    this.artisanSvc.adminUpdate(a.id_artisan, { valide: activer ? 1 : 0 }).subscribe({
      next: () => {
        this.ngOnInit();
        this.toast.success(activer ? "Artisan valid\xE9" : "Artisan d\xE9sactiv\xE9");
      },
      error: () => this.toast.error("Erreur")
    });
  }
  static \u0275fac = function AdminArtisansComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminArtisansComponent)(\u0275\u0275directiveInject(ArtisanService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminArtisansComponent, selectors: [["app-admin-artisans"]], decls: 29, vars: 4, consts: [[1, "p-6", "md:p-8", "max-w-6xl"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "flex", "flex-wrap", "gap-3", "mb-6"], [1, "relative", "flex-1", "min-w-[200px]"], ["placeholder", "Rechercher\u2026", 1, "w-full", "border", "rounded-lg", "pl-9", "pr-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-gray-400"], [1, "flex", "gap-2", "flex-wrap"], [1, "px-3", "py-1.5", "rounded-full", "text-sm", 3, "class"], [1, "card", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "bg-gray-50"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500"], [1, "text-left", "px-4", "py-3", "font-medium", "text-gray-500", "hidden", "sm:table-cell"], [1, "text-right", "px-4", "py-3", "font-medium", "text-gray-500"], [1, "border-t", "hover:bg-gray-50", "transition-colors"], [1, "px-3", "py-1.5", "rounded-full", "text-sm", 3, "click"], [1, "ml-1", "bg-red-500", "text-white", "text-xs", "rounded-full", "px-1.5"], ["colspan", "4", 1, "px-4", "py-8", "text-center", "text-gray-500"], [1, "px-4", "py-3"], [1, "font-medium"], [1, "text-xs", "text-gray-500"], [1, "px-4", "py-3", "text-gray-500", "hidden", "sm:table-cell", "font-mono", "text-xs"], [1, "text-xs", "font-medium", "px-2", "py-1", "rounded-full"], [1, "px-4", "py-3", "text-right"], [1, "text-xs", "border", "border-red-300", "text-red-500", "hover:bg-red-50", "px-2", "py-1", "rounded-lg"], [1, "text-xs", "bg-green-600", "hover:bg-green-700", "text-white", "px-2", "py-1", "rounded-lg", "mr-1", 3, "click"], [1, "text-xs", "bg-red-500", "hover:bg-red-600", "text-white", "px-2", "py-1", "rounded-lg", 3, "click"], [1, "text-xs", "border", "border-red-300", "text-red-500", "hover:bg-red-50", "px-2", "py-1", "rounded-lg", 3, "click"]], template: function AdminArtisansComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Gestion des Artisans");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function AdminArtisansComponent_Template_input_ngModelChange_5_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7, "\u{1F50D}");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 6);
      \u0275\u0275repeaterCreate(9, AdminArtisansComponent_For_10_Template, 3, 4, "button", 7, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "table", 10)(14, "thead", 11)(15, "tr")(16, "th", 12);
      \u0275\u0275text(17, "Boutique");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "th", 13);
      \u0275\u0275text(19, "N\xB0 TVA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th", 12);
      \u0275\u0275text(21, "Statut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th", 14);
      \u0275\u0275text(23, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "tbody");
      \u0275\u0275conditionalCreate(25, AdminArtisansComponent_Conditional_25_Template, 3, 0, "tr");
      \u0275\u0275repeaterCreate(26, AdminArtisansComponent_For_27_Template, 14, 7, "tr", 15, _forTrack0);
      \u0275\u0275conditionalCreate(28, AdminArtisansComponent_Conditional_28_Template, 3, 0, "tr");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.search);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(3, _c0));
      \u0275\u0275advance(16);
      \u0275\u0275conditional(ctx.loading() ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.filtered);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading() && ctx.filtered.length === 0 ? 28 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminArtisansComponent, [{
    type: Component,
    args: [{
      selector: "app-admin-artisans",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 md:p-8 max-w-6xl">
      <h1 class="font-serif text-2xl font-bold mb-6">Gestion des Artisans</h1>

      <div class="flex flex-wrap gap-3 mb-6">
        <div class="relative flex-1 min-w-[200px]">
          <input [(ngModel)]="search" placeholder="Rechercher\u2026" class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">\u{1F50D}</span>
        </div>
        <div class="flex gap-2 flex-wrap">
          @for (f of ['all','active','inactive']; track f) {
            <button (click)="filterStatus=f"
                    [class]="filterStatus===f ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-600'"
                    class="px-3 py-1.5 rounded-full text-sm">
              {{ f==='all' ? 'Tous' : f==='active' ? 'Actifs' : 'Inactifs' }}
              @if (f==='inactive' && pendingCount() > 0) {
                <span class="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">{{ pendingCount() }}</span>
              }
            </button>
          }
        </div>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Boutique</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">N\xB0 TVA</th>
                <th class="text-left px-4 py-3 font-medium text-gray-500">Statut</th>
                <th class="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              @if (loading()) {
                <tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">Chargement\u2026</td></tr>
              }
              @for (a of filtered; track a.id_artisan) {
                <tr class="border-t hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3">
                    <div class="font-medium">{{ a.nom_boutique }}</div>
                    <div class="text-xs text-gray-500">{{ a.description?.slice(0,50) }}</div>
                  </td>
                  <td class="px-4 py-3 text-gray-500 hidden sm:table-cell font-mono text-xs">{{ a.numero_tva || '\u2014' }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-1 rounded-full" [class]="a.valide ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                      {{ a.valide ? 'Actif' : 'En attente' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    @if (!a.valide) {
                      <button (click)="activate(a, true)"  class="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg mr-1">\u2713 Valider</button>
                      <button (click)="activate(a, false)" class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg">\u2717 Refuser</button>
                    } @else {
                      <button (click)="activate(a, false)" class="text-xs border border-red-300 text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg">D\xE9sactiver</button>
                    }
                  </td>
                </tr>
              }
              @if (!loading() && filtered.length === 0) {
                <tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">Aucun artisan trouv\xE9</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
    }]
  }], () => [{ type: ArtisanService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminArtisansComponent, { className: "AdminArtisansComponent", filePath: "app/pages/admin/artisans/admin-artisans.component.ts", lineNumber: 82 });
})();
export {
  AdminArtisansComponent
};
//# sourceMappingURL=chunk-FLRMMIGN.js.map
