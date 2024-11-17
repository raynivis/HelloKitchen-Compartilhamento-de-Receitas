import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  checkAuthentication(): void {
    if (this.isAuthenticated()) {
      console.log('Usuário autenticado.');
    }
  }

  private tokenKey = 'authToken';
  private userKey = 'authUser';

  // Salvar token e informações do usuário
  login(token: string, user: { id: string; name: string; email: string }) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Obter o token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obter informações do usuário logado
  getUser(): { id: string; name: string; email: string } | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Fazer logout e limpar informações
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
