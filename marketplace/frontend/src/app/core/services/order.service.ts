import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Commande, LigneCommande, StatutCommande } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClientOrders(): Observable<Commande[]> {
    return this.http.get<any>(`${this.base}/orders`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getArtisanOrders(): Observable<Commande[]> {
    return this.http.get<any>(`${this.base}/artisan/orders`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getAdminOrders(): Observable<Commande[]> {
    return this.http.get<any>(`${this.base}/admin/orders`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getById(id: number): Observable<Commande> {
    return this.http.get<any>(`${this.base}/orders/${id}`, { withCredentials: true })
      .pipe(map(r => r.data));
  }

  create(idAdresse: number, fraisLivraison: number): Observable<any> {
    const form = new FormData();
    form.append('id_adresse', String(idAdresse));
    form.append('frais_livraison', String(fraisLivraison));
    return this.http.post<any>(`${this.base}/orders`, form, { withCredentials: true });
  }

  getLignes(idCommande: number): Observable<LigneCommande[]> {
    return this.http.get<any>(`${this.base}/api/commandes/${idCommande}/lignes`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  updateAdminOrderStatus(id: number, statut: StatutCommande): Observable<any> {
    const form = new FormData();
    form.append('statut', statut);
    return this.http.put<any>(`${this.base}/admin/orders/${id}`, form, { withCredentials: true });
  }
}
