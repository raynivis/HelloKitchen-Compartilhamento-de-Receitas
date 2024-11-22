import { Component, inject } from '@angular/core';
import { MenuPerfilComponent } from "./menu-perfil/menu-perfil.component";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-bar',
  standalone: true,
  imports: [MenuPerfilComponent,  FormsModule, CommonModule,],
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.scss'
})
export class RightBarComponent {
  
}
