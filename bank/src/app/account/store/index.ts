import { Action, createReducer } from '@ngrx/store';
import { Account, Summary } from 'src/app/models';

export const accountFeatureKey = 'account';

export interface State {
  accounts: Account[];
  contacts: Account[];
  summary: Summary[];
}
export const initialState: State = {
  accounts: [],
  contacts: [],
  summary: [],
};

const accountReducer = createReducer(initialState);

export function reducer(state = initialState, action: Action): State {
  return accountReducer(state, action);
}
