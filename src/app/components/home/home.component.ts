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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  triviaslist!: triviaModel[];
  categorizedArrays!: TriviaQuestion[][];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<AppStateModel>,
    private triviaService: TriviaService,
    private generatingQuizzService: GeneratingQuizzService
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
    }));
  }

  PlayQuizz(id:number) {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}