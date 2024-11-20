import { Component } from '@angular/core';
import { MenuComponent } from "./menu/menu.component";
import { ContentsLeftComponent } from "./contents-left/contents-left.component";

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [MenuComponent, ContentsLeftComponent],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.scss'
})
export class LeftBarComponent {

}
