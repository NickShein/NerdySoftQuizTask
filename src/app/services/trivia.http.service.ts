import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { TriviaResponse } from '../interfaces/triviaresponse';
import { Survey } from '../interfaces/survey';
import { TriviaQuestion } from '../interfaces/triviaquestion';
import { Router } from '@angular/router';

const ERROR_CODE_TOO_MANY_REQUESTS = 429;
@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private readonly questionAmount: number = 50;
  private apiUrl = `https://opentdb.com/api.php?amount=${this.questionAmount}`;


  constructor(private http: HttpClient,private router: Router) {}

  fetchQuestions(): Observable<TriviaQuestion[]> {
    return this.http.get<TriviaResponse>(this.apiUrl).pipe(
      map(response => response.results),
      catchError((error:HttpErrorResponse)=>{
        if(error.status == ERROR_CODE_TOO_MANY_REQUESTS){
          this.router.navigate(['error']);
        }
        return of([]);
      })
    );
  }
  
}