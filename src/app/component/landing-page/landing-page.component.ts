import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/features/footer/footer.component';
import { SwimmersOverviewComponent } from 'src/app/swimmers-overview/swimmers-overview.component';
import { CarouselComponent } from "../../features/carousel/carousel.component";
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule,SwimmersOverviewComponent, FooterComponent, CarouselComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent{
  eventStartDate = new Date('2025-05-15');
  eventEndDate = new Date('2025-05-18');

  }