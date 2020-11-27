import { Action, createReducer, on } from '@ngrx/store';
import { Account, Transfer } from 'src/app/models';
import * as AccountActions from './account.actions';

export const accountFeatureKey = 'account';

export interface AccountsPayload {
  accounts: Account[];
}

export interface TransfersPayload {
  transfers: Transfer[];
}

export interface State {
  accounts: Account[];
  selectedAccount: Account;
  contacts: Account[];
  transfer: Transfer[];
}
export const initialState: State = {
  accounts: [],
  selectedAccount: {
    accountNumber: '',
    name: ''
  },
  contacts: [],
  transfer: [],
};

const accountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsSuccess, (state: State, action: AccountsPayload) => ({ ...state, accounts: action.accounts })),
  on(AccountActions.loadContactsSuccess, (state: State, action: AccountsPayload) => ({ ...state, contacts: action.accounts })),
  on(AccountActions.setSelectedAccount, (state: State, action: Account) => {
    return { ...state, selectedAccount: state.accounts.filter((account: Account) => account.accountNumber === action.accountNumber)[0] };
  }),
  on(AccountActions.loadTransfersSuccess, (state: State, action: TransfersPayload) => ({ ...state, transfer: action.transfers })),
);

export function reducer(state = initialState, action: Action): State {
  return accountReducer(state, action);
}
