import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FilterCompititionsService } from '../../filter-compititions.service';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [DropdownModule, FormsModule, ButtonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  constructor(private filterService: FilterCompititionsService) {}

  saisons = [
    { label: '2020-2021', value: 'Saison 2020-2021' },
    { label: '2021-2022', value: 'Saison 2021-2022' },
    { label: '2022-2023', value: 'Saison 2022-2023' },
    { label: '2023-2024', value: 'Saison 2023-2024' },
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
  selectedSexe: string = 'all';

  applyFilters() {
    const criteria = {
      saison: this.selectedSaison,
      competition: this.selectedCompetition,
      categorie: this.selectedCategorie,
      bassin: this.selectedBassin,
      sexe: this.selectedSexe,
    };

    this.filterService.sendMessage(criteria);
    console.log('Applied Filters:', criteria);
  }

  resetFilters() {
    this.selectedSaison = '';
    this.selectedCompetition = '';
    this.selectedCategorie = '';
    this.selectedBassin = '';
    this.selectedSexe = 'all';

    const resetCriteria = {
      saison: '',
      competition: '',
      categorie: '',
      bassin: '',
      sexe: 'all',
    };

    this.filterService.sendMessage(resetCriteria);
    console.log('Filters reset');
  }
}
