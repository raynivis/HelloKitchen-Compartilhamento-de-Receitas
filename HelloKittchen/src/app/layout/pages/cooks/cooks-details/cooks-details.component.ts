import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceitaService } from '../../../../services/receita.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receita } from '../../../../models/receita.model';
import { Avaliacao } from '../../../../models/avaliacao.model';
import { Usuario } from '../../../../models/usuario.model';
import { StorageService } from '../../../../services/storage.service';
import { AuthService } from '../../../../services/auth.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-cooks-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cooks-details.component.html',
  styleUrl: './cooks-details.component.scss'
})
export class CooksDetailsComponent implements OnInit{
  receita!: Receita;
  novaAvaliacao: Avaliacao = {
    recipe: '', // Inicializa com um objeto vazio do tipo Receita
    user: {} as Usuario,  // Inicializa com um objeto vazio do tipo Usuario
    rating: 0,
    comment: '',
    id: 0,
    dateCreated: '',
    lastUpdated: ''
  };
  
  isUserAuthenticated = false;
  private readonly storageService = inject(StorageService);
  private id = 0;
  constructor(
    private route: ActivatedRoute,
    private receitaService: ReceitaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.carregarReceita(this.id);
    this.verificarAutenticacao();
  }

  carregarReceita(id: number): void {
    this.receitaService.getReceitaDetalhes(id).subscribe((receita) => {
      this.receita = receita;
      if (this.receita.ratings) {
        const userRequests = this.receita.ratings.map((rating) =>
          this.authService.getUserById(rating.user.id)
        );
  
        forkJoin(userRequests).subscribe((users) => {
          this.receita.ratings.forEach((Avaliacao, index) => {
            Avaliacao.userName = users[index]?.name || 'Usuário Desconhecido';
          });
        });
      }
    });
  }

  verificarAutenticacao(): void {
    this.isUserAuthenticated = this.storageService.get('user');
  }

  adicionarAvaliacao(): void {
    if (this.novaAvaliacao.rating && this.novaAvaliacao.comment.trim()) {
      const avaliacao: Avaliacao = {
        ...this.novaAvaliacao,
        recipe: this.receita.name, // Relaciona com a receita atual
        user: this.storageService.get('user'), // Obtém o usuário logado
        id: 0, // O ID será gerado pelo back-end
        dateCreated: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
  
      this.receitaService.adicionarAvaliacao(avaliacao, this.receita.id).subscribe(() => {
        this.carregarReceita(this.receita.id); // Atualiza os dados após a avaliação
        this.resetarNovaAvaliacao();
      });
    }
  }
  
  resetarNovaAvaliacao(): void {
    this.novaAvaliacao = {
      recipe: '',
      user: {} as Usuario,
      rating: 0,
      comment: '',
      id: 0,
      dateCreated: '',
      lastUpdated: ''
    };
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
}
