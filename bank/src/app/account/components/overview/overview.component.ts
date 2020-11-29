import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account, QueryModel, Transfer } from 'src/app/models';
import { SortingOptions } from 'src/app/shared/components/sort-button/sort-button.component';
import { NavigationService, QueryParams } from 'src/app/shared/services/navigation.service';
import { AccountDispatchers } from '../../store/account.dispatchers';
import { AccountSelectors } from '../../store/account.selectors';

@Component({
  selector: 'app-bank-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private accountDispatchers: AccountDispatchers,
    private accountSelectors: AccountSelectors,
    private navigationService: NavigationService
  ) { }

  get accounts$(): Observable<Account[]> {
    return this.accountSelectors.accounts$;
  }

  get selectedFromAccount$(): Observable<Account> {
    return this.accountSelectors.selectedAccount$;
  }

  get contacts$(): Observable<Account[]> {
    return this.accountSelectors.contacts$;
  }

  get selectedToAccount$(): Observable<Account> {
    return combineLatest([this.contacts$, this.route.queryParams]).pipe(
      map(([accounts, queryParams]: [Account[], Params]) => {
        return accounts.filter((account: Account) => account.accountNumber === queryParams[QueryParams.toAccount])[0];
      })
    );
  }

  get transfers$(): Observable<Transfer[]> {
    return this.accountSelectors.transfers$;
  }

  get accountBalance$(): Observable<number> {
    return this.accountSelectors.accountBalance$;
  }

  get canTransfer$(): Observable<boolean> {
    return this.accountSelectors.transferValidity$;
  }

  get accountTrasnferLimit$(): Observable<number> {
    return this.accountSelectors.accountTrasnferLimit$;
  }

  get transferQuery$(): Observable<QueryModel> {
    return this.accountSelectors.transferQuery$;
  }

  subscriptions = new Subscription();

  ngOnInit(): void {
    this.accountDispatchers.loadAccounts();
    this.accountDispatchers.loadContacts();

    this.subscriptions.add(
      this.route.params.subscribe((params: Params) => {
        this.accountDispatchers.setSelectedAccount(params.account);
        this.accountDispatchers.loadTransfers();
      })
    );
  }

  onSearch(search: string): void {
    this.accountDispatchers.setTransferQuery({ search });
  }

  onSort(sortingOptions: SortingOptions): void {
    this.accountDispatchers.setTransferQuery({
      ...sortingOptions
    });
  }

  onTransferSubmit(transfer: Transfer): void {
    this.accountDispatchers.createTransfer(transfer);

    this.navigationService.setQueryParams({
      [QueryParams.toAccount]: ''
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
