import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooksCadastroComponent } from './cooks-cadastro.component';

describe('CooksCadastroComponent', () => {
  let component: CooksCadastroComponent;
  let fixture: ComponentFixture<CooksCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CooksCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooksCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
