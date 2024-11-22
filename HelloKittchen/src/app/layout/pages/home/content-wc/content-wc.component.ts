import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-content-wc',
  standalone: true,
  imports: [],
  templateUrl: './content-wc.component.html',
  styleUrl: './content-wc.component.scss'
})
export class ContentWcComponent {
  userName: string | null = '';
  isAuthenticated = false;
  constructor(private authService: AuthService) {
    this.checkAuthentication();
  }

  ngOnInit() {
    this.userName = this.authService.getUserName();
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userName =  this.authService.getUserName();
    }
  }
}
