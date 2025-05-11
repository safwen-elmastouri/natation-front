import { Component } from '@angular/core';

@Component({
  selector: 'app-competitions',
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
