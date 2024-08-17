import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnswersState } from './answer.reducer';

export const updateAnswerState = createFeatureSelector<AnswersState>('answer');

export const updateAnswersArray = createSelector(
    updateAnswerState,
  (state) => state.answersArray
);