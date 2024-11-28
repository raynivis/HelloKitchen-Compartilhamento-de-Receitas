import { Component, inject } from '@angular/core';
import { MenuPerfilComponent } from "./menu-perfil/menu-perfil.component";
import { ContentsRightComponent } from "./contents-right/contents-right.component";

@Component({
  selector: 'app-right-bar',
  standalone: true,
  imports: [MenuPerfilComponent, ContentsRightComponent],
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.scss'
})
export class RightBarComponent {
  
}
