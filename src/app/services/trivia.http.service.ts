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



  // getSurveys(): Observable<Survey[]>{
  //   return this.getQuestions().pipe(
  //     map(response => {
  //       const groupedByCategory: { [key: string]: TriviaQuestion[] } = {};

  //       // Групуємо питання за категоріями
  //       response.results.forEach(question => {
  //         if (!groupedByCategory[question.category]) {
  //           groupedByCategory[question.category] = [];
  //         }
  //         groupedByCategory[question.category].push(question);
  //       });

  //       // Створюємо масив опитувань з категоріями та кількістю питань
  //       return Object.keys(groupedByCategory).map(category => ({
  //         category,
  //         questionCount: groupedByCategory[category].length
  //       }));
  //     })
  //   );
  // }
}