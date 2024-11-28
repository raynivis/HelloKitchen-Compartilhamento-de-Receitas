import { Receita } from './../../../../../models/receita.model';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ReceitaService } from '../../../../../services/receita.service';
import { CommonModule } from '@angular/common';
import { LivroReceitasService } from '../../../../../services/livro.receitas.service';
import { LivroService } from '../../../../../services/livro.service';
import { Livro } from '../../../../../models/livro.model';


@Component({
  selector: 'app-books-page-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-page-content.component.html',
  styleUrl: './books-page-content.component.scss'
})
export class BooksPageContentComponent implements OnInit {
  @Input() id!: number;
  @ViewChild('livroAddModal') modalElement!: ElementRef;
  private readonly recipesService = inject(ReceitaService);
  private readonly bookRecipeService = inject(LivroReceitasService);
  private readonly livrosService = inject(LivroService);


  receitas: Receita[] = [];
  receitasAdicionar: Receita[] = [];
  livro!: Livro;
  @ViewChild('Inputnotes') Inputnotes!: ElementRef<HTMLInputElement>;
  @ViewChild('receitaId ') receitaId !: ElementRef<HTMLInputElement>;

  receitaNova: { recipe: { id: number }, notes: string } = { recipe: { id: 0 }, notes: '' };


  ngOnInit(): void {
    this.recipesService.getMyRecipes().subscribe(dado => {
      this.receitas = dado.items;
      this.livrosService.getBook(this.id).subscribe(dado => { this.livro = dado; this.verificarExistenciaLivro() });
    });
  }

  openModalAdd() {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  verificarExistenciaLivro() {
    for (const receita of this.receitas) {
      const esta = this.livro.recipes.find((recipe: any) => recipe.recipe.id === receita.id);
      if (!esta) {
        this.receitasAdicionar.push(receita)
      }
    }
  }

  adicionarLivroReceita() {
    if (this.receitaId.nativeElement.value == "-1") {
      alert('Erro: Seleciona uma receita!! está opção não é válida! ( ˶°ㅁ°)')
      return;
    }
    if (this.Inputnotes.nativeElement.value == '') {
      alert('Erro: Deixe alguma anotação!!! ( ˶°ㅁ°)')
      return;
    }
    this.receitaNova = { recipe: { id: Number(this.receitaId.nativeElement.value) }, notes: this.Inputnotes.nativeElement.value };
    this.bookRecipeService.addRecipe(this.id, this.receitaNova).subscribe();
    alert('Receita anotada com sucesso! ૮ ˶ᵔ ᵕ ᵔ˶ ა');
    window.location.reload();
  }
}
