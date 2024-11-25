import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRecipeComponent } from './post-recipe.component';

describe('PostRecipeComponent', () => {
  let component: PostRecipeComponent;
  let fixture: ComponentFixture<PostRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
