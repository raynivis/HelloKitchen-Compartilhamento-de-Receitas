import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsRightComponent } from './contents-right.component';

describe('ContentsRightComponent', () => {
  let component: ContentsRightComponent;
  let fixture: ComponentFixture<ContentsRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentsRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentsRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
