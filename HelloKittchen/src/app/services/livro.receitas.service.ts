import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../additional/environment.backend';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { LivroReceita } from '../models/livroReceita.model';

@Injectable({
  providedIn: 'root'
})
export class LivroReceitasService {
  private readonly API = environment.URL_BASE + '/books';
  private readonly http = inject(HttpClient);

  list(id: number): Observable<Pagination<LivroReceita>> {
    return this.http.get<Pagination<LivroReceita>>(`${this.API}/${id}/recipes`);
  }

  addRecipe(id: number, recipe: {recipe: {id:number}, notes: string}): Observable<{recipe: {id:number}, notes: string}> {
     return this.http.post<{recipe: {id:number}, notes: string}>(`${this.API}/${id}/recipes`, recipe);
  }

  getRecipe(idBook: number, idRecipe: number): Observable<LivroReceita> {
    return this.http.get<LivroReceita>(`${this.API}/${idBook}/recipes/${idRecipe}`);
  }

  updateBookRecipe(idBook: number, idRecipe: number, bookrecipe: LivroReceita){
    return this.http.patch<LivroReceita>(`${this.API}/${idBook}/recipes/${idRecipe}`, bookrecipe);
  }

  deleteBook(idBook: number, idRecipe: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.API}/${idBook}/recipes/${idRecipe}`);
  }

}
