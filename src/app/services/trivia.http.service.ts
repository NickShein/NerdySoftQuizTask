import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TriviaResponse } from '../interfaces/triviaresponse';
import { Survey } from '../interfaces/survey';
import { TriviaQuestion } from '../interfaces/triviaquestion';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com/api.php?amount=50'; // Запит на 50 питань


  constructor(private http: HttpClient) {}

  fetchQuestions(): Observable<TriviaQuestion[]> {
    return this.http.get<TriviaResponse>(this.apiUrl).pipe(
      map(response => response.results)
    );
  }
  
}