import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit{
  private readonly categoriasService = inject(CategoriaService);
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.categoriasService.list().subscribe((dado) => {
      this.categorias = dado;
    });
  }



}
