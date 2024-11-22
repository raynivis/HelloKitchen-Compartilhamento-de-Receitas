import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
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
  public userKey = 'authUser';

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Salvar token e informações do usuário
  login(token: string,  usuario: Observable<Usuario>) {
    if (!token || !usuario) {
      console.error('Tentativa de login com dados inválidos:', { token, usuario });
      return;
    }

    console.log('Salvando token e usuário no localStorage:', { token, usuario });
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(usuario));
  }



  // Obter o token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obter informações do usuário logado
  getUser(): Usuario | undefined {
    const user = localStorage.getItem(this.userKey);

    if (!user) {
      console.warn('Chave authUser não encontrada no localStorage.');
      return undefined;
    }

    try {
      return JSON.parse(user); // Faz o parse do JSON
    } catch (error) {
      console.error('Erro ao parsear o JSON do usuário:', error);
      return undefined; // Retorna null em caso de erro no JSON
    }
  }

  getUserName(): string | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user).name : null;
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
