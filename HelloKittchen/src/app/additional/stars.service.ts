import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  generateStarArray(score: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (score >= i) {
        stars.push('full'); // Estrela cheia
      } else if (score > i - 1) {
        stars.push('half'); // Estrela pela metade
      } else {
        stars.push('empty'); // Estrela vazia
      }
    }
    return stars;
  }
}
