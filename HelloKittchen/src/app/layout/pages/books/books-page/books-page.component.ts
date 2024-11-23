import { Component, inject } from '@angular/core';
import { ImagesPefilService } from '../../../../additional/images.pefil.service';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss'
})
export class BooksPageComponent {
  public readonly imageService = inject(ImagesPefilService);
}
