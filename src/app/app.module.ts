import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderNavComponent } from './features/header-nav/header-nav.component';
import { MenubarModule } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { AthleteComponent } from "./features/athlete/athlete.component";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HeaderNavComponent],
  imports: [BrowserModule, ButtonModule, CardModule, MenubarModule, ImageModule,AppRoutingModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
