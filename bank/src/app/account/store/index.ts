import { Action, createReducer, on } from '@ngrx/store';
import { Account, Summary } from 'src/app/models';
import * as AccountActions from './account.actions';

export const accountFeatureKey = 'account';

export interface AccountsPayload {
  accounts: Account[];
}

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

const accountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsSuccess, (state: State, action: AccountsPayload) => ({ ...state, accounts: action.accounts })),
  on(AccountActions.loadContactsSuccess, (state: State, action: AccountsPayload) => ({ ...state, contacts: action.accounts }))
);

export function reducer(state = initialState, action: Action): State {
  return accountReducer(state, action);
}
