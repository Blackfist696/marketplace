import {
  environment
} from "./chunk-P67B363Z.js";
import {
  HttpClient,
  Injectable,
  computed,
  map,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HBZS45XM.js";

// src/app/core/services/cart.service.ts
var CartService = class _CartService {
  http;
  base = environment.apiUrl;
  lines = signal([], ...ngDevMode ? [{ debugName: "lines" }] : (
    /* istanbul ignore next */
    []
  ));
  count = computed(() => this.lines().reduce((s, l) => s + l.quantite, 0), ...ngDevMode ? [{ debugName: "count" }] : (
    /* istanbul ignore next */
    []
  ));
  total = computed(() => this.lines().reduce((s, l) => s + l.produit.prix_ht * l.quantite, 0), ...ngDevMode ? [{ debugName: "total" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(http) {
    this.http = http;
  }
  load() {
    return this.http.get(`${this.base}/cart`, { withCredentials: true }).pipe(map((r) => r.data), tap((data) => this.lines.set(data?.lines ?? [])));
  }
  add(idProduit, quantite) {
    const form = new FormData();
    form.append("id_produit", String(idProduit));
    form.append("quantite", String(quantite));
    return this.http.post(`${this.base}/cart`, form, { withCredentials: true }).pipe(tap(() => this.load().subscribe()));
  }
  updateQty(idProduit, quantite) {
    if (quantite < 1)
      return this.remove(idProduit);
    const form = new FormData();
    form.append("quantite", String(quantite));
    return this.http.put(`${this.base}/cart/${idProduit}`, form, { withCredentials: true }).pipe(tap(() => this.load().subscribe()));
  }
  remove(idProduit) {
    return this.http.delete(`${this.base}/cart/${idProduit}`, { withCredentials: true }).pipe(tap(() => this.load().subscribe()));
  }
  clear() {
    this.lines.set([]);
  }
  static \u0275fac = function CartService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CartService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CartService, factory: _CartService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CartService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  CartService
};
//# sourceMappingURL=chunk-PD2SCL3N.js.map
