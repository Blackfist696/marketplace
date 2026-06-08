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

// src/app/core/services/order.service.ts
var OrderService = class _OrderService {
  http;
  base = environment.apiUrl;
  constructor(http) {
    this.http = http;
  }
  getClientOrders() {
    return this.http.get(`${this.base}/orders`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getArtisanOrders() {
    return this.http.get(`${this.base}/artisan/orders`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getAdminOrders() {
    return this.http.get(`${this.base}/admin/orders`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  getById(id) {
    return this.http.get(`${this.base}/orders/${id}`, { withCredentials: true }).pipe(map((r) => r.data));
  }
  create(idAdresse, fraisLivraison) {
    const form = new FormData();
    form.append("id_adresse", String(idAdresse));
    form.append("frais_livraison", String(fraisLivraison));
    return this.http.post(`${this.base}/orders`, form, { withCredentials: true });
  }
  getLignes(idCommande) {
    return this.http.get(`${this.base}/api/commandes/${idCommande}/lignes`, { withCredentials: true }).pipe(map((r) => r.data ?? []));
  }
  updateAdminOrderStatus(id, statut) {
    const form = new FormData();
    form.append("statut", statut);
    return this.http.put(`${this.base}/admin/orders/${id}`, form, { withCredentials: true });
  }
  static \u0275fac = function OrderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrderService, factory: _OrderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  OrderService
};
//# sourceMappingURL=chunk-G5RZROR4.js.map
