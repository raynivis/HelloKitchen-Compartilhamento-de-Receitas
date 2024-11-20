import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBooksComponent } from './content-books.component';

describe('ContentBooksComponent', () => {
  let component: ContentBooksComponent;
  let fixture: ComponentFixture<ContentBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
