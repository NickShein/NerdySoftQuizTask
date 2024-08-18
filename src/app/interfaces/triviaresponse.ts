import { TriviaQuestion } from './triviaquestion';

export interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}
