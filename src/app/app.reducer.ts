import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer'
import * as fromAuth from './auth/auth.reducer'

export interface State {
  ui: fromUi.State
  auth: fromAuth.State
};

export const reducer: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
}


//selectors are helper functions that make easier to pull information from our state
export const getUiState = createFeatureSelector<fromUi.State>('ui')
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading)


const getAuthState = createFeatureSelector<fromAuth.State>('auth')
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated)

