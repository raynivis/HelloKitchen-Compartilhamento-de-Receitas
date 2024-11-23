import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-content-wc',
  standalone: true,
  imports: [],
  templateUrl: './content-wc.component.html',
  styleUrl: './content-wc.component.scss'
})
export class ContentWcComponent {
  user: Usuario | null = null;
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.authService.atualUser.subscribe((user) => {
      this.user = user;
    });
  }


}
