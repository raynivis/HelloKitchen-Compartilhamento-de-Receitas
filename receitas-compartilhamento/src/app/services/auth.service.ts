import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000'; // URL base do back-end

  constructor(private http: HttpClient) {}

  // Login de usuário
  loginUsuario(dadosLogin: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, dadosLogin);
  }

  // Cadastro de usuário
  cadastrarUsuario(dadosUsuario: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, dadosUsuario);
  }

  // Listar todos os usuários
  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  // Obter um usuário específico
  obterUsuario(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  // Atualizar dados de um usuário
  atualizarUsuario(id: string, dadosAtualizados: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/users/${id}`, dadosAtualizados);
  }

  // Deletar um usuário
  deletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
  
}
