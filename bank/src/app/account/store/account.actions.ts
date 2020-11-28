import { createAction, props } from '@ngrx/store';
import { Account, FailedActionPayload, Transfer } from 'src/app/models';
import { AccountsPayload, TransferPayload, TransfersPayload } from './index';

export const loadAccounts = createAction(
  '[Account] Load Accounts'
);

export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Success',
  props<AccountsPayload>()
);

export const loadAccountsFailure = createAction(
  '[Account] Load Accounts Failure',
  props<FailedActionPayload>()
);

export const loadContacts = createAction(
  '[Account] Load Contacts'
);

export const loadContactsSuccess = createAction(
  '[Account] Load Contacts Success',
  props<AccountsPayload>()
);

export const loadContactsFailure = createAction(
  '[Account] Load Contacts Failure',
  props<FailedActionPayload>()
);

export const setSelectedAccount = createAction(
  '[Account] Set Selected Account',
  props<Account>()
);

export const loadTransfers = createAction(
  '[Account] Load Transfers'
);

export const loadTransfersSuccess = createAction(
  '[Account] Load Transfers Success',
  props<TransfersPayload>()
);

export const loadTransfersFailure = createAction(
  '[Account] Load Transfers Failure',
  props<FailedActionPayload>()
);

export const createTransfer = createAction(
  '[Account] Create Transfer',
  props<TransferPayload>()
);

export const createTransferSuccess = createAction(
  '[Account] Create Transfer Success',
  props<TransferPayload>()
);

export const createTransferFailure = createAction(
  '[Account] Create Transfer Failure',
  props<FailedActionPayload>()
);
