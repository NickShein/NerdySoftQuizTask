import { createAction, props } from '@ngrx/store';
import { TriviaQuestion } from 'src/app/interfaces/triviaquestion';

export const CATEGORIZE_QUIZZ = '[Quizz] Categorize Quizz';
export const categorizeQuizz = createAction(
  CATEGORIZE_QUIZZ,
  props<{ categorizedArrays: TriviaQuestion[][] }>(),
);
