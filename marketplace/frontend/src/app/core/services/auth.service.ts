import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Utilisateur } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = environment.apiUrl;

  currentUser = signal<Utilisateur | null>(null);
  isLoggedIn  = computed(() => this.currentUser() !== null);
  isAdmin     = computed(() => this.currentUser()?.id_role === 1);
  isArtisan   = computed(() => this.currentUser()?.id_role === 2);
  isClient    = computed(() => this.currentUser()?.id_role === 3);

  constructor(private http: HttpClient) {}

  login(email: string, mot_de_passe: string): Observable<any> {
    const body = new FormData();
    body.append('email', email);
    body.append('mot_de_passe', mot_de_passe);
    return this.http.post<any>(`${this.base}/login`, body, { withCredentials: true }).pipe(
      tap(res => {
        if (res?.data?.id_utilisateur) {
          this.loadProfile().subscribe();
        }
      })
    );
  }

  register(email: string, mot_de_passe: string, id_role: number): Observable<any> {
    const body = new FormData();
    body.append('email', email);
    body.append('mot_de_passe', mot_de_passe);
    body.append('id_role', String(id_role));
    return this.http.post<any>(`${this.base}/register`, body, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.base}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.currentUser.set(null))
    );
  }

  loadProfile(): Observable<any> {
    return this.http.get<any>(`${this.base}/profile`, { withCredentials: true }).pipe(
      tap(res => {
        if (res?.data) this.currentUser.set(res.data);
      }),
      catchError(() => { this.currentUser.set(null); return of(null); })
    );
  }
}
