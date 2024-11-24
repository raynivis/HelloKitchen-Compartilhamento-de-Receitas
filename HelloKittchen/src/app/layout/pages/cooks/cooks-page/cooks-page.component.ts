import { Component, inject, OnInit } from '@angular/core';
import { ImagesPefilService } from '../../../../additional/images.pefil.service';
import { ReceitaService } from '../../../../services/receita.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receita } from '../../../../models/receita.model';
import { Categoria } from '../../../../models/categoria.model';
@Component({
  selector: 'app-cooks-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cooks-page.component.html',
  styleUrl: './cooks-page.component.scss'
})
export class CooksPageComponent implements OnInit{
  public readonly imageService = inject(ImagesPefilService);
  private readonly route = inject(ActivatedRoute);
  private readonly receitaService = inject(ReceitaService);
  id!: number; //id da categoria
  receitas: Receita[] = []; // Lista de receitas
  isLoading = true; // Indica carregamento
  sortBy: string = 'score';
  categoryId: number | null = null; // ID da categoria capturada na URL

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; //recebendo no id o get passado por parametro
      this.categoryId = this.id ? +this.id : null;

      if (this.categoryId) {
        this.loadRecipes();
      } else {
        console.error('ID de categoria não encontrado na URL.');
        this.isLoading = false;
      }
    });
  }

  loadRecipes(): void {
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
  
  generateStarArray(score: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (score >= i) {
        stars.push('full'); // Estrela cheia
      } else if (score > i - 1) {
        stars.push('half'); // Estrela pela metade
      } else {
        stars.push('empty'); // Estrela vazia
      }
    }
    return stars;
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
  
}
