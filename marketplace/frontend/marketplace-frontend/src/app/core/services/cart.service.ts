import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { CartLine, CartResponse } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly base = environment.apiUrl;

  lines = signal<CartLine[]>([]);
  count = computed(() => this.lines().reduce((s, l) => s + l.quantite, 0));
  total = computed(() => this.lines().reduce((s, l) => s + (l.produit.prix_ht * l.quantite), 0));

  constructor(private http: HttpClient) {}

  load(): Observable<CartResponse> {
    return this.http.get<any>(`${this.base}/cart`, { withCredentials: true }).pipe(
      map(r => r.data as CartResponse),
      tap(data => this.lines.set(data?.lines ?? []))
    );
  }

  add(idProduit: number, quantite: number): Observable<any> {
    const form = new FormData();
    form.append('id_produit', String(idProduit));
    form.append('quantite', String(quantite));
    return this.http.post<any>(`${this.base}/cart`, form, { withCredentials: true })
      .pipe(tap(() => this.load().subscribe()));
  }

  updateQty(idProduit: number, quantite: number): Observable<any> {
    if (quantite < 1) return this.remove(idProduit);
    const form = new FormData();
    form.append('quantite', String(quantite));
    return this.http.put<any>(`${this.base}/cart/${idProduit}`, form, { withCredentials: true })
      .pipe(tap(() => this.load().subscribe()));
  }

  remove(idProduit: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/cart/${idProduit}`, { withCredentials: true })
      .pipe(tap(() => this.load().subscribe()));
  }

  clear() {
    this.lines.set([]);
  }
}
