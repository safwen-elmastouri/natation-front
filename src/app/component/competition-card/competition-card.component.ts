import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'competition-card',
  standalone: true,   
  imports: [CommonModule,ButtonModule],
  templateUrl: './competition-card.component.html',
  styleUrls: ['./competition-card.component.css']
})
export class CompetitionCardComponent {
  @Input() title!: string;
  @Input() bassin!: string;
  @Input() dateRange!: string;
  @Input() categoryLabel: string = 'Toutes catégories';
}
