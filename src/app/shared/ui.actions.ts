import { Action } from '@ngrx/store'

export const START_LOADING = '[UI] Start Loading'
export const STOP_LOADING = '[UI] Stop Loading'



//action creators
export class StartLoading implements Action {
  readonly type = START_LOADING; //action
}
export class StopLoading implements Action {
  readonly type = STOP_LOADING;  //action
}

export type UIActions = StartLoading | StopLoading //this type is not action type it is tpescript type
