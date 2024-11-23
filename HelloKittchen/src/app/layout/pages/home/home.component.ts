import { ImagesPefilService } from '../../../additional/images.pefil.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ContentWcComponent } from "./content-wc/content-wc.component";
import { ReceitaService } from '../../../services/receita.service';
import { Receita } from '../../../models/receita.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContentWcComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public readonly imageService = inject(ImagesPefilService);
  private readonly receitasService = inject(ReceitaService);
  receitas: Receita[] = [];

  ngOnInit(): void {
    this.receitasService.list().subscribe((dado) => {
      this.receitas = dado.items;
    });
  }


}
