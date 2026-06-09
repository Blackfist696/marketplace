import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Utilisateur, Adresse } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = environment.apiUrl;

  currentUser = signal<Utilisateur | null>(null);
  currentUserAddresses = signal<Adresse[]>([]);
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
      switchMap(res => {
        if (res?.data?.id_utilisateur) {
          return this.loadProfile().pipe(tap(() => {}), switchMap(() => of(res)));
        }
        return of(res);
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
      tap(() => this.currentUser.set(null)),
      catchError(() => { this.currentUser.set(null); return of(null); })
    );
  }

  loadProfile(): Observable<any> {
    return this.http.get<any>(`${this.base}/profile`, { withCredentials: true }).pipe(
      tap(res => {
        if (res?.data?.utilisateur) {
          this.currentUser.set(res.data.utilisateur);
          this.currentUserAddresses.set(res.data.adresses ?? []);
        } else if (res?.data && !res.data.utilisateur) {
          this.currentUser.set(res.data);
          this.currentUserAddresses.set(res.data.adresses ?? []);
        }
      }),
      catchError(() => {
        this.currentUser.set(null);
        this.currentUserAddresses.set([]);
        return of(null);
      })
    );
  }

  getDisplayName(): string {
    const user = this.currentUser();
    const prenom = user?.prenom?.trim();
    if (prenom) {
      return prenom;
    }

    const nom = user?.nom?.trim();
    if (nom) {
      return nom;
    }

    return 'Profil';
  }

  updateProfile(data: Record<string, string>): Observable<any> {
    const body = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        body.set(key, value);
      }
    });

    return this.http.put<any>(`${this.base}/profile`, body.toString(), {
      withCredentials: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).pipe(
      switchMap(() => this.loadProfile()),
      catchError(() => of(null))
    );
  }

  saveAddress(data: Record<string, any>): Observable<any> {
    const body = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        body.set(key, String(value));
      }
    });

    if (data['id_adresse']) {
      return this.http.put<any>(`${this.base}/api/user-addresses/${this.currentUser()?.id_utilisateur}/${data['id_adresse']}`, body.toString(), {
        withCredentials: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }).pipe(
        switchMap(() => this.loadProfile()),
        catchError(() => of(null))
      );
    }

    return this.http.post<any>(`${this.base}/api/user-addresses`, body.toString(), {
      withCredentials: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).pipe(
      switchMap(() => this.loadProfile()),
      catchError(() => of(null))
    );
  }
}
