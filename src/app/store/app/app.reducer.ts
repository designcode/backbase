import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export const key = 'app';

export interface State {
  loaded: boolean;
}

export const initialState: State = {
  loaded: false,
};

const appReducer = createReducer(
  initialState,
  on(AppActions.loadApplicationCompleted, (state: State) => ({
    ...state,
    loaded: true,
  }))
);

export function reducer(state = initialState, action: Action): State {
  return appReducer(state, action);
}
