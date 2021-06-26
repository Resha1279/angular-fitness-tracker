import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Exercise } from './exercise.model';
import { SET_AVAILABLE_EXERCISES, SET_FINISHED_EXERCISES, START_EXERCISE, STOP_EXERCISE, TrainingActions } from './training.actions'
import * as fromRoot from '../app.reducer'

export interface TrainingState {
  availableExercises: Exercise[]
  finishedExercises: Exercise[]
  activeExercise: Exercise
};

export interface State extends fromRoot.State {
  //our app state doesnt know about the training state but training state knows about the app(root) state. So when training component loads ngrx will merge the state behind the scenes

  training: TrainingState
}

export const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeExercise: null
};


export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      }
    case SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      }
    case START_EXERCISE:
      return {
        ...state,
        activeExercise: { ...state.availableExercises.find(ex => ex.id === action.payload) }

      }
    case STOP_EXERCISE:
      return {
        ...state,
        activeExercise: null
      }

    default:
      return state
  }
}


export const selectTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvailableExercises = createSelector(
  selectTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  selectTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveExerxises = createSelector(
  selectTrainingState,
  (state: TrainingState) => state.activeExercise
);
export const getIsTraining = createSelector(
  selectTrainingState,
  (state: TrainingState) => state.activeExercise != null
);
