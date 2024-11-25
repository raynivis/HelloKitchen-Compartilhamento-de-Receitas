import { Receita } from './../../../../../models/receita.model';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ReceitaService } from '../../../../../services/receita.service';
import { CommonModule } from '@angular/common';
import { LivroReceitasService } from '../../../../../services/livro.receitas.service';


@Component({
  selector: 'app-books-page-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-page-content.component.html',
  styleUrl: './books-page-content.component.scss'
})
export class BooksPageContentComponent implements OnInit{
  @Input() id!: number;
  @ViewChild('livroAddModal') modalElement!: ElementRef;
  private readonly recipesService = inject(ReceitaService);
  private readonly bookRecipeService = inject(LivroReceitasService);

  receitas: Receita[] = [];
  @ViewChild('Inputnotes') Inputnotes!: ElementRef<HTMLInputElement>;
  @ViewChild('receitaId ') receitaId !: ElementRef<HTMLInputElement>;

  receitaNova: {recipe: {id:number}, notes: string} =  {recipe: {id: 0}, notes: ''};


  ngOnInit(): void {
    this.recipesService.getAllRecipes().subscribe(dado => {this.receitas = dado}); //mudar depois para mine recipes
  }

  openModalAdd() {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  adicionarLivroReceita(){
    if(this.receitaId.nativeElement.value == "-1"){
      alert('Erro: Seleciona uma receita!! está opção não é válida!')
      return;
    }
    if(this.Inputnotes.nativeElement.value == ''){
      alert('Erro: Deixe alguma anotação!!!')
      return;
    }
    this.receitaNova = {recipe: {id: Number(this.receitaId.nativeElement.value)}, notes: this.Inputnotes.nativeElement.value};
    this.bookRecipeService.addRecipe(this.id, this.receitaNova).subscribe();
    alert('Receita anotada com sucesso!');
    window.location.reload();
  }
}
