import { createAction, props } from '@ngrx/store';
import { FailedActionPayload } from 'src/app/models';
import { AccountsPayload } from './index';

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
