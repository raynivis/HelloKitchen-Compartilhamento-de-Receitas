import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { environment } from '../additional/environment.backend';
import { Receita } from '../models/receita.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private readonly API = environment.URL_BASE + '/recipes';
  private readonly http = inject(HttpClient);

  list(): Observable<Pagination<Receita>> {
    return this.http.get<Pagination<Receita>>(this.API);
  }
}
