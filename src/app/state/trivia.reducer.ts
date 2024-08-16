import { createReducer, on } from '@ngrx/store';
import { triviaState } from './trivia.store';
import {
  loadTrivias,
  loadTriviasSuccess,
  loadTriviasFailure,
} from './trivia.actions';

export const _triviaReducer = createReducer(
  triviaState,
  on(loadTrivias, (state) => ({ ...state })),
  on(loadTriviasSuccess, (state, action) => ({
    ...state,
    triviaslist: [...action.triviaslist]
  })),
  on(loadTriviasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
