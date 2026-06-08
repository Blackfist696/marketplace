import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
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

// src/app/pages/auth/login/login.component.ts
function LoginComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var LoginComponent = class _LoginComponent {
  auth;
  router;
  toast;
  email = "";
  password = "";
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
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res?.status === 200) {
          this.toast.success("Bienvenue !");
          const user = this.auth.currentUser();
          if (user?.id_role === 1)
            this.router.navigate(["/admin/dashboard"]);
          else if (user?.id_role === 2)
            this.router.navigate(["/artisan/dashboard"]);
          else
            this.router.navigate(["/catalogue"]);
        } else {
          this.error.set(res?.message ?? "Identifiants invalides");
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set("Identifiants invalides");
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 20, vars: 5, consts: [[1, "min-h-screen", "flex", "items-center", "justify-center", "px-4", "bg-amber-50"], [1, "card", "p-8", "w-full", "max-w-md"], [1, "font-serif", "text-2xl", "font-bold", "text-center", "mb-6"], [1, "space-y-4", 3, "ngSubmit"], [1, "text-sm", "font-medium"], ["type", "email", "name", "email", "required", "", 1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:border-amber-400", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "password", "required", "", 1, "mt-1", "w-full", "border", "rounded-lg", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:border-amber-400", 3, "ngModelChange", "ngModel"], [1, "text-sm", "text-red-500"], ["type", "submit", 1, "w-full", "bg-amber-500", "hover:bg-amber-600", "disabled:opacity-50", "text-white", "py-3", "rounded-xl", "font-medium", 3, "disabled"], [1, "text-center", "text-sm", "text-gray-500", "mt-4"], ["routerLink", "/register", 1, "text-amber-600", "hover:underline"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Connexion");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "form", 3);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_4_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(5, "div")(6, "label", 4);
      \u0275\u0275text(7, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div")(10, "label", 4);
      \u0275\u0275text(11, "Mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(13, LoginComponent_Conditional_13_Template, 2, 1, "p", 7);
      \u0275\u0275elementStart(14, "button", 8);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "p", 9);
      \u0275\u0275text(17, " Pas encore de compte ? ");
      \u0275\u0275elementStart(18, "a", 10);
      \u0275\u0275text(19, "S'inscrire");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading() ? "Connexion\u2026" : "Se connecter", " ");
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{
      selector: "app-login",
      standalone: true,
      imports: [CommonModule, RouterLink, FormsModule],
      template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-amber-50">
      <div class="card p-8 w-full max-w-md">
        <h1 class="font-serif text-2xl font-bold text-center mb-6">Connexion</h1>
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
          @if (error()) {
            <p class="text-sm text-red-500">{{ error() }}</p>
          }
          <button type="submit" [disabled]="loading()"
                  class="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium">
            {{ loading() ? 'Connexion\u2026' : 'Se connecter' }}
          </button>
        </form>
        <p class="text-center text-sm text-gray-500 mt-4">
          Pas encore de compte ? <a routerLink="/register" class="text-amber-600 hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  `
    }]
  }], () => [{ type: AuthService }, { type: Router }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "app/pages/auth/login/login.component.ts", lineNumber: 42 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-EQTUPXG3.js.map
