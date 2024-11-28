import { AuthService } from './../../../../services/auth.service';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ReceitaService } from '../../../../services/receita.service';
import { Receita } from '../../../../models/receita.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoPageComponent } from "../../no-page/no-page.component";
import { ImagesPerfilService } from '../../../../additional/images.perfil.service';
import { StarsComponent } from '../../../items/stars/stars.component';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [NoPageComponent, StarsComponent, RouterModule, CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit{
  id!:number;
  private readonly receitasService = inject(ReceitaService);
  receita!: Receita;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public readonly imageService = inject(ImagesPerfilService);
  private readonly authService = inject(AuthService);
  user! : Usuario;
  @ViewChild('InputStars') InputStars!: ElementRef<HTMLInputElement>;
  @ViewChild('InputComment') InputComment!: ElementRef<HTMLInputElement>;


  ngOnInit(): void {
    this.authService.atualUser.subscribe((user) => {
      this.user = user!;
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.receitasService.getReceitaDetalhes(this.id).subscribe(dado =>{
        this.receita = dado;
        console.log(this.receita.name)
      })
  });
  }


  adicionarAvaliacao(){
    var novaAvaliacao = { "rating": Number(this.InputStars.nativeElement.value), "comment": this.InputComment.nativeElement.value};
    this.receitasService.adicionarAvaliacao(novaAvaliacao, this.receita.id).subscribe();
    alert('Avaliação enviada ao Usuário! ε(´｡•᎑•`)っ 💕');
    window.location.reload();
  }


}
