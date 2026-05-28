import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Adresse, Pays, Ville } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPays(): Observable<Pays[]> {
    return this.http.get<any>(`${this.base}/api/pays`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getVilles(): Observable<Ville[]> {
    return this.http.get<any>(`${this.base}/api/villes`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  getMyAddresses(): Observable<Adresse[]> {
    return this.http.get<any>(`${this.base}/api/user-addresses`, { withCredentials: true })
      .pipe(map(r => r.data ?? []));
  }

  create(data: Partial<Adresse>): Observable<any> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) form.append(k, String(v)); });
    return this.http.post<any>(`${this.base}/api/user-addresses`, form, { withCredentials: true });
  }

  delete(idUtilisateur: number, idAdresse: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/api/user-addresses/${idUtilisateur}/${idAdresse}`, { withCredentials: true });
  }
}
