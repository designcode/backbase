import { createAction, props } from '@ngrx/store';
import { FailedActionPayload } from 'src/app/models';
import { Account } from 'src/app/models';

export const loadAccounts = createAction(
  '[Account] Load Accounts'
);

export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Success',
  props<{ accounts: Account[] }>()
);

export const loadAccountsFailure = createAction(
  '[Account] Load Accounts Failure',
  props<{ error: FailedActionPayload }>()
);
