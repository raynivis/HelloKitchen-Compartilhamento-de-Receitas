import { ImagesPerfilService } from '../../../additional/images.perfil.service';
import { Component, inject, OnInit } from '@angular/core';
import { ContentWcComponent } from "./content-wc/content-wc.component";
import { ReceitaService } from '../../../services/receita.service';
import { Receita } from '../../../models/receita.model';
import { PostRecipeComponent } from "../../items/post-recipe/post-recipe.component";

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

  ngOnInit(): void {
    this.receitasService.list().subscribe((dado) => {
      this.receitas = dado.items;
    });
  }


}
