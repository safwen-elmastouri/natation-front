import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteComponent } from './features/athlete/athlete.component';
import { ReserveComponent } from './features/reserve/reserve.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { ReservationListComponent } from './features/reservation-list/reservation-list.component';
import { AthleteProfileComponent } from './views/athlete-profile/athlete-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PanelAdminComponent } from './features/panel-admin/panel-admin.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'athlete', component: AthleteComponent },
  { path: 'profilathlete/:id', component: AthleteProfileComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'reserve', component: ReserveComponent },
  { path: 'reservation-list', component: ReservationListComponent },
  
  { path: 'home', component: LandingPageComponent },
    { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent },
                { path: 'admin', component: PanelAdminComponent },
  { path: 'reset-password', component: LoginComponent }, // 👈 Important
  { path: 'dashboard', component: DashboardComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
