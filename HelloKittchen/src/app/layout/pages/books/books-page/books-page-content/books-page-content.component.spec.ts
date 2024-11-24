import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPageContentComponent } from './books-page-content.component';

describe('BooksPageContentComponent', () => {
  let component: BooksPageContentComponent;
  let fixture: ComponentFixture<BooksPageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPageContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
