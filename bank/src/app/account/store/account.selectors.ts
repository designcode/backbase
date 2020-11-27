import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Account, Transfer } from 'src/app/models';
import * as fromAccount from './index';


const getAccountState = createFeatureSelector<fromAccount.State>(fromAccount.accountFeatureKey);

const getAccounts = createSelector(getAccountState, (state: fromAccount.State) => state.accounts);

const getSelectedAccount = createSelector(getAccountState, (state: fromAccount.State) => state.selectedAccount);

const getContacts = createSelector(getAccountState, (state: fromAccount.State) => state.contacts);

const getTransfers = createSelector(getAccountState, (state: fromAccount.State) => state.transfer);

@Injectable()
export class AccountSelectors {
  constructor(private store: Store<fromAccount.State>) {}

  get getAccounts$(): Observable<Account[]> {
    return this.store.select(getAccounts).pipe(distinctUntilChanged());
  }

  get getSelectedAccount$(): Observable<Account> {
    return this.store.select(getSelectedAccount).pipe(distinctUntilChanged());
  }

  get getContacts$(): Observable<Account[]> {
    return this.store.select(getContacts).pipe(distinctUntilChanged());
  }

  get getTransfers$(): Observable<Transfer[]> {
    return this.store.select(getTransfers).pipe(distinctUntilChanged());
  }
}
