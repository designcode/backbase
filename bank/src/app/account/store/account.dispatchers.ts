import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAccount from './index';
import * as accountActions from './account.actions';

@Injectable()
export class AccountDispatchers {
  constructor(private store: Store<fromAccount.State>) {}

  loadAccounts(): void {
    this.store.dispatch(accountActions.loadAccounts());
  }
}
