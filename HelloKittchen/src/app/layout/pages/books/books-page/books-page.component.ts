import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ImagesPerfilService } from '../../../../additional/images.perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroReceitasService } from '../../../../services/livro.receitas.service';
import { LivroReceita } from '../../../../models/livroReceita.model';
import { BooksPageContentComponent } from "./books-page-content/books-page-content.component";
import { StarsComponent } from "../../../items/stars/stars.component";
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [BooksPageContentComponent, StarsComponent],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss'
})
export class BooksPageComponent implements OnInit{
  public readonly imageService = inject(ImagesPerfilService);
  private readonly bookRecipeService = inject(LivroReceitasService);
  private readonly route = inject(ActivatedRoute);
  receitaLivros: LivroReceita[] = [];
  id!: number;
  @ViewChild('livroEditarModal') modalElement!: ElementRef;
  @ViewChild('livroExcluirModal') modalElementDelete!: ElementRef;
  @ViewChild('Inputnotes') Inputnotes!: ElementRef<HTMLInputElement>;
  livroReceitaEdit!: LivroReceita;
  livroReceitaIdEdit!: number;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);


  ngOnInit(){
    this.route.params.subscribe(params => {
      if(!this.authService.isLoggedIn()){
        this.router.navigate(['/opss']);
      }

      this.id = params['id']; //recebendo no id o get passado por parametro
      this.bookRecipeService.list(this.id).subscribe(dado => {this.receitaLivros = dado.items;})
    });
  }

  abrirReceita(id: number): void {
    this.router.navigate(['/recipe', id]);
  }

  openModalEdit(idReceitaLivro: number) {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
      this.livroReceitaIdEdit = idReceitaLivro;
    } else {
      console.error('Modal element não encontrado');
    }
  }

  openModalDelete(idReceitaLivro: number) {
    if (this.modalElementDelete) {
      const modal = new (window as any).bootstrap.Modal(this.modalElementDelete.nativeElement);
      modal.show();
      this.livroReceitaIdEdit = idReceitaLivro;
    } else {
      console.error('Modal element não encontrado');
    }
  }

  editarLivroReceita(){
    if(this.Inputnotes.nativeElement.value == ''){
      alert('Erro: Deixe alguma anotação!!!')
      return;
    }

    this.bookRecipeService.getRecipe(this.id, this.livroReceitaIdEdit).subscribe(dado => {
      this.livroReceitaEdit = dado;
      this.livroReceitaEdit.notes = this.Inputnotes.nativeElement.value;
      this.bookRecipeService.updateBookRecipe(this.id, this.livroReceitaIdEdit, this.livroReceitaEdit).subscribe();
      alert('Descrição editada com sucesso!');
      window.location.reload();
    })
  }

  apagarLivroReceita(){
    this.bookRecipeService.deleteBook(this.id, this.livroReceitaIdEdit).subscribe();
    alert('Receita removida com sucesso!');
    window.location.reload();
  }


}
