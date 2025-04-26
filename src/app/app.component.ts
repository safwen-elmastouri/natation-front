import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'natation-front';
  eventStartDate = new Date('2025-05-15');
  eventEndDate = new Date('2025-05-18');
}
