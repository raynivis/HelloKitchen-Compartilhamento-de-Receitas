import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-cooks',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cooks.component.html',
  styleUrl: './cooks.component.scss'
})
export class CooksComponent implements OnInit{
  private readonly categoriasService = inject(CategoriaService);
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.categoriasService.list().subscribe((dado) => {
      this.categorias = dado;
    });
  }



}
