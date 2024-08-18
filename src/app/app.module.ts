import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component';
import { FinishComponent } from './components/finish/finish.component';
import { StatColumnComponent } from './components/finish/StatColumn/stat-column.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TriviaEffects } from './state/trivia.effects';
import { _triviaReducer } from './state/trivia.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { quizzReducer } from './state/Quizz/quizz.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { answerReducer } from './state/Answers/answer.reducer';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayComponent,
    FinishComponent,
    StatColumnComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      trivia: _triviaReducer,
      quizz: quizzReducer,
      answer: answerReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([TriviaEffects]),
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
