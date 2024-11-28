import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../../../../../services/receita.service';
import { CategoriaService } from '../../../../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receita } from '../../../../../models/receita.model';
import { Categoria } from '../../../../../models/categoria.model';
import { Ingrediente } from '../../../../../models/ingrediente.model';
import { Instrucao } from '../../../../../models/instrucao.model';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  receitas: Receita[] = [];

  categorias: Categoria[] = [];
  ingredients: Ingrediente[] = [];
  instructions: Instrucao[] = [];
  fileSelected = false;

  private receitaService = inject(ReceitaService);
  private categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeId: number = 0;
  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.params['id']); // Obtém o ID da receita pela rota
    this.loadRecipe(this.recipeId); // Carrega os dados da receita
    this.loadCategories(); // Carrega as categorias disponíveis
  }

  // Carregar dados da receita
  loadRecipe(id: number): void {
    this.receitaService.getMyRecipes().subscribe((dado) => {
      this.receitas = dado.items;
  
      // Busca a receita com o ID correspondente
      const receitaEncontrada = this.receitas.find((receita) => receita.id === id);
  
      if (receitaEncontrada) {
        this.receitas[0] = receitaEncontrada; // Define a receita encontrada
        this.ingredients = [...this.receitas[0].ingredients]; // Preenche os ingredientes
        this.instructions = [...this.receitas[0].instructions]; // Preenche as instruções
      } else {
        alert('Receita não encontrada.');
      }
    });
  }
  

  // Carregar categorias
  loadCategories(): void {
    this.categoriaService.list().subscribe((dado) => {
      this.categorias = dado;
    });
  }

  // Atualizar receita
  updateRecipe(event: Event): void {
    event.preventDefault();

    // Atualiza os ingredientes e instruções
    this.receitas[0].ingredients = this.ingredients;
    this.receitas[0].instructions = this.instructions;

    // Chama o serviço para atualizar a receita
    this.receitaService.updateReceita(this.receitas[0]).subscribe(
      () => {
        alert('Receita atualizada com sucesso!');
        this.router.navigate(['/my-recipes']); // Redireciona após salvar
      },
      (error) => {
        console.error('Erro ao atualizar a receita:', error);
        alert('Erro ao atualizar a receita. Por favor, tente novamente.');
      }
    );
  }

  // Gerenciar Ingredientes
  addIngredient(): void {
    this.ingredients.push({
      name: '',
      amount: 0,
      type: '',
      recipe: this.receitas[0],
      id: 0,
      dateCreated: '',
      lastUpdated: ''
    });
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }

  // Gerenciar Instruções
  addInstruction(): void {
    this.instructions.push({
      step: '',
      recipe: this.receitas[0],
      id: 0,
      dateCreated: '',
      lastUpdated: ''
    });
  }

  removeInstruction(index: number): void {
    this.instructions.splice(index, 1);
  }

  // Upload de Imagem
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fileSelected = !!input.files?.length;
  }
}
