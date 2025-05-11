import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  eventStartDate = new Date('2025-05-15');
  eventEndDate = new Date('2025-05-18');
}
