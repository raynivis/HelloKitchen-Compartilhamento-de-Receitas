import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMyrecipesComponent } from './content-myrecipes.component';

describe('ContentMyrecipesComponent', () => {
  let component: ContentMyrecipesComponent;
  let fixture: ComponentFixture<ContentMyrecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentMyrecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentMyrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
