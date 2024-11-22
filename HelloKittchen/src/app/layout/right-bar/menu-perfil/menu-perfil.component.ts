import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-menu-perfil',
  standalone: true,
  imports: [FormsModule ,CommonModule,RouterModule],
  templateUrl: './menu-perfil.component.html',
  styleUrl: './menu-perfil.component.scss'
})
export class MenuPerfilComponent {
  user: { id: string; name: string; email: string } | null = null;
  private http = inject(HttpClient); // Injeta o HttpClient
  // Dados para Login e Cadastro
  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };
  isAuthenticated = false;
  userName = ''; // Armazena o nome do usuário logado

  constructor(private authService: AuthService) {
  }


  ngOnInit() {
    console.log('localStorage (authUser):', localStorage.getItem(this.authService.userKey));
    this.user = this.authService.getUser();
  
    if (this.user) {
      this.userName = this.user.name;
      this.isAuthenticated = true;
      console.log('Usuário logado:', this.user);
    } else {
      console.warn('Nenhum usuário logado.');
      this.isAuthenticated = false;
    }
  }  

  logout() {
    this.authService.logout();
    this.user = null;
    this.isAuthenticated = false;
    alert('Logout realizado com sucesso!');
    window.location.reload();
  }

  login(event: Event) {
    event.preventDefault();
  
    const { email, password } = this.loginData;
  
    // Primeira requisição: Obter o token
    this.http.post('http://localhost:3000/auth/login', { email, password }).subscribe({
      next: (response: any) => {
        const token = response.access_token;
        const tokenType = response.token_type;
  
        if (!token || !tokenType) {
          console.error('Resposta de login incompleta:', response);
          alert('Erro ao fazer login. Token não recebido.');
          return;
        }
  
        // Salve o token no AuthService
        this.authService.saveToken(token);
  
        // Segunda requisição: Obter os dados do usuário
        this.http.get('http://localhost:3000/auth/me', {
          headers: { Authorization: `${tokenType} ${token}` },
        }).subscribe({
          next: (user: any) => {
            if (!user) {
              console.error('Nenhum usuário retornado pelo servidor.');
              alert('Erro ao buscar os dados do usuário.');
              return;
            }
  
            // Salve o usuário no AuthService
            this.authService.login(token, user);
  
            // Atualize a interface
            this.user = user;
            this.isAuthenticated = true;
  
            // Feche o modal de login
            this.closeModal();
            
            alert(`Login realizado com sucesso! Bem-vindo(a), ${user.name}`);
            window.location.reload();
          },
          error: (err) => {
            console.error('Erro ao buscar os dados do usuário:', err);
            alert('Erro ao buscar os dados do usuário.');
          },
        });
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      },
    });
  }
  
  closeModal(): void {
    const modalElement = document.getElementById('userModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }  

  register(event: Event) {
    event.preventDefault(); // Evita recarregar a página ao submeter o formulário
    this.http.post('http://localhost:3000/users', this.registerData).subscribe(
      (response) => {
        console.log('Cadastro realizado com sucesso:', response);
        alert('Usuário cadastrado com sucesso!');
        this.resetForms();
        this.switchToLogin();
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Verifique os dados.');
      }
    );
  }

  switchToLogin(): void {
    const loginTab = document.getElementById('pills-login-tab');
    loginTab?.click();
  }

  resetForms() {
    // Limpa os campos após o login ou cadastro
    this.loginData = { email: '', password: '' };
    this.registerData = { name: '', email: '', password: '' };
  }

  updateUIForAuthenticatedUser(): void {
    this.isAuthenticated = true; // Variável de estado no componente
  }

}
