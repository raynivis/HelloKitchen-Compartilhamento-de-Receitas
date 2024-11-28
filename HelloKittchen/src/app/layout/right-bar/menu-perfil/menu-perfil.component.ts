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
import { LoginComponent } from "./login/login.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
@Component({
  selector: 'app-menu-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, LoginComponent, CadastroComponent],
  templateUrl: './menu-perfil.component.html',
  styleUrl: './menu-perfil.component.scss'
})
export class MenuPerfilComponent {
  user: Usuario | null = null;
  private http = inject(HttpClient); // Injeta o HttpClient
  // Dados para Login e Cadastro
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

  switchToLogin(): void {
    const loginTab = document.getElementById('pills-login-tab');
    loginTab?.click();
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
    this.authService.updateUserToken(this.userNovo);
    alert('Suas informações foram atualizadas!');
    window.location.reload();
  });
  }

  calcularEstrelas(): number{
    let soma = 0;
    let i = 0;
    for (const receita of this.receitas) {
      if(receita.published_at && receita.score != null){
        console.log(receita.score);
        soma += receita.score;
        i++;
      }
    }
    return soma/i;
  }

}
