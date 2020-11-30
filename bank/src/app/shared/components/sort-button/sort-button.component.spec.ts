import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortBy, SortingOrders } from 'src/app/models';

import { SortButtonComponent } from './sort-button.component';

describe('SortButtonComponent', () => {
  let component: SortButtonComponent;
  let fixture: ComponentFixture<SortButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngInit()', () => {
    const spy = spyOn(component.subscriptions, 'add');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('onSort()', () => {
    const spy = spyOn(component.sortingOptionsStream, 'next');
    component.onSort(SortBy.Amount);
    expect(spy).toHaveBeenCalledWith(SortBy.Amount);
  });

  describe('initSorting()', () => {
    let spy: any;

    beforeEach(async () => {
      spy = spyOn(component.sort, 'emit');
    });

    it('it should emit with ascending when called first time and descending second time', () => {
      component.sortingOptionsStream.next(SortBy.Amount);
      expect(spy).toHaveBeenCalledWith({
        sortBy: SortBy.Amount,
        sortOrder: SortingOrders.Asc
      });

      component.sortingOptions.sortOrder = SortingOrders.Asc;
      component.sortingOptionsStream.next(SortBy.Amount);
      expect(spy).toHaveBeenCalledWith({
        sortBy: SortBy.Amount,
        sortOrder: SortingOrders.Dsc
      });
    });
  });

  it('ngDestroy)', () => {
    const spy = spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
