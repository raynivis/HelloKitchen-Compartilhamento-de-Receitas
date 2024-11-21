import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooksPageComponent } from './cooks-page.component';

describe('CooksPageComponent', () => {
  let component: CooksPageComponent;
  let fixture: ComponentFixture<CooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CooksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
