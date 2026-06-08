import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RadioControlValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-NNN6EYZO.js";
import {
  ToastService
} from "./chunk-M6Z66CPB.js";
import {
  AuthService
} from "./chunk-QDW2YG4J.js";
import {
  Router,
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
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBZS45XM.js";

// src/app/pages/auth/register/register.component.ts
function RegisterComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var RegisterComponent = class _RegisterComponent {
  auth;
  router;
  toast;
  email = "";
  password = "";
  role = 3;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(auth, router, toast) {
    this.auth = auth;
    this.router = router;
    this.toast = toast;
  }
  submit() {
    if (!this.email || !this.password) {
      this.error.set("Champs requis");
      return;
    }
    this.loading.set(true);
    this.error.set("");
    this.auth.register(this.email, this.password, this.role).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res?.status === 201) {
          this.toast.success("Compte cr\xE9\xE9 ! Connectez-vous.");
          this.router.navigate(["/login"]);
        } else {
          this.error.set(res?.message ?? "Erreur inscription");
        }
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.error?.message ?? "Erreur inscription");
      }
    });
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 36, vars: 17, consts: [[1, "min-h-screen", "flex", "items-center", "justify-center", "px-4", "bg-amber-50"], [1, "card", "p-8", "w-full", "max-w-md"], [1, "font-serif", "text-2xl", "font-bold", "text-center", "mb-6"], [1, "space-y-4", 3, "ngSubmit"], [1, "text-sm", "font-medium"], ["type", "email", "name", "email", "required", "", 1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:border-amber-400", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "password", "required", "", 1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:border-amber-400", 3, "ngModelChange", "ngModel"], [1, "text-sm", "font-medium", "block", "mb-2"], [1, "grid", "grid-cols-2", "gap-3"], [1, "border", "rounded-xl", "p-3", "text-center", "cursor-pointer", "transition-all"], ["type", "radio", "name", "role", 1, "hidden", 3, "ngModelChange", "value", "ngModel"], [1, "text-2xl", "mb-1"], [1, "text-sm", "text-red-500"], ["type", "submit", 1, "w-full", "bg-amber-500", "hover:bg-amber-600", "disabled:opacity-50", "text-white", "py-3", "rounded-xl", "font-medium", 3, "disabled"], [1, "text-center", "text-sm", "text-gray-500", "mt-4"], ["routerLink", "/login", 1, "text-amber-600", "hover:underline"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Cr\xE9er un compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "form", 3);
      \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_4_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(5, "div")(6, "label", 4);
      \u0275\u0275text(7, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div")(10, "label", 4);
      \u0275\u0275text(11, "Mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div")(14, "label", 7);
      \u0275\u0275text(15, "Je suis\u2026");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 8)(17, "label", 9)(18, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.role, $event) || (ctx.role = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 11);
      \u0275\u0275text(20, "\u{1F6CD}\uFE0F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 4);
      \u0275\u0275text(22, "Client");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "label", 9)(24, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.role, $event) || (ctx.role = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 11);
      \u0275\u0275text(26, "\u{1F3EA}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 4);
      \u0275\u0275text(28, "Artisan");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(29, RegisterComponent_Conditional_29_Template, 2, 1, "p", 12);
      \u0275\u0275elementStart(30, "button", 13);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "p", 14);
      \u0275\u0275text(33, " D\xE9j\xE0 un compte ? ");
      \u0275\u0275elementStart(34, "a", 15);
      \u0275\u0275text(35, "Se connecter");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("border-amber-500", ctx.role === 3)("bg-amber-50", ctx.role === 3);
      \u0275\u0275advance();
      \u0275\u0275property("value", 3);
      \u0275\u0275twoWayProperty("ngModel", ctx.role);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("border-amber-500", ctx.role === 2)("bg-amber-50", ctx.role === 2);
      \u0275\u0275advance();
      \u0275\u0275property("value", 2);
      \u0275\u0275twoWayProperty("ngModel", ctx.role);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.error() ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading() ? "Inscription\u2026" : "Cr\xE9er mon compte", " ");
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{
      selector: "app-register",
      standalone: true,
      imports: [CommonModule, RouterLink, FormsModule],
      template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-amber-50">
      <div class="card p-8 w-full max-w-md">
        <h1 class="font-serif text-2xl font-bold text-center mb-6">Cr\xE9er un compte</h1>
        <form (ngSubmit)="submit()" class="space-y-4">
          <div>
            <label class="text-sm font-medium">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required
                   class="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label class="text-sm font-medium">Mot de passe</label>
            <input type="password" [(ngModel)]="password" name="password" required
                   class="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-2">Je suis\u2026</label>
            <div class="grid grid-cols-2 gap-3">
              <label class="border rounded-xl p-3 text-center cursor-pointer transition-all" [class.border-amber-500]="role===3" [class.bg-amber-50]="role===3">
                <input type="radio" name="role" [value]="3" [(ngModel)]="role" class="hidden" />
                <div class="text-2xl mb-1">\u{1F6CD}\uFE0F</div>
                <div class="text-sm font-medium">Client</div>
              </label>
              <label class="border rounded-xl p-3 text-center cursor-pointer transition-all" [class.border-amber-500]="role===2" [class.bg-amber-50]="role===2">
                <input type="radio" name="role" [value]="2" [(ngModel)]="role" class="hidden" />
                <div class="text-2xl mb-1">\u{1F3EA}</div>
                <div class="text-sm font-medium">Artisan</div>
              </label>
            </div>
          </div>
          @if (error()) {
            <p class="text-sm text-red-500">{{ error() }}</p>
          }
          <button type="submit" [disabled]="loading()"
                  class="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium">
            {{ loading() ? 'Inscription\u2026' : 'Cr\xE9er mon compte' }}
          </button>
        </form>
        <p class="text-center text-sm text-gray-500 mt-4">
          D\xE9j\xE0 un compte ? <a routerLink="/login" class="text-amber-600 hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  `
    }]
  }], () => [{ type: AuthService }, { type: Router }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "app/pages/auth/register/register.component.ts", lineNumber: 57 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-GERBNMBT.js.map
