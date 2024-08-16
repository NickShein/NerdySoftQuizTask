import { createReducer, on } from '@ngrx/store';
import { categorizeQuizz } from './quizz.actions';
import { TriviaQuestion } from 'src/app/interfaces/triviaquestion';

export interface QuizzState {
  categorizedArrays: TriviaQuestion[][];
}

export const initialState: QuizzState = {
  categorizedArrays: [],
};

export const quizzReducer = createReducer(
  initialState,
  on(categorizeQuizz, (state, { categorizedArrays }) => ({
    ...state,
    categorizedArrays
  }))
);
