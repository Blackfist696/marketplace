import {
  environment
} from "./chunk-P67B363Z.js";
import {
  HttpClient,
  Injectable,
  catchError,
  computed,
  of,
  setClassMetadata,
  signal,
  switchMap,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HBZS45XM.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  http;
  base = environment.apiUrl;
  currentUser = signal(null, ...ngDevMode ? [{ debugName: "currentUser" }] : (
    /* istanbul ignore next */
    []
  ));
  currentUserAddresses = signal([], ...ngDevMode ? [{ debugName: "currentUserAddresses" }] : (
    /* istanbul ignore next */
    []
  ));
  isLoggedIn = computed(() => this.currentUser() !== null, ...ngDevMode ? [{ debugName: "isLoggedIn" }] : (
    /* istanbul ignore next */
    []
  ));
  isAdmin = computed(() => this.currentUser()?.id_role === 1, ...ngDevMode ? [{ debugName: "isAdmin" }] : (
    /* istanbul ignore next */
    []
  ));
  isArtisan = computed(() => this.currentUser()?.id_role === 2, ...ngDevMode ? [{ debugName: "isArtisan" }] : (
    /* istanbul ignore next */
    []
  ));
  isClient = computed(() => this.currentUser()?.id_role === 3, ...ngDevMode ? [{ debugName: "isClient" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(http) {
    this.http = http;
  }
  login(email, mot_de_passe) {
    const body = new FormData();
    body.append("email", email);
    body.append("mot_de_passe", mot_de_passe);
    return this.http.post(`${this.base}/login`, body, { withCredentials: true }).pipe(switchMap((res) => {
      if (res?.data?.id_utilisateur) {
        return this.loadProfile().pipe(tap(() => {
        }), switchMap(() => of(res)));
      }
      return of(res);
    }));
  }
  register(email, mot_de_passe, id_role) {
    const body = new FormData();
    body.append("email", email);
    body.append("mot_de_passe", mot_de_passe);
    body.append("id_role", String(id_role));
    return this.http.post(`${this.base}/register`, body, { withCredentials: true });
  }
  logout() {
    return this.http.post(`${this.base}/logout`, {}, { withCredentials: true }).pipe(tap(() => this.currentUser.set(null)), catchError(() => {
      this.currentUser.set(null);
      return of(null);
    }));
  }
  loadProfile() {
    return this.http.get(`${this.base}/profile`, { withCredentials: true }).pipe(tap((res) => {
      if (res?.data?.utilisateur) {
        this.currentUser.set(res.data.utilisateur);
        this.currentUserAddresses.set(res.data.adresses ?? []);
      } else if (res?.data && !res.data.utilisateur) {
        this.currentUser.set(res.data);
        this.currentUserAddresses.set(res.data.adresses ?? []);
      }
    }), catchError(() => {
      this.currentUser.set(null);
      this.currentUserAddresses.set([]);
      return of(null);
    }));
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-QDW2YG4J.js.map
