import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductConsultationStat } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConsultProductsService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  recordConsultation(data: { id_produit: number; id_artisan: number; id_utilisateur?: number }): Observable<any> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        form.append(k, String(v));
      }
    });
    return this.http.post<any>(`${this.base}/api/statistiques-artisans`, form, { withCredentials: true });
  }

  getMyConsultations(): Observable<ProductConsultationStat[]> {
    return this.http.get<any>(`${this.base}/api/artisan/consultations`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }
}
