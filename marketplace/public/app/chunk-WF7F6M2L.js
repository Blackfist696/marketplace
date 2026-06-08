import {
  OrderService
} from "./chunk-G5RZROR4.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  RadioControlValueAccessor
} from "./chunk-NNN6EYZO.js";
import {
  ToastService
} from "./chunk-M6Z66CPB.js";
import {
  AuthService
} from "./chunk-QDW2YG4J.js";
import {
  CartService
} from "./chunk-PD2SCL3N.js";
import {
  Router,
  RouterLink
} from "./chunk-BTJFPSWE.js";
import {
  environment
} from "./chunk-P67B363Z.js";
import {
  CommonModule,
  Component,
  HttpClient,
  Injectable,
  __spreadProps,
  __spreadValues,
  map,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBZS45XM.js";

// src/app/core/services/address.service.ts
var AddressService = class _AddressService {
  http;
  base = environment.apiUrl;
  constructor(http) {
    this.http = http;
  }
  getPays() {
    return this.http.get(`${this.base}/api/pays`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getVilles() {
    return this.http.get(`${this.base}/api/villes`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getMyAddresses() {
    return this.http.get(`${this.base}/api/user-addresses`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  create(data) {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== void 0 && v !== null)
        form.append(k, String(v));
    });
    return this.http.post(`${this.base}/api/user-addresses`, form, { withCredentials: true });
  }
  delete(idUtilisateur, idAdresse) {
    return this.http.delete(`${this.base}/api/user-addresses/${idUtilisateur}/${idAdresse}`, { withCredentials: true });
  }
  static \u0275fac = function AddressService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddressService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AddressService, factory: _AddressService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddressService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/pages/checkout/checkout.component.ts
var _forTrack0 = ($index, $item) => $item.n;
function CheckoutComponent_For_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 7);
  }
}
function CheckoutComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, CheckoutComponent_For_3_Conditional_5_Template, 1, 0, "div", 7);
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.stepClass(s_r1.n));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.step() > s_r1.n ? "\u2713" : s_r1.n, " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.step() === s_r1.n ? "font-medium" : "text-gray-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r1.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r1.n < ctx_r1.steps.length ? 5 : -1);
  }
}
function CheckoutComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h2", 8);
    \u0275\u0275text(2, "Adresse de livraison");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9)(4, "div")(5, "label", 10);
    \u0275\u0275text(6, "Rue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function CheckoutComponent_Conditional_4_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.addr.rue, $event) || (ctx_r1.addr.rue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "label", 10);
    \u0275\u0275text(10, "Code postal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function CheckoutComponent_Conditional_4_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.addr.code_postal, $event) || (ctx_r1.addr.code_postal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 12);
    \u0275\u0275listener("click", function CheckoutComponent_Conditional_4_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitAddress());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.addr.rue);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.addr.code_postal);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Enregistrement\u2026" : "Continuer vers le paiement", " ");
  }
}
function CheckoutComponent_Conditional_5_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "input", 22);
    \u0275\u0275elementStart(2, "div", 23);
    \u0275\u0275element(3, "input", 24)(4, "input", 25);
    \u0275\u0275elementEnd()();
  }
}
function CheckoutComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h2", 8);
    \u0275\u0275text(2, "Paiement s\xE9curis\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13)(4, "label", 14)(5, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function CheckoutComponent_Conditional_5_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.payment, $event) || (ctx_r1.payment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "\u{1F4B3} Carte bancaire");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, CheckoutComponent_Conditional_5_Conditional_8_Template, 5, 0, "div", 16);
    \u0275\u0275elementStart(9, "label", 14)(10, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function CheckoutComponent_Conditional_5_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.payment, $event) || (ctx_r1.payment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "\u{1F3E6} Virement bancaire");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "p", 18);
    \u0275\u0275text(14, "\u{1F512} Paiement s\xE9curis\xE9 SSL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 12);
    \u0275\u0275listener("click", function CheckoutComponent_Conditional_5_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.placeOrder());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 19)(18, "p", 20);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 21);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-amber-500", ctx_r1.payment === "card");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.payment);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.payment === "card" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("border-amber-500", ctx_r1.payment === "virement");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.payment);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Traitement\u2026" : "Confirmer et payer " + ctx_r1.totalDisplay() + " \u20AC", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.cart.count(), " articles");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.totalDisplay(), " \u20AC");
  }
}
function CheckoutComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 26);
    \u0275\u0275text(2, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 27);
    \u0275\u0275text(4, "Commande confirm\xE9e !");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 28);
    \u0275\u0275text(6, "R\xE9f\xE9rence : ");
    \u0275\u0275elementStart(7, "span", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 30);
    \u0275\u0275text(10, "Un email de confirmation a \xE9t\xE9 envoy\xE9.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 31);
    \u0275\u0275text(12, " Retour \xE0 l'accueil ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.orderRef());
  }
}
var CheckoutComponent = class _CheckoutComponent {
  cart;
  orderSvc;
  addrSvc;
  auth;
  toast;
  router;
  step = signal(1, ...ngDevMode ? [{ debugName: "step" }] : (
    /* istanbul ignore next */
    []
  ));
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  orderRef = signal("", ...ngDevMode ? [{ debugName: "orderRef" }] : (
    /* istanbul ignore next */
    []
  ));
  steps = [{ n: 1, label: "Adresse" }, { n: 2, label: "Paiement" }, { n: 3, label: "Confirmation" }];
  addr = { rue: "", code_postal: "" };
  payment = "card";
  addressId = signal(null, ...ngDevMode ? [{ debugName: "addressId" }] : (
    /* istanbul ignore next */
    []
  ));
  savedAddress = null;
  constructor(cart, orderSvc, addrSvc, auth, toast, router) {
    this.cart = cart;
    this.orderSvc = orderSvc;
    this.addrSvc = addrSvc;
    this.auth = auth;
    this.toast = toast;
    this.router = router;
  }
  ngOnInit() {
    this.cart.load().subscribe();
    this.loadSavedAddress();
  }
  loadSavedAddress() {
    const addresses = this.auth.currentUserAddresses();
    if (addresses.length > 0) {
      this.prefillSavedAddress(addresses[0]);
      return;
    }
    this.auth.loadProfile().subscribe(() => {
      const loadedAddresses = this.auth.currentUserAddresses();
      if (loadedAddresses.length > 0) {
        this.prefillSavedAddress(loadedAddresses[0]);
      }
    });
  }
  prefillSavedAddress(address) {
    this.savedAddress = address;
    this.addr = __spreadProps(__spreadValues({}, this.addr), {
      rue: address.rue,
      code_postal: address.code_postal,
      id_ville: address.id_ville
    });
  }
  stepClass(n) {
    if (this.step() > n)
      return "bg-green-500 text-white";
    if (this.step() === n)
      return "bg-amber-500 text-white";
    return "bg-gray-200 text-gray-600";
  }
  totalDisplay() {
    const sub = this.cart.total();
    return (sub * 1.21 + (sub > 50 ? 0 : 4.95)).toFixed(2);
  }
  submitAddress() {
    if (!this.addr.rue || !this.addr.code_postal) {
      this.toast.error("Remplissez tous les champs");
      return;
    }
    if (this.savedAddress && this.addr.rue === this.savedAddress.rue && this.addr.code_postal === this.savedAddress.code_postal) {
      this.addressId.set(this.savedAddress.id_adresse);
      this.step.set(2);
      return;
    }
    this.saving.set(true);
    this.addrSvc.create(this.addr).subscribe({
      next: (res) => {
        this.addressId.set(res?.data?.id_adresse ?? 1);
        this.saving.set(false);
        this.step.set(2);
      },
      error: () => {
        this.saving.set(false);
        this.toast.error("Erreur adresse");
      }
    });
  }
  placeOrder() {
    const addrId = this.addressId();
    if (!addrId) {
      this.toast.error("Adresse manquante");
      return;
    }
    this.saving.set(true);
    const ship = this.cart.total() > 50 ? 0 : 4.95;
    this.orderSvc.create(addrId, ship).subscribe({
      next: (res) => {
        this.orderRef.set(res?.data?.reference ?? "CMD-" + Date.now());
        this.cart.clear();
        this.saving.set(false);
        this.step.set(3);
      },
      error: () => {
        this.saving.set(false);
        this.toast.error("Erreur lors de la commande");
      }
    });
  }
  static \u0275fac = function CheckoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CheckoutComponent)(\u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(AddressService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CheckoutComponent, selectors: [["app-checkout"]], decls: 7, vars: 3, consts: [[1, "max-w-2xl", "mx-auto", "px-4", "py-8"], [1, "flex", "items-center", "justify-center", "gap-3", "mb-10"], [1, "card", "p-6", "md:p-8"], [1, "card", "p-8", "md:p-12", "text-center"], [1, "flex", "items-center", "gap-2"], [1, "w-8", "h-8", "rounded-full", "flex", "items-center", "justify-center", "text-sm", "font-medium"], [1, "text-sm", "hidden", "sm:block"], [1, "w-10", "h-0.5", "bg-gray-200"], [1, "font-serif", "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], [1, "text-sm", "font-medium"], [1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", 3, "ngModelChange", "ngModel"], [1, "w-full", "mt-6", "bg-amber-500", "hover:bg-amber-600", "disabled:opacity-50", "text-white", "py-3", "rounded-xl", "font-medium", 3, "click", "disabled"], [1, "space-y-4"], [1, "flex", "items-center", "gap-3", "border", "rounded-xl", "p-4", "cursor-pointer"], ["type", "radio", "name", "pay", "value", "card", 3, "ngModelChange", "ngModel"], [1, "pl-7", "space-y-3"], ["type", "radio", "name", "pay", "value", "virement", 3, "ngModelChange", "ngModel"], [1, "text-xs", "text-gray-500", "mt-4", "flex", "items-center", "gap-1"], [1, "card", "p-4", "mt-4", "text-sm"], [1, "font-semibold", "mb-1"], [1, "text-xl", "font-bold"], ["placeholder", "Num\xE9ro de carte", 1, "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm"], [1, "grid", "grid-cols-2", "gap-3"], ["placeholder", "MM/AA", 1, "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm"], ["placeholder", "CVV", 1, "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm"], [1, "w-20", "h-20", "rounded-full", "bg-green-50", "flex", "items-center", "justify-center", "mx-auto", "mb-6", "text-4xl"], [1, "font-serif", "text-3xl", "font-bold", "mb-2"], [1, "text-gray-500", "mb-2"], [1, "font-mono", "font-semibold", "text-gray-800"], [1, "text-gray-500", "mb-8"], ["routerLink", "/home", 1, "border", "border-gray-300", "hover:border-gray-400", "px-8", "py-2", "rounded-full", "text-sm"]], template: function CheckoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275repeaterCreate(2, CheckoutComponent_For_3_Template, 6, 7, null, null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, CheckoutComponent_Conditional_4_Template, 14, 4, "div", 2);
      \u0275\u0275conditionalCreate(5, CheckoutComponent_Conditional_5_Template, 22, 11, "div", 2);
      \u0275\u0275conditionalCreate(6, CheckoutComponent_Conditional_6_Template, 13, 1, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.steps);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.step() === 1 ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.step() === 2 ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.step() === 3 ? 6 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, DefaultValueAccessor, RadioControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckoutComponent, [{
    type: Component,
    args: [{
      selector: "app-checkout",
      standalone: true,
      imports: [CommonModule, RouterLink, FormsModule],
      template: `
    <div class="max-w-2xl mx-auto px-4 py-8">
      <!-- Stepper -->
      <div class="flex items-center justify-center gap-3 mb-10">
        @for (s of steps; track s.n) {
          <div class="flex items-center gap-2">
            <div [class]="stepClass(s.n)" class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
              {{ step() > s.n ? '\u2713' : s.n }}
            </div>
            <span [class]="step()===s.n ? 'font-medium' : 'text-gray-400'" class="text-sm hidden sm:block">{{ s.label }}</span>
          </div>
          @if (s.n < steps.length) { <div class="w-10 h-0.5 bg-gray-200"></div> }
        }
      </div>

      <!-- \xC9tape 1 : Adresse -->
      @if (step() === 1) {
        <div class="card p-6 md:p-8">
          <h2 class="font-serif text-2xl font-bold mb-6">Adresse de livraison</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label class="text-sm font-medium">Rue</label>
              <input [(ngModel)]="addr.rue" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
            <div><label class="text-sm font-medium">Code postal</label>
              <input [(ngModel)]="addr.code_postal" class="mt-1 w-full border rounded-lg px-3 py-2 text-sm" /></div>
          </div>
          <button (click)="submitAddress()" [disabled]="saving()"
                  class="w-full mt-6 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium">
            {{ saving() ? 'Enregistrement\u2026' : 'Continuer vers le paiement' }}
          </button>
        </div>
      }

      <!-- \xC9tape 2 : Paiement -->
      @if (step() === 2) {
        <div class="card p-6 md:p-8">
          <h2 class="font-serif text-2xl font-bold mb-6">Paiement s\xE9curis\xE9</h2>
          <div class="space-y-4">
            <label class="flex items-center gap-3 border rounded-xl p-4 cursor-pointer" [class.border-amber-500]="payment==='card'">
              <input type="radio" name="pay" value="card" [(ngModel)]="payment" />
              <span>\u{1F4B3} Carte bancaire</span>
            </label>
            @if (payment === 'card') {
              <div class="pl-7 space-y-3">
                <input placeholder="Num\xE9ro de carte" class="w-full border rounded-lg px-3 py-2 text-sm" />
                <div class="grid grid-cols-2 gap-3">
                  <input placeholder="MM/AA" class="w-full border rounded-lg px-3 py-2 text-sm" />
                  <input placeholder="CVV" class="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
            }
            <label class="flex items-center gap-3 border rounded-xl p-4 cursor-pointer" [class.border-amber-500]="payment==='virement'">
              <input type="radio" name="pay" value="virement" [(ngModel)]="payment" />
              <span>\u{1F3E6} Virement bancaire</span>
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-4 flex items-center gap-1">\u{1F512} Paiement s\xE9curis\xE9 SSL</p>
          <button (click)="placeOrder()" [disabled]="saving()"
                  class="w-full mt-6 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium">
            {{ saving() ? 'Traitement\u2026' : 'Confirmer et payer ' + totalDisplay() + ' \u20AC' }}
          </button>
          <div class="card p-4 mt-4 text-sm">
            <p class="font-semibold mb-1">{{ cart.count() }} articles</p>
            <p class="text-xl font-bold">{{ totalDisplay() }} \u20AC</p>
          </div>
        </div>
      }

      <!-- \xC9tape 3 : Confirmation -->
      @if (step() === 3) {
        <div class="card p-8 md:p-12 text-center">
          <div class="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 text-4xl">\u2705</div>
          <h2 class="font-serif text-3xl font-bold mb-2">Commande confirm\xE9e !</h2>
          <p class="text-gray-500 mb-2">R\xE9f\xE9rence : <span class="font-mono font-semibold text-gray-800">{{ orderRef() }}</span></p>
          <p class="text-gray-500 mb-8">Un email de confirmation a \xE9t\xE9 envoy\xE9.</p>
          <a routerLink="/home" class="border border-gray-300 hover:border-gray-400 px-8 py-2 rounded-full text-sm">
            Retour \xE0 l'accueil
          </a>
        </div>
      }
    </div>
  `
    }]
  }], () => [{ type: CartService }, { type: OrderService }, { type: AddressService }, { type: AuthService }, { type: ToastService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CheckoutComponent, { className: "CheckoutComponent", filePath: "app/pages/checkout/checkout.component.ts", lineNumber: 98 });
})();
export {
  CheckoutComponent
};
//# sourceMappingURL=chunk-WF7F6M2L.js.map
