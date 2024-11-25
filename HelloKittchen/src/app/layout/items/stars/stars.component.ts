import { Component, inject, Input } from '@angular/core';
import { StarsService } from '../../../additional/stars.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss'
})
export class StarsComponent {
  public readonly starsService = inject(StarsService);
  @Input() score!: number;

}
