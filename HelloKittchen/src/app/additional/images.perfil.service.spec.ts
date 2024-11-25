import { TestBed } from '@angular/core/testing';

import { ImagesPerfilService } from './images.perfil.service';

describe('ImagesPefilService', () => {
  let service: ImagesPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
