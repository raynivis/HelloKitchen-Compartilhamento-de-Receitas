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

  adicionarAvaliacao(avaliacao: any, receitaId: number) {
    return this.http.post(`${this.API}/${receitaId}/rating`, avaliacao);
  }
}
