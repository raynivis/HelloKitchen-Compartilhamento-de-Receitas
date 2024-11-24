import { Component } from '@angular/core';
import { ReceitaService } from '../../../../../services/receita.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cooks-cadastro',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './cooks-cadastro.component.html',
  styleUrl: './cooks-cadastro.component.scss'
})
export class CooksCadastroComponent {
  recipe = {
    name: '',
    description: '',
    ingredients: [''], // Array de ingredientes
  };

  isSubmitting = false;

  constructor(private receitaService: ReceitaService) {}

  addIngredient(): void {
    this.recipe.ingredients.push('');
  }

  removeIngredient(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }

  submitRecipe(): void {
    this.isSubmitting = true;

    this.receitaService.createRecipe(this.recipe).subscribe({
      next: () => {
        alert('Receita cadastrada com sucesso!');
        this.closeModal();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Erro ao cadastrar receita:', err);
        alert('Erro ao cadastrar receita.');
        this.isSubmitting = false;
      },
    });
  }

  closeModal(): void {
    const modalElement = document.getElementById('recipeModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }
}
