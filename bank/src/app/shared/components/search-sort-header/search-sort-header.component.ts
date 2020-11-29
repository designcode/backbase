import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { QueryModel, SortBy } from 'src/app/models';
import { SortingOptions } from '../sort-button/sort-button.component';

@Component({
  selector: 'app-bank-search-sort-header',
  templateUrl: './search-sort-header.component.html',
  styleUrls: ['./search-sort-header.component.scss']
})
export class SearchSortHeaderComponent implements OnInit, OnDestroy {

  @Input()
  sortingOptions: QueryModel = {};

  @Output()
  search = new EventEmitter<string>();

  @Output()
  sort = new EventEmitter<SortingOptions>();

  constructor() { }

  SortBy = SortBy;

  sortOrder = this.sortingOptions.sortOrder;

  searchField = new FormControl();
  subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.initSearch());
  }

  onSort(sortingOptions: SortingOptions): void {
    this.sort.emit(sortingOptions);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSearch(): Subscription {
    return this.searchField.valueChanges.pipe(distinctUntilChanged()).subscribe((search: string) => {
      this.search.emit(search);
    });
  }
}
