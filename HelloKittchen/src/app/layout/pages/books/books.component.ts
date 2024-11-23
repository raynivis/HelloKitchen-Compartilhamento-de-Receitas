import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ImagesPefilService } from '../../../additional/images.pefil.service';
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
  public readonly imageService = inject(ImagesPefilService);
  private readonly livrosService = inject(LivroService);
  livros: Livro[] = [];
  @ViewChild('livroEditarModal') modalElement!: ElementRef;
  @ViewChild('InputLivro') InputLivro!: ElementRef<HTMLInputElement>;
  livroEdit: { name: string } = { name: '' };
  livroEditId!: number;

  ngOnInit(): void {
    this.livrosService.list().subscribe((dado) => {
      this.livros = dado.items;
    });
  }

  openModal(id: number) {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
      this.livroEditId = id;
    } else {
      console.error('Modal element não encontrado');
    }
  }

  editarLivro(){
    this.livroEdit.name = this.InputLivro.nativeElement.value;
    console.log(this.livroEdit);
    this.livrosService.updateBook(this.livroEditId, this.livroEdit).subscribe();
    alert('Livro editado com sucesso!');
    window.location.reload();
  }





}
