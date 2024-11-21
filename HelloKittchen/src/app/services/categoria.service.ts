import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../additional/environment.backend';
import { Categoria } from '../models/categoria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly API = environment.URL_BASE + '/categories';
  private readonly http = inject(HttpClient);

  list(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API);
  }

  getCategoria(id:number){
    return this.http.get<Categoria>(`${this.API}/${id}`);
  }

}
