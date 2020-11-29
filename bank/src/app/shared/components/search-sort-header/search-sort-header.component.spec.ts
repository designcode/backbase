import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSortHeaderComponent } from './search-sort-header.component';

describe('SearchSortHeaderComponent', () => {
  let component: SearchSortHeaderComponent;
  let fixture: ComponentFixture<SearchSortHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSortHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSortHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
