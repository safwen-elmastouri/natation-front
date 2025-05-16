import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }        from '@angular/common/http';
import { FormsModule }             from '@angular/forms';
import { CommonModule }            from '@angular/common';

import { AppRoutingModule }        from './app-routing.module';
import { AppComponent }            from './app.component';

import { ButtonModule }            from 'primeng/button';
import { CardModule }              from 'primeng/card';
import { MenubarModule }           from 'primeng/menubar';
import { ImageModule }             from 'primeng/image';
import { TableModule }             from 'primeng/table';
import { TabViewModule }           from 'primeng/tabview';
import { TagModule }               from 'primeng/tag';
import { DropdownModule }          from 'primeng/dropdown';

import { HeaderNavComponent }      from './features/header-nav/header-nav.component';
import { TableComponent }          from './table/table.component';
import { SwimmersOverviewComponent } from './swimmers-overview/swimmers-overview.component';
import { EventCardComponent }      from './event-card/event-card.component';
import { AthleteCardComponent }    from './athlete-card/athlete-card.component';
import { LandingPageComponent }    from './component/landing-page/landing-page.component';
import { FilterComponent }         from './component/filter/filter.component';
import { CompetitionsComponent }   from './views/competitions/competitions.component';
import { CompetitionCardComponent } from './component/competition-card/competition-card.component';
import { AthleteComponent }        from './features/athlete/athlete.component';
import { ReserveComponent }        from './features/reserve/reserve.component';


import { FullCalendarModule }      from '@fullcalendar/angular';

import { MatCardModule }           from '@angular/material/card';
import { MatButtonModule }         from '@angular/material/button';
import { MatDialogModule }         from '@angular/material/dialog';
import { MatTableModule }          from '@angular/material/table';
import { MatIconModule }           from '@angular/material/icon';
import { MatTooltipModule }        from '@angular/material/tooltip';

import { AthleteProfileComponent } from './views/athlete-profile/athlete-profile.component';
import { EventModalComponent }     from './views/athlete-profile/event-modal/event-modal.component';

import { MatMenuModule }     from '@angular/material/menu';
import { MatExpansionModule }    from '@angular/material/expansion';


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
    AthleteProfileComponent,
    EventModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

    // PrimeNG
    ButtonModule,
    CardModule,
    MenubarModule,
    ImageModule,
    TableModule,
    TabViewModule,
    TagModule,
    DropdownModule,

    FullCalendarModule,
    ReserveComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,     
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
