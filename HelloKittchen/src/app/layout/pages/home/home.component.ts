import { ImagesPerfilService } from '../../../additional/images.perfil.service';
import { Component, inject, OnInit } from '@angular/core';
import { ContentWcComponent } from "./content-wc/content-wc.component";
import { ReceitaService } from '../../../services/receita.service';
import { Receita } from '../../../models/receita.model';
import { PostRecipeComponent } from "../../items/post-recipe/post-recipe.component";
import { Pagination } from 'nestjs-typeorm-paginate';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContentWcComponent, PostRecipeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly receitasService = inject(ReceitaService);
  receitas: Receita[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 3;

  ngOnInit(): void {
    this.organizarReceitas();
  }

  organizarReceitas(){
    this.receitasService.listPage(this.currentPage, this.limit).subscribe(({ items, totalPages }) => {
      this.receitas = items;
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
