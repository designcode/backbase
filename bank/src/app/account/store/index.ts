import { Action, createReducer, on } from '@ngrx/store';
import { Account, Transfer } from 'src/app/models';
import * as AccountActions from './account.actions';

export const accountFeatureKey = 'account';

export interface AccountsPayload {
  accounts: Account[];
}

export interface TransferPayload {
  transfer: Transfer;
}

export interface TransfersPayload {
  transfers: Transfer[];
}

export interface State {
  accounts: Account[];
  selectedAccount: Account;
  contacts: Account[];
  transfers: Transfer[];
}
export const initialState: State = {
  accounts: [],
  selectedAccount: {
    accountNumber: '',
    name: ''
  },
  contacts: [],
  transfers: [],
};

const accountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsSuccess, (state: State, action: AccountsPayload) => ({ ...state, accounts: action.accounts })),
  on(AccountActions.loadContactsSuccess, (state: State, action: AccountsPayload) => ({ ...state, contacts: action.accounts })),
  on(AccountActions.setSelectedAccount, (state: State, action: Account) => {
    return { ...state, selectedAccount: state.accounts.filter((account: Account) => account.accountNumber === action.accountNumber)[0] };
  }),
  on(AccountActions.loadTransfersSuccess, (state: State, action: TransfersPayload) => ({ ...state, transfers: action.transfers })),
  on(AccountActions.loadTransfersFailure, (state: State) => ({ ...state, transfers: [] as Transfer[] })),
  on(AccountActions.createTransferSuccess, (state: State, action: TransferPayload) => {
    const newTransfers = state.transfers.concat(action.transfer);
    return ({ ...state, transfers: newTransfers });
  }),
);

export function reducer(state = initialState, action: Action): State {
  return accountReducer(state, action);
}
