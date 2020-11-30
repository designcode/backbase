import { createAction } from '@ngrx/store';

export const loadApplicationCompleted = createAction(
  '[App] Load Application Completed'
);

export const showLoadingIndicator = createAction('[App] Show Loading Indicator');

export const hideLoadingIndicator = createAction('[App] Hide Loading Indicator');
