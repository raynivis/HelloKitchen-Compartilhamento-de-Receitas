import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImagesPefilService } from '../../../additional/images.pefil.service';
import { Usuario } from '../../../models/usuario.model';
@Component({
  selector: 'app-menu-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './menu-perfil.component.html',
  styleUrl: './menu-perfil.component.scss'
})
export class MenuPerfilComponent {
  user: Usuario | null = null;
  private http = inject(HttpClient); // Injeta o HttpClient
  // Dados para Login e Cadastro
  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };
  isAuthenticated = false;
  public readonly imageService = inject(ImagesPefilService);
  errorMessage: string = '';

  constructor(private authService: AuthService) {
  }


  ngOnInit() {
    this.authService.atualUser.subscribe((user) => {
      this.user = user;
    });

    if (this.user) {
      this.isAuthenticated = true;
      console.log('Usuário logado:', this.user.name);
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

    const { email, password } = this.loginData;;
    this.authService.login(email as string, password as string).subscribe({
      next: () => {
        window.location.reload();
        alert(`Login realizado com sucesso! Bem-vindo(a), ${this.user!.name}`);
      },
      error: (resp) => {
        this.errorMessage = resp.error.message;
        console.log(resp.error.message);
        alert('Opa, parece que você errou algum dado na hora de digitar!');
        window.location.reload();
      },
    });

    // Feche o modal de login
    this.closeModal();
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
