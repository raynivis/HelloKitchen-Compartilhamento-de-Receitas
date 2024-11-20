import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNewsComponent } from './content-news.component';

describe('ContentNewsComponent', () => {
  let component: ContentNewsComponent;
  let fixture: ComponentFixture<ContentNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
