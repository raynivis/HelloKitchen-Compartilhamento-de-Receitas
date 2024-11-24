import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../additional/environment.backend';
import { Livro } from '../models/livro.model';
import { catchError, Observable, throwError } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = environment.URL_BASE + '/books';
  private readonly http = inject(HttpClient);

  list(): Observable<Pagination<Livro>> {
    return this.http.get<Pagination<Livro>>(this.API);
  }

  addBook(livro: {name:string}): Observable<{name:string}>{
    return this.http.post<{name:string}>(this.API, livro);
  }

  updateBook(id: number, livro: {name:string}): Observable<{name:string}>{
    return this.http.patch<{name:string}>(`${this.API}/${id}`, livro);
  }

  deleteBook(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.API}/${id}`);
  }


}
