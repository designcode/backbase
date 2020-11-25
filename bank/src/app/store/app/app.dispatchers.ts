import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './app.reducer';
import * as AppActions from './app.actions';

@Injectable()
export class AppDispatchers {
  constructor(private store: Store<fromApp.State>) {}

  loadApplicationCompleted(): void {
    this.store.dispatch(AppActions.loadApplicationCompleted());
  }
}
