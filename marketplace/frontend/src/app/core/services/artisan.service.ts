import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Artisan, ArtisanStats } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ArtisanService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Artisan[]> {
    return this.http.get<any>(`${this.base}/artisans`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getById(id: number): Observable<Artisan> {
    return this.http.get<any>(`${this.base}/artisans/${id}`, { withCredentials: true })
      .pipe(map(r => r.data));
  }

  getStats(): Observable<ArtisanStats> {
    return this.http.get<any>(`${this.base}/artisan/stats`, { withCredentials: true })
      .pipe(map(r => r.data));
  }

  adminGetAll(): Observable<Artisan[]> {
    return this.http.get<any>(`${this.base}/admin/artisans`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  create(data: Record<string, any>): Observable<any> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) form.append(k, String(v)); });
    return this.http.post<any>(`${this.base}/admin/artisans`, form, { withCredentials: true });
  }

  adminUpdate(id: number, data: Partial<Artisan>): Observable<any> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) form.append(k, String(v)); });
    return this.http.put<any>(`${this.base}/admin/artisans/${id}`, form, { withCredentials: true });
  }

  adminDeactivate(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/admin/artisans/${id}`, { withCredentials: true });
  }
}
