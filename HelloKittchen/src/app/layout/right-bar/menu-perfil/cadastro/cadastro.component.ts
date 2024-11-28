import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  registerData = { name: '', email: '', password: '' };
  private http = inject(HttpClient); // Injeta o HttpClient


  register(event: Event) {
    event.preventDefault(); // Evita recarregar a página ao submeter o formulário
    if (!this.validaPassword(this.registerData.password)){
      alert('A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo.');
      return;
    }


    this.http.post('http://localhost:3000/users', this.registerData).subscribe(
      (response) => {
        console.log('Cadastro realizado com sucesso:', response);
        alert('Usuário cadastrado com sucesso!');
        this.registerData = { name: '', email: '', password: '' };
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Verifique os dados.');
      }
    );
  }

  validaPassword(password: string): boolean {
    // Critérios
    const hasUpperCase = /[A-Z]/.test(password); // Verifica se tem letra maiúscula
    const hasNumber = /\d/.test(password); // Verifica se tem número
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Verifica se tem símbolo

    return hasUpperCase && hasNumber && hasSymbol;
  }


}
