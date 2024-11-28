import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Usuario } from '../../../../models/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = { email: '', password: '' };
  private authService = inject(AuthService);
  user: Usuario | null = null;
  errorMessage: string = '';


  login(event: Event) {
    event.preventDefault();

    const { email, password } = this.loginData;
    this.authService.login(email as string, password as string).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (resp) => {
        this.errorMessage = resp.error.message;
        console.log(resp.error.message);
        alert('Opa, parece que você errou algum dado na hora de digitar!');
      },
    });
  }

}
