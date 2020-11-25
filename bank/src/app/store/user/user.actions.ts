import { createAction } from '@ngrx/store';

export const loadUserInformation = createAction('[User] Load User Information');

export const loadUserInformationCompleted = createAction(
  '[User] Load User Completed'
);
