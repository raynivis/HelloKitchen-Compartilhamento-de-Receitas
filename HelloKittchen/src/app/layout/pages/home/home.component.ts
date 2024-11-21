import { ImagesPefilService } from './../../../services/images.pefil.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ContentWcComponent } from "./content-wc/content-wc.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContentWcComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user: { id: string; name: string; email: string } | null = null;
  private http = inject(HttpClient); // Injeta o HttpClient
  isAuthenticated = false;
  userName = ''; // Armazena o nome do usuário logado

  constructor(private authService: AuthService, public imageService: ImagesPefilService) {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userName = 'Mayara';
    }
  }
}
