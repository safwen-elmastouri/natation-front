import { Component, Input } from '@angular/core';

@Component({
  selector: 'competition-card',
  templateUrl: './competition-card.component.html',
  styleUrls: ['./competition-card.component.css']
})
export class CompetitionCardComponent {
  @Input() title!: string;
  @Input() bassin!: string;
  @Input() dateRange!: string;
  @Input() categoryLabel: string = 'Toutes catégories';
}
