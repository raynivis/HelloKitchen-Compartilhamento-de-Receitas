import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
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
  login(token: string, Usuario: { id: string; name: string; email: string }) {
    if (!token || !Usuario) {
      console.error('Tentativa de login com dados inválidos:', { token, Usuario });
      return;
    }
  
    console.log('Salvando token e usuário no localStorage:', { token, Usuario });
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(Usuario));
  }
  
   

  // Obter o token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obter informações do usuário logado
  getUser(): { id: string; name: string; email: string } | null {
    const user = localStorage.getItem(this.userKey);
  
    if (!user) {
      console.warn('Chave authUser não encontrada no localStorage.');
      return null;
    }
  
    try {
      return JSON.parse(user); // Faz o parse do JSON
    } catch (error) {
      console.error('Erro ao parsear o JSON do usuário:', error);
      return null; // Retorna null em caso de erro no JSON
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
