import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit{
    bookId: string = '';
    recipes: any[] = [];
  
    constructor(private route: ActivatedRoute, private booksService: BooksService) {}
  
    ngOnInit(): void {
      this.bookId = this.route.snapshot.paramMap.get('bookId') || '';
  
      if (this.bookId) {
        this.booksService.getRecipesByBook(this.bookId).subscribe({
          next: (data) => {
            this.recipes = data; // Supondo que o back-end retorna uma lista de receitas
          },
          error: (err) => {
            console.error('Erro ao carregar receitas:', err);
          },
        });
      }
    }
  }
