import { Component, inject, OnInit } from '@angular/core';
import { ImagesPerfilService } from '../../../../additional/images.perfil.service';
import { ReceitaService } from '../../../../services/receita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receita } from '../../../../models/receita.model';
import { Categoria } from '../../../../models/categoria.model';
import { StarsService } from '../../../../additional/stars.service';
import { PostRecipeComponent } from "../../../items/post-recipe/post-recipe.component";
import { CategoriaService } from '../../../../services/categoria.service';
@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PostRecipeComponent],
  templateUrl: './categoria-page.component.html',
  styleUrl: './categoria-page.component.scss'
})
export class CategoriaPageComponent implements OnInit{
  public readonly imageService = inject(ImagesPerfilService);
  public readonly starsService = inject(StarsService);

  private readonly route = inject(ActivatedRoute);
  private readonly receitaService = inject(ReceitaService);
  private readonly router = inject(Router);
  private readonly categoriasService = inject(CategoriaService);
  id!: number; //id da categoria
  receitas: Receita[] = []; // Lista de receitas
  categorias: Categoria[] = [];
  isLoading = true; // Indica carregamento
  sortBy: string = 'score';
  categoryId: number | null = null; // ID da categoria capturada na URL

  ngOnInit(): void {
    this.categoriasService.list().subscribe((dado) => {
      this.categorias = dado;
      this.route.params.subscribe(params => {
        if(this.id){
          this.router.navigate(['/opss']);
        }
        this.id = params['id']; //recebendo no id o get passado por parametro
        this.categoryId = this.id ? +this.id : null;

        if (this.categoryId) {
          this.loadRecipes();
        } else {
          this.router.navigate(['/opss']);
          this.isLoading = false;
        }
      });
    });
  }

  loadRecipes(): void {
    if(this.categoryId! > this.categorias.length){
      this.router.navigate(['/opss']);
    }
    this.receitaService.getAllRecipes().subscribe({
      next: (data) => {
        console.log('Dados retornados pela API:', data); // Log para depuração
        if (Array.isArray(data)) {
          this.receitas = data.filter((recipe) => recipe.category.id === this.categoryId);
          console.log('Receitas filtradas:', this.receitas); // Verificar receitas filtradas
        } else {
          console.error('Formato inesperado de dados:', data);
          this.receitas = [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar receitas:', err);
        this.isLoading = false;
      },
    });
  }



  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value; // Atualiza o critério de ordenação
    this.isLoading = true; // Indica carregamento
    this.loadRecipes(); // Recarrega as receitas
  }

  sortRecipes(recipes: Receita[], sortBy: string): Receita[] {
    return recipes.sort((a, b) => {
      if (sortBy === 'score') {
        return (b.score || 0) - (a.score || 0);
      } else if (sortBy === 'preparationTime') {
        return a.preparationTime - b.preparationTime;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }

  abrirReceita(id: number): void {
    this.router.navigate(['/recipes', id]);
  }
}
