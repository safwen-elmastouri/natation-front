import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteComponent } from './features/athlete/athlete.component';
import { ReserveComponent } from './features/reserve/reserve.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { ReservationListComponent } from './features/reservation-list/reservation-list.component';
import { AthleteProfileComponent } from './views/athlete-profile/athlete-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'athlete', component: AthleteComponent },
  { path: 'profilathlete/:id', component: AthleteProfileComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'reserve', component: ReserveComponent },
  { path: 'reservation-list', component: ReservationListComponent },
  
  { path: 'home', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
