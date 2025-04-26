import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-athlete-card',
  templateUrl: './athlete-card.component.html',
  styleUrls: ['./athlete-card.component.css']
})
export class AthleteCardComponent {
  @Input() photoUrl: string = '';
  @Input() name: string = '';
  @Input() club: string = '';
  @Input() achievement: string = '';
  @Input() country: string = '';
  @Input() stroke: string = '';
}
