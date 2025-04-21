import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ButtonDemo } from './button-demo/button-demo.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { MenubarModule } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [AppComponent, ButtonDemo, HeaderNavComponent],
  imports: [BrowserModule, ButtonModule, CardModule, MenubarModule, ImageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
