import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAccount from './index';
import * as AccountActions from './account.actions';

@Injectable()
export class AccountDispatchers {
  constructor(private store: Store<fromAccount.State>) {}

  loadAccounts(): void {
    this.store.dispatch(AccountActions.loadAccounts());
  }

  loadContacts(): void {
    this.store.dispatch(AccountActions.loadContacts());
  }
}
