import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImagesPerfilService } from '../../../additional/images.perfil.service';
import { Usuario } from '../../../models/usuario.model';
import { ReceitaService } from '../../../services/receita.service';
import { Receita } from '../../../models/receita.model';
import { StarsComponent } from "../../items/stars/stars.component";
import { StarsService } from '../../../additional/stars.service';
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
  public readonly imageService = inject(ImagesPerfilService);
  private authService = inject(AuthService)
  private readonly receitasService = inject(ReceitaService);
  errorMessage: string = '';
  @ViewChild('usuarioEditarModal') modalElement!: ElementRef;
  @ViewChild('InputNome') InputNome!: ElementRef;
  userNovo!: Usuario;
  receitas: Receita[] = [];
  public readonly starsService = inject(StarsService);


  ngOnInit() {
    this.authService.atualUser.subscribe((user) => {
      this.user = user;
    });

    if (this.user) {
      this.isAuthenticated = true;
      console.log('Usuário logado:', this.user.name);
      this.receitasService.getMyRecipes().subscribe(dado => {
        this.receitas = dado.items;
      });
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

  openModalEdit() {
    if (this.isAuthenticated) {
      this.InputNome.nativeElement.value = this.user!.name;
      const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  salvarUsuario(){
  this.authService.getUsers(this.user?.id!).subscribe(dado => {
    this.userNovo = dado;
    this.userNovo.name = this.InputNome.nativeElement.value;
    this.authService.updateUser(this.userNovo.id, this.userNovo).subscribe();
    alert('Suas informações foram atualizadas!');
    window.location.reload();

  });
  }

  calcularEstrelas(): number{
    var soma = 0;
    var i = 0;
    for (const receita of this.receitas) {
      if(receita.published_at){
        soma = receita.score;
        i++;
      }
    }
    return soma/i;
  }

}
