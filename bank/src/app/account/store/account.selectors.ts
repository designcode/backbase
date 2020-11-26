import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account, Summary } from 'src/app/models';
import * as fromAccount from './index';


const getAccountState = createFeatureSelector<fromAccount.State>(fromAccount.accountFeatureKey);

const getAccounts = createSelector(getAccountState, (state: fromAccount.State) => state.accounts);

const getContacts = createSelector(getAccountState, (state: fromAccount.State) => state.contacts);

const getSummary = createSelector(getAccountState, (state: fromAccount.State) => state.summary);

@Injectable()
export class AccountSelectors {
  constructor(private store: Store<fromAccount.State>) {}

  get getAccounts$(): Observable<Account[]> {
    return this.store.select(getAccounts);
  }

  get getContacts$(): Observable<Account[]> {
    return this.store.select(getContacts);
  }

  get getSummary$(): Observable<Summary[]> {
    return this.store.select(getSummary);
  }
}
