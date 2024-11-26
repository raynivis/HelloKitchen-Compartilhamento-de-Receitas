import { Component, inject, OnInit } from '@angular/core';
import { ContentMyrecipesComponent } from "./content-myrecipes/content-myrecipes.component";
import { Receita } from '../../../models/receita.model';
import { ReceitaService } from '../../../services/receita.service';
import { PostRecipeComponent } from "../../items/post-recipe/post-recipe.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-myrecipes',
  standalone: true,
  imports: [ContentMyrecipesComponent, PostRecipeComponent, RouterModule],
  templateUrl: './myrecipes.component.html',
  styleUrl: './myrecipes.component.scss'
})
export class MyrecipesComponent implements OnInit{
  private readonly receitasService = inject(ReceitaService);
  receitas: Receita[] = [];

  ngOnInit(): void {
    this.receitasService.getMyRecipes().subscribe(dado => {
      this.receitas = dado.items;
      this.receitas.sort((a, b) => {
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      });
    })
  }

}
