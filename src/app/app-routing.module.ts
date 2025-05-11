import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteComponent } from './features/athlete/athlete.component';
import { HomeComponent } from './features/home/home.component';
import { ReserveComponent } from './features/reserve/reserve.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'athlete', component: AthleteComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'reserve', component: ReserveComponent },
  { path: 'home', component: LandingPageComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
