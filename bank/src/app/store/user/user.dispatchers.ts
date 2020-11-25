import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as userActions from './user.actions';

@Injectable()
export class UserDispatchers {
  constructor(private store: Store<fromUser.State>) {}

  loadUserInformation(): void {
    this.store.dispatch(userActions.loadUserInformation());
  }
}
