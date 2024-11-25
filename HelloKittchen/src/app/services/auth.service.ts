import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../additional/environment.backend';
import { StorageService } from './storage.service';
import { LoginData } from '../models/login.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseAPI = environment.URL_BASE + '/auth';
  private readonly API = environment.URL_BASE;
  private readonly baseAPIUser = environment.URL_BASE + '/users';
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  private currentUserSubject!: BehaviorSubject<Usuario | null>;
  public atualUser!: Observable<Usuario | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      this.getUserStorage(false)
    );
    this.atualUser = this.currentUserSubject.asObservable();
  }
  login(email: string, password: string): Observable<Usuario | null> {
    return this.http
      .post<LoginData>(this.baseAPI + '/login', {
        email,
        password,
      })
      .pipe(
        switchMap((resp) => {
          if (resp.access_token) {
            const headers = {
              Authorization: `${resp.token_type} ${resp.access_token}`,
            };

            return this.http.get<Usuario>(this.baseAPI + '/me', { headers }).pipe(
              map((user) => {
                user = { ...user, ...resp };
                this.storageService.set('user', user);
                this.currentUserSubject.next(user);
                return user;
              })
            );
          } else {
            return of(null);
          }
        })
      );
  }

  logout(): void {
    this.storageService.remove('user');
    this.currentUserSubject.next(null);
  }

  saveToken(token: string): void {
    this.storageService.set('user', token);
  }

  getUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  getUserById(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/users/${userId}`);
  }
  

  isLoggedIn(): boolean {
    const user = this.getUserStorage(false);

    return !!(user && user.access_token !== null);
  }

  private getUserStorage(isRediret: boolean = true): Usuario | null {
    let user: Usuario | null = null;

    try {
      user = this.storageService.get('user');
    } catch (error) {
      this.logout();
      if (isRediret) {
        this.router.navigate(['/login']);
      }
    }
    return user;
  }

  updateUser(id: number, user: Usuario): Observable<Usuario>{
    return this.http.patch<Usuario>(`${this.baseAPIUser}/${id}`, user);
  }

  getUsers(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseAPIUser}/${id}`);
  }

}

