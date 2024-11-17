import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'http://localhost:3000'; // Substitua pelo URL real do seu back-end

  constructor(private http: HttpClient) {}

  // Obter todos os livros de receitas
  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/books`);
  }

  // Obter receitas de um livro específico
  getRecipesByBook(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/books/${bookId}/recipes`);
  }
}
