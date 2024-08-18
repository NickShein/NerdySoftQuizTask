import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TriviaService } from 'src/app/services/trivia.http.service';
import { GeneratingQuizzService } from 'src/app/services/generatingQuizz.service';
import { loadTrivias } from 'src/app/state/trivia.actions';
import { categorizeQuizz } from 'src/app/state/Quizz/quizz.actions';
import { getCategorizedQuizz } from 'src/app/state/Quizz/quizz.selectors';
import { AppStateModel } from 'src/app/state/global/app.state';
import { triviaModel } from 'src/app/state/trivia.model';
import { TriviaQuestion } from 'src/app/interfaces/triviaquestion';
import { gettrivia } from 'src/app/state/trivia.selectors';
import { Route, Router } from '@angular/router';
import { PlayAuthService } from 'src/app/services/guards/play-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  triviaslist!: triviaModel[];
  categorizedArrays!: TriviaQuestion[][];
  private subscriptions: Subscription = new Subscription();
  isLoadedData: boolean = false;

  constructor(
    private store: Store<AppStateModel>,
    private generatingQuizzService: GeneratingQuizzService,
    private router: Router,
    private playAuthService: PlayAuthService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadTrivias());

    this.subscriptions.add(this.store.select(gettrivia).subscribe((trivias) => {
      this.triviaslist = trivias;
      this.categorizedArrays = this.generatingQuizzService.getSortedCategorizedQuestions(this.triviaslist);
      this.store.dispatch(categorizeQuizz({ categorizedArrays: this.categorizedArrays }));
    }));

    this.subscriptions.add(this.store.select(getCategorizedQuizz).subscribe((categorized) => {
      this.categorizedArrays = categorized || [];
      this.isLoadedData = true;
    }));
  }

  PlayRandomQuizz(){
    let randomQuizzId = Math.floor(Math.random() * this.categorizedArrays.length);
    this.playQuizz(randomQuizzId);
  }

  playQuizz(id:number) {
    this.startQuizz();
    this.router.navigate(['/play', id]);
  }

  startQuizz(){ // let guard open page with currently empty data
    this.playAuthService.playQuizz();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}