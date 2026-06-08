import {
  environment
} from "./chunk-P67B363Z.js";
import {
  HttpClient,
  Injectable,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HBZS45XM.js";

// src/app/core/services/avis.service.ts
var AvisService = class _AvisService {
  http;
  base = environment.apiUrl;
  constructor(http) {
    this.http = http;
  }
  getByProduit(idProduit) {
    return this.http.get(`${this.base}/api/produits/${idProduit}/avis`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getAll() {
    return this.http.get(`${this.base}/api/avis`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  create(data) {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== void 0 && v !== null)
        form.append(k, String(v));
    });
    return this.http.post(`${this.base}/api/avis`, form, { withCredentials: true });
  }
  update(id, data) {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== void 0 && v !== null)
        form.append(k, String(v));
    });
    return this.http.put(`${this.base}/api/avis/${id}`, form, { withCredentials: true });
  }
  static \u0275fac = function AvisService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvisService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AvisService, factory: _AvisService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvisService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AvisService
};
//# sourceMappingURL=chunk-ER7DDSLU.js.map
