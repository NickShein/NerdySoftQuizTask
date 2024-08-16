import { TriviaQuestion } from "../interfaces/triviaquestion";
export interface triviaModel extends TriviaQuestion{

}

export interface Trivias{
    triviaslist: triviaModel[],
    ErrorMessage: string
}