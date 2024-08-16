
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component'; 
import { FinishComponent } from './components/finish/finish.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Основний маршрут
  { path: 'play', component: PlayComponent },
  { path: 'finish', component: FinishComponent },
  { path: '**', redirectTo: '' } // Для обробки невірних маршрутів
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }