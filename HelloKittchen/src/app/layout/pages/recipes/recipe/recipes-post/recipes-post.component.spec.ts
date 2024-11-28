import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaPostComponent } from './recipes-post.component';

describe('ReceitaPostComponent', () => {
  let component: ReceitaPostComponent;
  let fixture: ComponentFixture<ReceitaPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitaPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceitaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
