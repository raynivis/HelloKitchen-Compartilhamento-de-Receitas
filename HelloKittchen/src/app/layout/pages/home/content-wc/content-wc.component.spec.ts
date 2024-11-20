import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWcComponent } from './content-wc.component';

describe('ContentWcComponent', () => {
  let component: ContentWcComponent;
  let fixture: ComponentFixture<ContentWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentWcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
