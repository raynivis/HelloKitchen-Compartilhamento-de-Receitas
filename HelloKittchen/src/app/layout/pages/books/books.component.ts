import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ImagesPerfilService } from '../../../additional/images.perfil.service';
import { ContentBooksComponent } from "./content-books/content-books.component";
import { RouterModule } from '@angular/router';
import { LivroService } from '../../../services/livro.service';
import { Livro } from '../../../models/livro.model';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [ContentBooksComponent, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit{
  public readonly imageService = inject(ImagesPerfilService);
  private readonly livrosService = inject(LivroService);
  livros: Livro[] = [];
  @ViewChild('livroEditarModal') modalElement!: ElementRef;
  @ViewChild('livroExcluirModal') modalElementDelete!: ElementRef;

  @ViewChild('InputLivro') InputLivro!: ElementRef<HTMLInputElement>;
  livroEdit: { name: string } = { name: '' };
  livroEditId!: number;

  ngOnInit(): void {
    this.livrosService.list().subscribe({
      next: (dado) => {
        this.livros = dado.items;
      }
    });
  }

  openModalEdit(id: number) {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
      this.livroEditId = id;
    } else {
      console.error('Modal element não encontrado');
    }
  }

  openModalDelete(id: number) {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElementDelete.nativeElement);
      modal.show();
      this.livroEditId = id;
    } else {
      console.error('Modal element não encontrado');
    }
  }

  editarLivro(){
    if(this.InputLivro.nativeElement.value.length < 4)
    {
      alert('Erro: O nome do livro de ter mais de 3 letras!!');
      return;
    }
    this.livroEdit.name = this.InputLivro.nativeElement.value;
    this.livrosService.updateBook(this.livroEditId, this.livroEdit).subscribe();
    alert('Livro editado com sucesso!');
    window.location.reload();
  }

  excluirLivro() {
    this.livrosService.deleteBook(this.livroEditId).subscribe({
      next: () => {
        alert('Livro excluído com sucesso!');
        window.location.reload();
      },
      error: (err) => {
        alert('Não foi possível excluir o livro.');
      },
    });
  }

}
