
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component'; 
import { FinishComponent } from './components/finish/finish.component';
import { playAuthGuard } from './services/guards/play-auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { finishAuthGuard } from './services/guards/finish-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'play/:id', component: PlayComponent, canActivate: [playAuthGuard()] },
  { path: 'finish', component: FinishComponent, canActivate: [finishAuthGuard()] },
  { path: 'error', component: ErrorComponent, },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }