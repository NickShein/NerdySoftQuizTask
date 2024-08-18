import { createAction, props } from '@ngrx/store';
import { triviaModel } from './trivia.model';

export const LOAD_TRIVIA = '[Trivia] Load Trivias';
export const LOAD_TRIVIA_SUCCESS = '[Trivia] Load Trivias Success';
export const LOAD_TRIVIA_FAILURE = '[Trivia] Load Trivias Failure';

export const loadTrivias = createAction(LOAD_TRIVIA);
export const loadTriviasSuccess = createAction(
  LOAD_TRIVIA_SUCCESS,
  props<{ triviaslist: triviaModel[] }>(),
);
export const loadTriviasFailure = createAction(
  LOAD_TRIVIA_FAILURE,
  props<{ error: any }>(),
);
