import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const dadosUsuario = {
      name: this.nome,
      email: this.email,
      password: this.senha,
    };

    this.authService.cadastrarUsuario(dadosUsuario).subscribe({
      next: (response) => {
        console.log('Cadastro bem-sucedido:', response);
        this.successMessage = 'Cadastro realizado com sucesso! Você pode fazer login agora.';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000); // Redireciona para login após 2 segundos
      },
      error: (error) => {
        console.error('Erro no cadastro:', error);
        this.errorMessage = 'Erro ao realizar cadastro. Verifique os dados e tente novamente.';
        this.successMessage = '';
      },
    });
  }
}
