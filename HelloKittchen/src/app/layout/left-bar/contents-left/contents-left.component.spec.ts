import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsLeftComponent } from './contents-left.component';

describe('ContentsLeftComponent', () => {
  let component: ContentsLeftComponent;
  let fixture: ComponentFixture<ContentsLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentsLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
