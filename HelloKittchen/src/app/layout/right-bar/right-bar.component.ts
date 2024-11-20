import { Component, inject } from '@angular/core';
import { MenuPerfilComponent } from "./menu-perfil/menu-perfil.component";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-bar',
  standalone: true,
  imports: [MenuPerfilComponent,  FormsModule, CommonModule,],
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.scss'
})
export class RightBarComponent {
  user: { id: string; name: string; email: string } | null = null;
  private http = inject(HttpClient); // Injeta o HttpClient
  // Dados para Login e Cadastro
  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };
  isAuthenticated = false;
  userName = ''; // Armazena o nome do usuário logado

  constructor(private authService: AuthService) {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userName = 'Mayara';
    }
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.isAuthenticated = false;
    alert('Logout realizado com sucesso!');
  }

  login(event: Event) {
    event.preventDefault(); // Evita recarregar a página ao submeter o formulário
    this.http.post('http://localhost:3000/auth/login', this.loginData).subscribe(
      (response: any) => {
        const token = response.token; // Token retornado pelo backend
        const user = response.user;  // Dados do usuário retornados
        this.user = user;
        console.log('Login realizado com sucesso:', response);
        this.authService.login(token, user);
        alert('Login realizado com sucesso!');
        this.resetForms();
        const modalElement = document.getElementById('userModal');
        if (modalElement) {
          modalElement.classList.remove('show'); // Remove a classe Bootstrap que exibe o modal
          modalElement.setAttribute('aria-hidden', 'true');
          modalElement.style.display = 'none';
          document.body.classList.remove('modal-open'); // Remove o estilo aplicado ao body
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove(); // Remove o backdrop
          }
        }

        // Atualizar a interface da Home para o estado autenticado
        this.updateUIForAuthenticatedUser();
        location.reload();
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    );
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
