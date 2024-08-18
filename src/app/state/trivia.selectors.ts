import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Trivias } from './trivia.model';

const gettriviastate = createFeatureSelector<Trivias>('trivia');

export const gettrivia = createSelector(gettriviastate, (state) => {
  return state.triviaslist;
});
