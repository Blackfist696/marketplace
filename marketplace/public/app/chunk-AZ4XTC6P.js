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

// src/app/core/services/artisan.service.ts
var ArtisanService = class _ArtisanService {
  http;
  base = environment.apiUrl;
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(`${this.base}/artisans`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getById(id) {
    return this.http.get(`${this.base}/artisans/${id}`, { withCredentials: true }).pipe(map((r) => r.data));
  }
  getStats() {
    return this.http.get(`${this.base}/artisan/stats`, { withCredentials: true }).pipe(map((r) => r.data));
  }
  adminGetAll() {
    return this.http.get(`${this.base}/admin/artisans`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  adminUpdate(id, data) {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== void 0 && v !== null)
        form.append(k, String(v));
    });
    return this.http.put(`${this.base}/admin/artisans/${id}`, form, { withCredentials: true });
  }
  adminDeactivate(id) {
    return this.http.delete(`${this.base}/admin/artisans/${id}`, { withCredentials: true });
  }
  static \u0275fac = function ArtisanService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtisanService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ArtisanService, factory: _ArtisanService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtisanService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ArtisanService
};
//# sourceMappingURL=chunk-AZ4XTC6P.js.map
