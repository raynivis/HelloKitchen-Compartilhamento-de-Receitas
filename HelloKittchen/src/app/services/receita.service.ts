import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { environment } from '../additional/environment.backend';
import { Receita } from '../models/receita.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private readonly API = environment.URL_BASE + '/recipes';
  private readonly http = inject(HttpClient);

  list(): Observable<Pagination<Receita>> {
    return this.http.get<Pagination<Receita>>(this.API);
  }

  listPage(page: number, limit: number): Observable<{ items: Receita[]; totalPages: number }> {
    const url = `${this.API}?page=${page}&limit=${limit}`;
    return this.http.get<Pagination<Receita>>(url).pipe(
      map(response => ({
        items: response.items,
        totalPages: response.meta.totalPages ?? 0 // Usa 0 se totalPages for undefined
      }))
    );
  }

  getAllRecipes(): Observable<Receita[]> {
    return this.http.get<{ items: Receita[]; meta: any }>(this.API).pipe(
      map((response) => {
        console.log('Resposta bruta da API:', response); // Adicionado para depuração
        return response.items || [];
      })
    );
  }

  getMyRecipes(): Observable<Pagination<Receita>>{
    return this.http.get<Pagination<Receita>>(`${this.API}/mine`);
  }

  getRecipesByCategory(
    categoryId: number,
    sortBy: string = 'score'
  ): Observable<Receita[]> {
    const url = `${this.API}?categoryId=${categoryId}&sortBy=${sortBy}`;
    return this.http.get<{ data: Receita[] }>(url).pipe(
      map((response) => response.data || []) // Extraímos o array de receitas
    );
  }

  // Criar receita
  createRecipe(Receita: { name: string; description: string; ingredients: string[] }): Observable<any> {
    return this.http.post<any>(this.API, Receita);
  }

  getReceitaDetalhes(id: number): Observable<Receita> {
    return this.http.get<Receita>(`${this.API}/${id}`);
  }

  adicionarComentario(id: number, comentario: string) {
    return this.http.post(`${this.API}/comentarios`, {
      receitaId: id,
      texto: comentario,
      usuarioId: localStorage.getItem('userId'), // Pegue o usuário autenticado
    });
  }

  adicionarAvaliacao(avaliacao: { "rating": number, "comment": string}, receitaId: number) {
    return this.http.post<{"rating": number, "comment": string}>(`${this.API}/${receitaId}/rating`, avaliacao);
  }

  publicar(receitaId:number, recipe: Receita): Observable<Receita>{
    return this.http.patch<Receita>(`${this.API}/${receitaId}/publish`, recipe);
  }

  deleteRecipe(receitaId:number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.API}/${receitaId}`);
  }


}
