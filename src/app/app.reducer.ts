import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  isLoading: Boolean
};

export const initialState: State = {
  isLoading: false
};


export function appReducer(state: State = initialState, action: Action) {

  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      }

    case 'STOP_LOADING':
      return {
        isLoading: false
      }

    default: return state
  }

}
