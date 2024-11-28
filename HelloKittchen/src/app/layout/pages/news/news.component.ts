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
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 5;

  ngOnInit(): void {
    this.organizarReceitas();
  }

  organizarReceitas(){
    this.receitaService.listPage(this.currentPage, this.limit).subscribe(({ items, totalPages }) => {
      this.receitas = items;
      this.receitas.sort((a, b) => {
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      });
      this.totalPages = totalPages;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.organizarReceitas();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.organizarReceitas();
    }
  }








}
