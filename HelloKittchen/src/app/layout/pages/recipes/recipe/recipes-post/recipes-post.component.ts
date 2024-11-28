import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceitaService } from '../../../../../services/receita.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../../../../../models/categoria.model';
import { CategoriaService } from '../../../../../services/categoria.service';
import { environment } from '../../../../../additional/environment.backend';

@Component({
  selector: 'app-cook-post',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './recipes-post.component.html',
  styleUrl: './recipes-post.component.scss'
})
export class ReceitaPostComponent {
  private readonly categoriasService = inject(CategoriaService);
  private readonly API = environment.URL_BASE;
  private readonly http = inject(HttpClient);
  recipeData = {
    name: '',
    description: '',
    category: { id: 1 },
    preparationTime: 0,
    portion: 0,
    calories: 0,
  };

  ingredients = [{ name: '', amount: 0 , type: ''}];
  instructions = [{ step: '' }];
  selectedFile: File | null = null;
  categorias: Categoria[] = [];
  fileSelected = false;

  ngOnInit(): void {
    this.categoriasService.list().subscribe((dado) => {
      this.categorias = dado;
    });
  }

  trackByFn(index: number, item: Categoria): number {
    return item.id;
  }

  addIngredient() {
    this.ingredients.push({ name: '', amount: 0, type: '' });
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  addInstruction() {
    this.instructions.push({ step: '' });
  }

  removeInstruction(index: number) {
    this.instructions.splice(index, 1);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
    this.fileSelected = !!input.files?.length;
  }

  submitRecipe(event: Event) {
    event.preventDefault();

    // Enviar dados da receita
    this.http.post(`${this.API}/recipes`, this.recipeData).subscribe((recipe: any) => {
      const recipeId = recipe.id;

      // Enviar ingredientes
      this.ingredients.forEach((ingredient) => {
        this.http.post(`${this.API}/recipes/${recipeId}/ingredients`, ingredient).subscribe();
      });
      this.API
      // Enviar instruções
      this.instructions.forEach((instruction) => {
        this.http.post(`${this.API}/recipes/${recipeId}/instructions`, instruction).subscribe();
      });

      // Enviar imagem (se selecionada)
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.http.post(`${this.API}/recipes/${recipeId}/image`, formData).subscribe();
      }

      alert('Receita criada com sucesso!');
    });
  }

}
