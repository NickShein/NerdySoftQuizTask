import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TriviaService } from '../services/trivia.http.service';
import { loadTrivias, loadTriviasSuccess, loadTriviasFailure, LOAD_TRIVIA } from './trivia.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class TriviaEffects {
    constructor(private actions$: Actions, private triviaService: TriviaService) {}

    _trivia = createEffect(()=>
        this.actions$.pipe(
            ofType(loadTrivias),
            exhaustMap((action)=>{
                return this.triviaService.fetchQuestions().pipe(
                    map((data)=>{
                        return loadTriviasSuccess({triviaslist: data});
                    }),
                    catchError(()=>EMPTY)
                )
            })
        )
    )

  
  
}