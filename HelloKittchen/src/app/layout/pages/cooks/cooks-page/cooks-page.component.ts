import { Component, inject, OnInit } from '@angular/core';
import { ImagesPefilService } from '../../../../additional/images.pefil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cooks-page',
  standalone: true,
  imports: [],
  templateUrl: './cooks-page.component.html',
  styleUrl: './cooks-page.component.scss'
})
export class CooksPageComponent implements OnInit{
  public readonly imageService = inject(ImagesPefilService);
  private readonly route = inject(ActivatedRoute);
  id!: number; //id da categoria

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; //recebendo no id o get passado por parametro
    });


  }
}
