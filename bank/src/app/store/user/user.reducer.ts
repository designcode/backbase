import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './user.actions';

export const key = 'user';

export interface State {
  id: number;
  name: string;
  balance: number;
  selectedAccount?: Account;
}

export const initialState: State = {
  id: 0,
  name: '',
  balance: 0,
  selectedAccount: undefined,
};

const appReducer = createReducer(
  initialState,
  on(AppActions.loadUserInformationCompleted, (state: State) => ({
    ...state,
  }))
);

export function reducer(state = initialState, action: Action): State {
  return appReducer(state, action);
}
