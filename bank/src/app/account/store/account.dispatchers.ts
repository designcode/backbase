import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAccount from './index';
import * as AccountActions from './account.actions';
import { Account } from 'src/app/models';

@Injectable()
export class AccountDispatchers {
  constructor(private store: Store<fromAccount.State>) {}

  loadAccounts(): void {
    this.store.dispatch(AccountActions.loadAccounts());
  }

  setSelectedAccount(accountNumber: string): void {
    this.store.dispatch(AccountActions.setSelectedAccount({accountNumber}));
  }

  loadContacts(): void {
    this.store.dispatch(AccountActions.loadContacts());
  }

  loadTransfers(): void {
    this.store.dispatch(AccountActions.loadTransfers());
  }
}
