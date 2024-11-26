import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ContentMyrecipesComponent } from "./content-myrecipes/content-myrecipes.component";
import { Receita } from '../../../models/receita.model';
import { ReceitaService } from '../../../services/receita.service';
import { PostRecipeComponent } from "../../items/post-recipe/post-recipe.component";

@Component({
  selector: 'app-myrecipes',
  standalone: true,
  imports: [ContentMyrecipesComponent, PostRecipeComponent],
  templateUrl: './myrecipes.component.html',
  styleUrl: './myrecipes.component.scss'
})
export class MyrecipesComponent implements OnInit{
  private readonly receitasService = inject(ReceitaService);
  receitas: Receita[] = [];
  @ViewChild('receitaExcluirModal') modalElementDelete!: ElementRef;
  livroReceitaDelete!: number;


  ngOnInit(): void {
    this.receitasService.getMyRecipes().subscribe(dado => {
      this.receitas = dado.items;
      this.receitas.sort((a, b) => {
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      });
    })
  }

  publicarReceita(receita: Receita){
    this.receitasService.publicar(receita.id, receita).subscribe( dado => {
      alert('Receita de '+ dado.name + ' publicada com sucesso');
      window.location.reload();
    });
  }

  openModalDelete(idReceita: number) {
    if (this.modalElementDelete) {
      const modal = new (window as any).bootstrap.Modal(this.modalElementDelete.nativeElement);
      modal.show();
      this.livroReceitaDelete = idReceita;
    } else {
      console.error('Modal element não encontrado');
    }
  }

  excluirReceita(){
    this.receitasService.deleteRecipe(this.livroReceitaDelete).subscribe(dado =>{
      alert('Receita excluida com sucesso!');
      window.location.reload();
    });
  }
}
