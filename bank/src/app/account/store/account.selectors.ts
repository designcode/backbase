import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Account, CreditDebitIndicators, Transfer } from 'src/app/models';
import * as fromAccount from './index';


const getAccountState = createFeatureSelector<fromAccount.State>(fromAccount.accountFeatureKey);

const getAccounts = createSelector(getAccountState, (state: fromAccount.State) => state.accounts);

const getSelectedAccount = createSelector(getAccountState, (state: fromAccount.State) => state.selectedAccount);

const getContacts = createSelector(getAccountState, (state: fromAccount.State) => state.contacts);

const getTransfers = createSelector(getAccountState, (state: fromAccount.State) => state.transfers);

const getAccountBalance = createSelector(getTransfers, (transfers: Transfer[]) => transfers.reduce(
  (sum: number, transfer: Transfer) =>
    transfer.transaction.creditDebitIndicator === CreditDebitIndicators.CRDT ?
    (sum + Number(transfer.transaction.amountCurrency.amount)) : (sum - Number(transfer.transaction.amountCurrency.amount)), 0
));

const getTransferValidity = createSelector(getAccountBalance, (balance: number) => balance >= -500 );

const getAccountTrasnferLimit = createSelector(getAccountBalance, (balance: number) => balance + 500 );

@Injectable()
export class AccountSelectors {
  constructor(private store: Store<fromAccount.State>) {}

  get accounts$(): Observable<Account[]> {
    return this.store.select(getAccounts).pipe(distinctUntilChanged());
  }

  get selectedAccount$(): Observable<Account> {
    return this.store.select(getSelectedAccount).pipe(distinctUntilChanged());
  }

  get accountBalance$(): Observable<number> {
    return this.store.select(getAccountBalance).pipe(distinctUntilChanged());
  }

  get contacts$(): Observable<Account[]> {
    return this.store.select(getContacts).pipe(distinctUntilChanged());
  }

  get transfers$(): Observable<Transfer[]> {
    return this.store.select(getTransfers).pipe(distinctUntilChanged());
  }

  get transferValidity$(): Observable<boolean> {
    return this.store.select(getTransferValidity).pipe(distinctUntilChanged());
  }

  get accountTrasnferLimit$(): Observable<number> {
    return this.store.select(getAccountTrasnferLimit).pipe(distinctUntilChanged());
  }
}
