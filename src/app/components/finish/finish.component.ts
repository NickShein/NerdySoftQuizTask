import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { Answer } from 'src/app/state/Answers/answer.model';
import { AnswersState } from 'src/app/state/Answers/answer.reducer';
import { updateAnswersArray } from 'src/app/state/Answers/answer.selector';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  answerPoint: number = 0;
  correctAnswers: number = 0;
  timeInSeconds: number = 0;
  maxQuestionSpentTime: number = 0;
  longestSerie: number = 0;
  private subscriptions: Subscription = new Subscription();
  
  constructor(private store: Store<AnswersState>) {}
  
  ngOnInit(): void {
    this.subscriptions.add(this.store.select(updateAnswersArray).subscribe((array) => {
        this.correctAnswers = this.calculateCorrectAnswers(array);
        this.answerPoint = this.calculateAnswersPoints(array);
        console.log(this.calculateQuizzTime(array));
        this.timeInSeconds = Math.floor(this.calculateQuizzTime(array)/1000) + 1;
        this.maxQuestionSpentTime = this.getMaxSecondsSpent(array);
        this.longestSerie = this.longestCorrectAnswerStreak(array);
      })
    );
  }

  calculateCorrectAnswers(array: Answer[]){
    return array.filter(answer=>answer.isCorrect).length;
  }

  calculateAnswersPoints(array: Answer[]){
    return array.reduce((acumulator, answer)=>{
     return acumulator + answer.points;
    }, 0)
  }

  calculateQuizzTime(array: Answer[]){
    return array.reduce((acumulator, answer)=>{
      return acumulator + answer.secondsSpent;
     }, 0)
  }

  getMaxSecondsSpent(answers: Answer[]): number {
    if (answers.length) {
      return Math.max(...answers.map(answer => answer.secondsSpent));
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

  ngOnDestroy():void{
    this.subscriptions.unsubscribe();
  }
}
