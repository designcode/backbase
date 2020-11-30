import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAccount from './index';
import * as AccountActions from './account.actions';
import { QueryModel, Transfer } from 'src/app/models';

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

  setTransferQuery(query: QueryModel): void {
    this.store.dispatch(AccountActions.setTransferQuery({query}));
  }

  loadTransfers(): void {
    this.store.dispatch(AccountActions.loadTransfers());
  }

  createTransfer(transfer: Transfer): void {
    this.store.dispatch(AccountActions.createTransfer({transfer}));
  }
}
