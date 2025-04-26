import { Component } from '@angular/core';

@Component({
  selector: 'app-swimmers-overview',
  templateUrl: './swimmers-overview.component.html',
  styleUrls: ['./swimmers-overview.component.css'],
})
export class SwimmersOverviewComponent {
  selectedStyle: number = 0;
  selectedGender: number = 0;
  // to be extracted in JSON file
  femaleSwimmers = [
    { name: 'SLITI Tayssir', club: 'EST', time: '27.53', points: 1209 },
    { name: 'BEN HSOUNA Emna', club: 'CA', time: '27.63', points: 1203 },
    { name: 'BELGHITH Habiba', club: 'OLYMPICA', time: '27.69', points: 1199 },
    { name: 'BEL HAJ BRIK Azza', club: 'ASCNS', time: '27.94', points: 1182 },
    { name: 'SALEM Mariem', club: 'CA', time: '28.03', points: 1176 },
  ];
  maleSwimmers = [
    { name: 'MELLOULI Ahmed', club: 'EST', time: '24.53', points: 1309 },
    { name: 'MATHLOUTHI Oussama', club: 'CA', time: '24.63', points: 1303 },
    {
      name: 'BEN KHEDHER Fares',
      club: 'OLYMPICA',
      time: '24.89',
      points: 1289,
    },
    { name: 'SAHLI Aziz', club: 'ASCNS', time: '25.14', points: 1272 },
    { name: 'MEJRI Yassine', club: 'CA', time: '25.23', points: 1266 },
  ];
  championTitle = 'Championnat de Tunisie TC - EL MENZAH';
  championDateRange = '26/12/2023 - 28/12/2023';

}
