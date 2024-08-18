import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayAuthService {
  isPlayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isFinished$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  playQuizz() {
    this.isPlayed$.next(true);
    this.isFinished$.next(false);
  }

  isActiveQuizz(): boolean {
    return this.isPlayed$.value;
  }

  isFinishedQuizz(): boolean {
    return this.isFinished$.value;
  }

  finishQuizz() {
    this.isPlayed$.next(false);
    this.isFinished$.next(true);
  }
}
