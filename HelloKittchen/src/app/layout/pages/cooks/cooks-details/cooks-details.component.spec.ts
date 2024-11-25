import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooksDetailsComponent } from './cooks-details.component';

describe('CooksDetailsComponent', () => {
  let component: CooksDetailsComponent;
  let fixture: ComponentFixture<CooksDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CooksDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
