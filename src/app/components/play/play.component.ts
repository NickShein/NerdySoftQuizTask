import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { TriviaQuestion } from 'src/app/interfaces/triviaquestion';
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
  categorizedArrays: TriviaQuestion[] = [];
  private subscriptions: Subscription = new Subscription();
  currentQuestionNumber: number = 0;
  currentQuestion: string = '';
  QuestionsAmount: number = 0;
  options: string[] = [];
  selectedOption: string = '';
  answers: Answer[] = [];
  timeStart!: Date;
  timeEnd!: Date;

  questionControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateModel>,
    private router: Router,
    private playAuthService: PlayAuthService,
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
        this.categorizedArrays =
          categorized[this.id !== null ? this.id : 0] || [];
        this.QuestionsAmount = this.categorizedArrays.length;
        this.updateQuestion();
      }),
    );
  }

  updateQuestion(): void {
    this.currentQuestion =
      this.categorizedArrays[this.currentQuestionNumber].question;
    this.options = [
      ...this.categorizedArrays[this.currentQuestionNumber].incorrect_answers,
      this.categorizedArrays[this.currentQuestionNumber].correct_answer,
    ].sort(() => Math.random() - 0.5);
  }

  setOptionAndProceed(option: string): void {
    if (this.currentQuestionNumber == this.QuestionsAmount - 1) {
      this.countRightAnswersAndPoints(option);
      this.store.dispatch(updateAnswer({ answersArray: this.answers }));
      this.router.navigate(['/finish']);
      this.playAuthService.finishQuizz();
    } else {
      this.selectedOption = option; // Set the selected option
      this.countRightAnswersAndPoints(option);
      this.currentQuestionNumber++;
      this.updateQuestion();
    }
  }

  countRightAnswersAndPoints(answer: string): void {
    let correctAnswer =
      this.categorizedArrays[this.currentQuestionNumber].correct_answer;
    let point = 0;
    this.timeEnd = new Date();
    if (answer == correctAnswer) {
      let point = 1;
      if (
        this.categorizedArrays[this.currentQuestionNumber].incorrect_answers
          .length > 1
      ) {
        point = 3;
      }
      this.answers.push({
        answer: answer,
        correct_answer: correctAnswer,
        isCorrect: true,
        secondsSpent: this.getDifferenceInMiliseconds(
          this.timeEnd,
          this.timeStart,
        ),
        points: point,
      });
    } else {
      this.answers.push({
        answer: answer,
        correct_answer: correctAnswer,
        isCorrect: false,
        secondsSpent: this.getDifferenceInMiliseconds(
          this.timeEnd,
          this.timeStart,
        ),
        points: point,
      });
    }
    this.timeStart = new Date();
  }

  calculatePoints(array: Answer[]) {
    return array.reduce((totalScore, answer) => {
      if (answer.isCorrect) {
        // Якщо correct_answer є "True" або "False", додаємо 1 бал
        if (
          answer.correct_answer === 'True' ||
          answer.correct_answer === 'False'
        ) {
          return totalScore + 1;
        } else {
          // В інших випадках додаємо 3 бали
          return totalScore + 3;
        }
      }
      return totalScore; // Якщо відповідь неправильна, бали не додаються
    }, 0);
  }

  getDifferenceInMiliseconds(endDate: Date, startDate: Date): number {
    return endDate.getTime() - startDate.getTime();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
