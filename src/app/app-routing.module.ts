import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteComponent } from './features/athlete/athlete.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'athlete', component: AthleteComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
