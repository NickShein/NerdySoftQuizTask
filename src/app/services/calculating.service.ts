import { Injectable } from '@angular/core';
import { Answer } from '../state/Answers/answer.model';
import { TriviaQuestion } from '../interfaces/triviaquestion';

@Injectable({
  providedIn: 'root'
})
export class CalculatingService {

  constructor() { }

  calculateCorrectAnswers(array: Answer[]) {
    return array.filter((answer) => answer.isCorrect).length;
  }
  
  calculateAnswersPoints(array: Answer[]) {
    return array.reduce((acumulator, answer) => {
      return acumulator + answer.points;
    }, 0);
  }

  calculateQuizzTime(array: Answer[]) {
    return array.reduce((acumulator, answer) => {
      return acumulator + answer.secondsSpent;
    }, 0);
  }

  getMaxSecondsSpent(answers: Answer[]): number {
    if (answers.length) {
      return Math.max(...answers.map((answer) => answer.secondsSpent));
    }
    return 0;
  }

  longestCorrectAnswerStreak(answers: Answer[]): number {
    let maxStreak = 0;
    let currentStreak = 0;

    for (const answer of answers) {
      if (answer.isCorrect) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    }

    return maxStreak;
  }

  countRightAnswersAndPoints(answer: string, arrays:TriviaQuestion[], currentQuestionNumber: number, answers: Answer[], timeEnd: Date, timeStart: Date): void {
    let correctAnswer =
      arrays[currentQuestionNumber].correct_answer;
    let point = 0;
    timeEnd = new Date();

    if (answer == correctAnswer) {
      let point = 1;
      
      if (
        arrays[currentQuestionNumber].incorrect_answers
          .length > 1
      ) {
        point = 3;
      }
      answers.push({
        answer: answer,
        correct_answer: correctAnswer,
        isCorrect: true,
        secondsSpent: this.getDifferenceInMiliseconds(
          timeEnd,
          timeStart,
        ),
        points: point,
      });
    } else {
      answers.push({
        answer: answer,
        correct_answer: correctAnswer,
        isCorrect: false,
        secondsSpent: this.getDifferenceInMiliseconds(
          timeEnd,
          timeStart,
        ),
        points: point,
      });
    }
    
    timeStart = new Date();
  }

  calculatePoints(array: Answer[]) {
    return array.reduce((totalScore, answer) => {
      if (answer.isCorrect) {
        // if correct_answer is "True" or "False", adding 1 point
        if (
          answer.correct_answer === 'True' ||
          answer.correct_answer === 'False'
        ) {
          return totalScore + 1;
        } else {
          // else case adding 3 points
          return totalScore + 3;
        }
      }
      return totalScore; // if answer is incorrect 0 points
    }, 0);
  }

  getDifferenceInMiliseconds(endDate: Date, startDate: Date): number {
    return endDate.getTime() - startDate.getTime();
  }
}
