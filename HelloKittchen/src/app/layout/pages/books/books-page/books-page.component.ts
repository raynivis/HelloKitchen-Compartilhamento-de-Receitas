import { Component } from '@angular/core';
import { ImagesPefilService } from '../../../../services/images.pefil.service';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss'
})
export class BooksPageComponent {
  constructor(public imageService: ImagesPefilService){
  }
}
