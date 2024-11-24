import { TestBed } from '@angular/core/testing';

import { LivroReceitasService } from './livro.receitas.service';

describe('LivroReceitasService', () => {
  let service: LivroReceitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivroReceitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
