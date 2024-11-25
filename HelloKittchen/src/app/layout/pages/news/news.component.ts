import { Component, inject, OnInit } from '@angular/core';
import { ContentNewsComponent } from "./content-news/content-news.component";
import { ImagesPerfilService } from '../../../additional/images.perfil.service';
import { ReceitaService } from '../../../services/receita.service';
import { Receita } from '../../../models/receita.model';
import { StarsComponent } from "../../items/stars/stars.component";
import { PostRecipeComponent } from "../../items/post-recipe/post-recipe.component";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ContentNewsComponent, PostRecipeComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{
  public readonly imageService = inject(ImagesPerfilService);
  private readonly receitaService = inject(ReceitaService);
  receitas: Receita[] = [];

  ngOnInit(): void {
    this.receitaService.getAllRecipes().subscribe(dado => {
      this.receitas = dado;
      this.receitas.sort((a, b) => {
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      });
    });
  }





}
