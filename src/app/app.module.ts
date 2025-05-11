import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderNavComponent } from './features/header-nav/header-nav.component';
// import { HeaderNavComponent } from './header-nav/header-nav.component';
import { MenubarModule } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { TableComponent } from './table/table.component';
import { SwimmersOverviewComponent } from './swimmers-overview/swimmers-overview.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { EventCardComponent } from './event-card/event-card.component';
import { TagModule } from 'primeng/tag';
import { AthleteCardComponent } from './athlete-card/athlete-card.component';
import { ReserveComponent } from './features/reserve/reserve.component';
import { LandingPageComponent } from '../app/component/landing-page/landing-page.component';
import { FilterComponent } from '../app/component/filter/filter.component';
import { CompetitionsComponent } from '../app/views/competitions/competitions.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompetitionCardComponent } from './component/competition-card/competition-card.component'; // ✅ Add this
import { AthleteComponent } from './features/athlete/athlete.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    TableComponent,
    SwimmersOverviewComponent,
    EventCardComponent,
    AthleteCardComponent,
    LandingPageComponent,
    FilterComponent,
    CompetitionsComponent,
    CompetitionCardComponent,
    AthleteComponent,
  ],
  imports: [
    BrowserModule,
    CardModule,
    ButtonModule,
    MenubarModule,
    ImageModule,
    TableModule,
    TabViewModule,
    TagModule,
    ReserveComponent,
    FormsModule,
    DropdownModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
