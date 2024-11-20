import { TestBed } from '@angular/core/testing';

import { ImagesPefilService } from './images.pefil.service';

describe('ImagesPefilService', () => {
  let service: ImagesPefilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesPefilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
