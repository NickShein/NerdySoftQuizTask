import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { TriviaQuestion } from 'src/app/interfaces/triviaquestion';
import { CalculatingService } from 'src/app/services/calculating.service';
import { PlayAuthService } from 'src/app/services/guards/play-auth.service';
import { updateAnswer } from 'src/app/state/Answers/answer.action';
import { Answer } from 'src/app/state/Answers/answer.model';
import { AppStateModel } from 'src/app/state/global/app.state';
import { getCategorizedQuizz } from 'src/app/state/Quizz/quizz.selectors';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {
  id: number | null = null;
  currentQuestionNumber: number = 0;
  currentQuestion: string = '';
  selectedOption: string = '';
  QuestionsAmount: number = 0;
  timeStart!: Date;
  timeEnd!: Date;

  categorizedArrays: TriviaQuestion[] = [];
  options: string[] = [];
  answers: Answer[] = [];

  questionControl = new FormControl();

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateModel>,
    private router: Router,
    private playAuthService: PlayAuthService,
    private calculatingService: CalculatingService
  ) {}

  ngOnInit(): void {
    this.timeStart = new Date();

    this.subscriptions.add(
      combineLatest([
        this.route.paramMap,
        this.store.select(getCategorizedQuizz),
      ]).subscribe(([params, categorized]) => {
        const idParam = params.get('id');
        this.id = idParam ? +idParam : null;
        this.categorizedArrays = categorized[this.id !== null ? this.id : 0] || [];
        this.QuestionsAmount = this.categorizedArrays.length;

        this.updateQuestion();
      }),
    );
  }

  updateQuestion(): void {
    this.currentQuestion = this.categorizedArrays[this.currentQuestionNumber].question;
    this.options = [
      ...this.categorizedArrays[this.currentQuestionNumber].incorrect_answers,
      this.categorizedArrays[this.currentQuestionNumber].correct_answer,
    ].sort(() => Math.random() - 0.5);
  }

  setOptionAndProceed(option: string): void {
    if (this.currentQuestionNumber == this.QuestionsAmount - 1) {
      this.calculatingService.countRightAnswersAndPoints(option, this.categorizedArrays, this.currentQuestionNumber, this.answers, this.timeStart);
      this.store.dispatch(updateAnswer({ answersArray: this.answers }));
      this.playAuthService.finishQuizz();

      this.router.navigate(['/finish']);
    } else {
      this.selectedOption = option; // Set the selected option
      this.calculatingService.countRightAnswersAndPoints(option, this.categorizedArrays, this.currentQuestionNumber, this.answers, this.timeStart);
      this.currentQuestionNumber++;
      this.updateQuestion();
    }
    this.timeStart = new Date();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
