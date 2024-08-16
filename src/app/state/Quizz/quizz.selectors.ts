import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizzState } from './quizz.reducer';

export const getQuizzState = createFeatureSelector<QuizzState>('quizz');

export const getCategorizedQuizz = createSelector(
  getQuizzState,
  (state) => state.categorizedArrays
);

export const getFirst10Categories = createSelector(
  getCategorizedQuizz,
  (categorizedArrays) => categorizedArrays
);