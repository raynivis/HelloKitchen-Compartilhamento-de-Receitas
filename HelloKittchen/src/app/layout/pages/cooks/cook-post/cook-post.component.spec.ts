import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookPostComponent } from './cook-post.component';

describe('CookPostComponent', () => {
  let component: CookPostComponent;
  let fixture: ComponentFixture<CookPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
