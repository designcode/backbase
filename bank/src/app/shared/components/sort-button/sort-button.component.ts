import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { pairwise } from 'rxjs/operators';
import { QueryModel, SortBy, SortingOrders } from 'src/app/models';


export interface SortingOptions {
  sortBy: SortBy | undefined;
  sortOrder: SortingOrders | undefined;
}

@Component({
  selector: 'app-bank-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss']
})
export class SortButtonComponent implements OnInit, OnDestroy {

  @Input()
  label = '';

  @Input()
  name = SortBy.Amount;

  @Input()
  sortingOptions: QueryModel = {};

  @Output()
  sort = new EventEmitter<SortingOptions>();

  constructor() { }

  SortBy = SortBy;
  SortingOrders = SortingOrders;

  subscriptions = new Subscription();
  sortingOptionsStream = new BehaviorSubject<SortBy | undefined>(this.sortingOptions.sortBy);

  ngOnInit(): void {
    this.subscriptions.add(this.initSorting());
  }

  onSort(sortBy: SortBy): void {
    this.sortingOptionsStream.next(sortBy);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSorting(): Subscription {
    return this.sortingOptionsStream
      .pipe(pairwise())
      .subscribe(([prevSortBy, sortBy]: [SortBy | undefined, SortBy | undefined]) => {
        let sortOrder = this.sortingOptions.sortOrder;

        if (prevSortBy === sortBy || prevSortBy === undefined) {
          sortOrder = this.sortingOptions.sortOrder === SortingOrders.Asc ? SortingOrders.Dsc : SortingOrders.Asc;
        }

        this.sort.emit({
          sortBy, sortOrder
        });
      });
  }

}
