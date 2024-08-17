import { createAction, props } from '@ngrx/store';
import { Answer } from './answer.model';

export const UPDATE_ANSWER = '[Answer] Update Answer';
export const updateAnswer = createAction(
    UPDATE_ANSWER,
  props<{ answersArray: Answer[] }>()
);