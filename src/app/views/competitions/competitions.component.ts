import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CompetitionCardComponent } from 'src/app/component/competition-card/competition-card.component';
import { FilterComponent } from 'src/app/component/filter/filter.component';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CardModule,FormsModule,CommonModule,CompetitionCardComponent,FilterComponent],
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
})
export class CompetitionsComponent {
  competitions = [
    {
      title: 'Championnat de Tunisie TC - EL MENZAH',
      bassin: 'Petit bassin',
      dateRange: '26/12/2023 - 28/12/2023',
      categoryLabel: 'Toutes catégories',
    },
    {
      title: 'Coupe Nationale Juniors',
      bassin: 'Grand bassin',
      dateRange: '15/01/2024 - 17/01/2024',
      categoryLabel: 'Juniors',
    },
    {
      title: 'Tournoi Régional Nord',
      bassin: 'Petit bassin',
      dateRange: '02/02/2024 - 04/02/2024',
      categoryLabel: 'Cadets',
    },
  ];
}
