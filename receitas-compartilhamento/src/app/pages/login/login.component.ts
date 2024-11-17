import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const dadosLogin = { email: this.email, senha: this.senha };

    this.authService.loginUsuario(dadosLogin).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);

        // Salvar o token no localStorage
        localStorage.setItem('token', response.token);

        // Redirecionar para a página inicial após login
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    });
  }
}
