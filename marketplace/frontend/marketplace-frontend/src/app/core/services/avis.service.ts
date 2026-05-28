import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Avis } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AvisService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByProduit(idProduit: number): Observable<Avis[]> {
    return this.http.get<any>(`${this.base}/api/produits/${idProduit}/avis`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getAll(): Observable<Avis[]> {
    return this.http.get<any>(`${this.base}/api/avis`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  create(data: Partial<Avis>): Observable<any> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) form.append(k, String(v)); });
    return this.http.post<any>(`${this.base}/api/avis`, form, { withCredentials: true });
  }

  update(id: number, data: Partial<Avis>): Observable<any> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) form.append(k, String(v)); });
    return this.http.put<any>(`${this.base}/api/avis/${id}`, form, { withCredentials: true });
  }
}
