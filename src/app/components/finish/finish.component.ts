import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { CalculatingService } from 'src/app/services/calculating.service';
import { Answer } from 'src/app/state/Answers/answer.model';
import { AnswersState } from 'src/app/state/Answers/answer.reducer';
import { updateAnswersArray } from 'src/app/state/Answers/answer.selector';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {
  answerPoint: number = 0;
  correctAnswers: number = 0;
  timeInSeconds: number = 0;
  maxQuestionSpentTime: number = 0;
  longestSerie: number = 0;

  private readonly milisecondsDivider: number = 1000;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<AnswersState>, private calculatingService: CalculatingService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(updateAnswersArray).subscribe((array) => {
        this.correctAnswers = this.calculatingService.calculateCorrectAnswers(array);
        this.answerPoint = this.calculatingService.calculateAnswersPoints(array);
        this.timeInSeconds = this.calculatingService.calculateQuizzTime(array) / this.milisecondsDivider;
        this.maxQuestionSpentTime = this.calculatingService.getMaxSecondsSpent(array) / this.milisecondsDivider;
        this.longestSerie = this.calculatingService.longestCorrectAnswerStreak(array);
      }),
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
