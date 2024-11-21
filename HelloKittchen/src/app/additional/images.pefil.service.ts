import { ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  ImagesPefilService {

  getPerfilAleatorio(emailtamanho :number): string {
    // Array com os URLs das imagens
    const images: string[] = [
      'assets/icons/badtz.png',
      'assets/icons/chococat.png',
      'assets/icons/cinamoon.png',
      'assets/icons/hellokitty.png',
      'assets/icons/keroppi.png',
      'assets/icons/kuromi.png',
      'assets/icons/mymelody.png',
      'assets/icons/pompompurin.png',
      'assets/icons/tuxedosam.png'
    ];
    // Retorna o endereço da imagem correspondente
    return images[emailtamanho % 9];
  }



}
