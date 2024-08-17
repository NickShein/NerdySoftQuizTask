import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayAuthService {
  isPlayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isQuizzfinished$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  playQuizz(){
    this.isPlayed$.next(true);
  }

  isStartedQuizz(): boolean{
    return this.isPlayed$.value;
  }

  finishQuizz(){
    this.isQuizzfinished$.next(true);
  }

  isQuizzEnded(): boolean{
    return this.isQuizzfinished$.value;
  }
}
