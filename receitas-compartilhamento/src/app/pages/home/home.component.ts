import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: any[] = [];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
      },
    });
  }

  viewBookRecipes(bookId: string) {
    this.router.navigate([`/books/${bookId}/recipes`]);
  }
}
