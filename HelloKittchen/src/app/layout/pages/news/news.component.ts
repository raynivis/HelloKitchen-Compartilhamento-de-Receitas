import { Component } from '@angular/core';
import { ContentNewsComponent } from "./content-news/content-news.component";
import { ImagesPefilService } from '../../../services/images.pefil.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ContentNewsComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {


  constructor(public imageService: ImagesPefilService) {

  }
}
