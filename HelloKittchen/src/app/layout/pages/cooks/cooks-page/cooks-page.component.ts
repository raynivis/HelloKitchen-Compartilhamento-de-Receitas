import { Component } from '@angular/core';
import { ImagesPefilService } from '../../../../services/images.pefil.service';

@Component({
  selector: 'app-cooks-page',
  standalone: true,
  imports: [],
  templateUrl: './cooks-page.component.html',
  styleUrl: './cooks-page.component.scss'
})
export class CooksPageComponent {

 constructor(public imageService: ImagesPefilService) {

 }
}
