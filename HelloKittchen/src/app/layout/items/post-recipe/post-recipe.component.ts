import { Component, inject, Input } from '@angular/core';
import { StarsComponent } from "../stars/stars.component";
import { Receita } from '../../../models/receita.model';
import { ImagesPerfilService } from '../../../additional/images.perfil.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-post-recipe',
  standalone: true,
  imports: [StarsComponent, RouterModule],
  templateUrl: './post-recipe.component.html',
  styleUrl: './post-recipe.component.scss'
})
export class PostRecipeComponent {
  public readonly imageService = inject(ImagesPerfilService);
  @Input() receita!: Receita;
}
