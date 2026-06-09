import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AdminStats, Commande, Utilisateur } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStats(filters: Record<string, string> = {}): Observable<AdminStats> {
    const params = new URLSearchParams(filters).toString();
    const url = `${this.base}/admin/stats${params ? '?' + params : ''}`;
    return this.http.get<any>(url, { withCredentials: true }).pipe(map(r => r.data));
  }

  getUsers(): Observable<Utilisateur[]> {
    return this.http.get<any>(`${this.base}/admin/users`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getOrders(): Observable<Commande[]> {
    return this.http.get<any>(`${this.base}/admin/orders`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getUserAddresses(userId: number): Observable<any[]> {
    return this.http.get<any>(`${this.base}/api/utilisateurs/${userId}/adresses`, { withCredentials: true })
      .pipe(map(r => Array.isArray(r?.data) ? r.data : []));
  }

  createUser(data: Record<string, any>): Observable<any> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) form.append(k, String(v)); });
    return this.http.post<any>(`${this.base}/admin/users`, form, { withCredentials: true });
  }

  updateUser(id: number, data: Partial<Utilisateur>): Observable<any> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) form.append(k, String(v)); });
    return this.http.put<any>(`${this.base}/admin/users/${id}`, form, { withCredentials: true });
  }

  deactivateUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/admin/users/${id}`, { withCredentials: true });
  }
}
