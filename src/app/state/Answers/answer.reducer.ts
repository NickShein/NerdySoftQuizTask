import { createReducer, on } from '@ngrx/store';
import { updateAnswer } from './answer.action';
import { Answer } from './answer.model';

export interface AnswersState {
  answersArray: Answer[];
}

export const answerState: AnswersState = {
    answersArray: [],
};

export const answerReducer = createReducer(
    answerState,
  on(updateAnswer, (state, { answersArray }) => ({
    ...state,
    answersArray: answersArray
  }))
);
