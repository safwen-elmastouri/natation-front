import { Component } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  saisons = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
  ];
  competitions = [
    { label: 'Toutes les compétitions', value: null },
    { label: 'National', value: 'national' },
    { label: 'International', value: 'international' },
  ];
  categories = [
    { label: 'Toutes les catégories', value: null },
    { label: 'Nuage libre', value: 'nuage-libre' },
    { label: 'Eau libre', value: 'eau-libre' },
  ];
  bassins = [
    { label: 'Tous les bassins', value: null },
    { label: 'Bardo', value: 'bardo' },
    { label: 'Menzah', value: 'menzah' },
  ];
  sexes = [
    { label: 'Tous', value: 'all' },
    { label: 'Homme', value: 'H' },
    { label: 'Femme', value: 'F' },
  ];

  selectedSaison: string = '';
  selectedCompetition: string = '';
  selectedCategorie: string = '';
  selectedBassin: string = '';
  selectedSexe: string = '';

  applyFilters() {
    console.log({
      saison: this.selectedSaison,
      competition: this.selectedCompetition,
      categorie: this.selectedCategorie,
      bassin: this.selectedBassin,
      sexe: this.selectedSexe,
    });
  }
}
