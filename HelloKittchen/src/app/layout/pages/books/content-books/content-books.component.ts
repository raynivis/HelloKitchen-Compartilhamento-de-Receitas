import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LivroService } from '../../../../services/livro.service';

@Component({
  selector: 'app-content-books',
  standalone: true,
  imports: [],
  templateUrl: './content-books.component.html',
  styleUrl: './content-books.component.scss'
})
export class ContentBooksComponent {
  @ViewChild('livroModal') modalElement!: ElementRef;
  @ViewChild('InputLivro') InputLivro!: ElementRef<HTMLInputElement>;
  private readonly livrosService = inject(LivroService);
  livro: { name: string } = { name: '' };


  openModal() {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  enviarLivro() {
    if (this.InputLivro.nativeElement.value.length < 4) {
      alert('Erro: O nome do livro de ter mais de 3 letras!!');
      return;
    }
    this.livro.name = this.InputLivro.nativeElement.value;
    this.livrosService.addBook(this.livro).subscribe();
    alert('Livro cadastrado com sucesso!');
    this.livrosService.list().subscribe();
    window.location.reload();
  }
}
