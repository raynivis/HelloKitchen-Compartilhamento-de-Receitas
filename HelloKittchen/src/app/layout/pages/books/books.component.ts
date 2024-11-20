import { Component } from '@angular/core';
import { ImagesPefilService } from '../../../services/images.pefil.service';
import { ContentBooksComponent } from "./content-books/content-books.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [ContentBooksComponent, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

  constructor(public imageService: ImagesPefilService){

  }
}
