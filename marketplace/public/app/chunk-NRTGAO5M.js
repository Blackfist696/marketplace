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

// src/app/core/services/product.service.ts
var ProductService = class _ProductService {
  http;
  base = environment.apiUrl;
  constructor(http) {
    this.http = http;
  }
  getCategories() {
    return this.http.get(`${this.base}/categories`).pipe(map((r) => r.data ?? []));
  }
  getAll() {
    return this.http.get(`${this.base}/products`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getById(id) {
    return this.http.get(`${this.base}/products/${id}`, { withCredentials: true }).pipe(map((r) => r.data));
  }
  getByArtisan(artisanId) {
    return this.http.get(`${this.base}/artisans/${artisanId}/products`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getMyProducts() {
    return this.http.get(`${this.base}/artisan/products`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  create(data) {
    const form = this.toForm(data);
    return this.http.post(`${this.base}/products`, form, { withCredentials: true });
  }
  update(id, data) {
    const form = this.toForm(data);
    return this.http.put(`${this.base}/products/${id}`, form, { withCredentials: true });
  }
  delete(id) {
    return this.http.delete(`${this.base}/products/${id}`, { withCredentials: true });
  }
  adminGetAll() {
    return this.http.get(`${this.base}/admin/products`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  adminUpdate(id, data) {
    const form = this.toForm(data);
    return this.http.put(`${this.base}/admin/products/${id}`, form, { withCredentials: true });
  }
  adminDeactivate(id) {
    return this.http.delete(`${this.base}/admin/products/${id}`, { withCredentials: true });
  }
  toForm(data) {
    const f = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== void 0 && v !== null)
        f.append(k, String(v));
    });
    return f;
  }
  static \u0275fac = function ProductService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ProductService
};
//# sourceMappingURL=chunk-NRTGAO5M.js.map
