import { ActionReducerMap } from '@ngrx/store';
import * as fromApp from './app/app.reducer';
import * as fromUser from './user/user.reducer';

export interface State {
  [fromApp.key]: fromApp.State;
  [fromUser.key]: fromUser.State;
}

export const rootReducers: ActionReducerMap<State> = {
  [fromApp.key]: fromApp.reducer,
  [fromUser.key]: fromUser.reducer,
};
