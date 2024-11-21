import { Component, inject, OnInit } from '@angular/core';
import { ImagesPefilService } from '../../../additional/images.pefil.service';
import { ContentBooksComponent } from "./content-books/content-books.component";
import { RouterModule } from '@angular/router';
import { LivroService } from '../../../services/livro.service';
import { Livro } from '../../../models/livro.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [ContentBooksComponent, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit{
  public readonly imageService = inject(ImagesPefilService);
  private readonly livrosService = inject(LivroService);
  livros: Livro[] = [];


  ngOnInit(): void {
    this.livrosService.list().subscribe((dado) => {
      this.livros = dado;
    });
  }



}
