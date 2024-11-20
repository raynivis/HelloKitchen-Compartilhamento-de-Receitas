import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooksComponent } from './cooks.component';

describe('CooksComponent', () => {
  let component: CooksComponent;
  let fixture: ComponentFixture<CooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
