import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';

import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

import { FullCalendarModule } from '@fullcalendar/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { EventCardComponent } from './event-card/event-card.component';
import { AthleteCardComponent } from './athlete-card/athlete-card.component';
import { AthleteProfileComponent } from './views/athlete-profile/athlete-profile.component';
import { EventModalComponent } from './views/athlete-profile/event-modal/event-modal.component';
import { AthleteComponent } from './features/athlete/athlete.component';
import { FilterComponent } from './component/filter/filter.component';
import { CompetitionCardComponent } from './component/competition-card/competition-card.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { SwimmersOverviewComponent } from './swimmers-overview/swimmers-overview.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { ReserveComponent } from './features/reserve/reserve.component';
import { FooterComponent } from './features/footer/footer.component';
import { HeaderNavComponent } from './features/header-nav/header-nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PanelAdminComponent } from './features/panel-admin/panel-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    EventCardComponent,
    AthleteCardComponent,
    AthleteProfileComponent,
    EventModalComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    AthleteComponent,
    FilterComponent,
    CompetitionCardComponent,
    LandingPageComponent,
    SwimmersOverviewComponent,
    CompetitionsComponent,
    ReserveComponent,
    FooterComponent,
    HeaderNavComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,

    // PrimeNG
    CardModule,
    DropdownModule,
    ImageModule,
    MenubarModule,
    TagModule,
    TableModule,
    TabViewModule,

    // FullCalendar
    FullCalendarModule,
     RegisterComponent,
    LoginComponent,
    PanelAdminComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
