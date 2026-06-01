import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produit, Categorie } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categorie[]> {
    return this.http.get<any>(`${this.base}/categories`)
      .pipe(map(r => r.data ?? []));
  }

  getAll(): Observable<Produit[]> {
    return this.http.get<any>(`${this.base}/products`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getById(id: number): Observable<Produit> {
    return this.http.get<any>(`${this.base}/products/${id}`, { withCredentials: true })
      .pipe(map(r => r.data));
  }

  getByArtisan(artisanId: number): Observable<Produit[]> {
    return this.http.get<any>(`${this.base}/artisans/${artisanId}/products`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getMyProducts(): Observable<Produit[]> {
    return this.http.get<any>(`${this.base}/artisan/products`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  create(data: Partial<Produit>): Observable<any> {
    const form = this.toForm(data);
    return this.http.post<any>(`${this.base}/products`, form, { withCredentials: true });
  }

  update(id: number, data: Partial<Produit>): Observable<any> {
    const form = this.toForm(data);
    return this.http.put<any>(`${this.base}/products/${id}`, form, { withCredentials: true });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/products/${id}`, { withCredentials: true });
  }

  adminGetAll(): Observable<Produit[]> {
    return this.http.get<any>(`${this.base}/admin/products`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  adminUpdate(id: number, data: Partial<Produit>): Observable<any> {
    const form = this.toForm(data);
    return this.http.put<any>(`${this.base}/admin/products/${id}`, form, { withCredentials: true });
  }

  adminDeactivate(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/admin/products/${id}`, { withCredentials: true });
  }

  private toForm(data: any): FormData {
    const f = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) f.append(k, String(v)); });
    return f;
  }
}
