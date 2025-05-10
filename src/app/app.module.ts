import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderNavComponent } from './features/header-nav/header-nav.component';
// import { HeaderNavComponent } from './header-nav/header-nav.component';
import { MenubarModule } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { AthleteComponent } from "./features/athlete/athlete.component";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { SwimmersOverviewComponent } from './swimmers-overview/swimmers-overview.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { EventCardComponent } from './event-card/event-card.component';
import { TagModule } from 'primeng/tag';
import { AthleteCardComponent } from './athlete-card/athlete-card.component';
import { ReserveComponent } from "./features/reserve/reserve.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    TableComponent,
    SwimmersOverviewComponent,
    EventCardComponent,
    AthleteCardComponent,
  ],
  imports: [
    BrowserModule,
    CardModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    ImageModule,
    TableModule,
    TabViewModule,
    TagModule,
    AthleteComponent,
    ReserveComponent
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

