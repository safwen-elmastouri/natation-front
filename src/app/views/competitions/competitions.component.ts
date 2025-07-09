import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CompetitionCardComponent } from 'src/app/component/competition-card/competition-card.component';
import { FilterComponent } from 'src/app/component/filter/filter.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterCompititionsService } from '../../filter-compititions.service';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CardModule,FormsModule,CommonModule,CompetitionCardComponent,FilterComponent],
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
})
export class CompetitionsComponent implements OnInit {
  competitions: any[] = [];

  constructor(
    private http: HttpClient,
    public filterCompotitionsService: FilterCompititionsService
  ) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8081/api/competitions').subscribe({
      next: (data) => {
        const transformed = data.map((item) => ({
          ...item,
          title: item.title,
          dateRange: this.formatDateRange(item.dateStart, item.dateEnd),
          categoryLabel: item.category ? item.category : 'national',
          saison: item.season,
          competition: item.type || 'national',
          sexe: item.sexe || 'H',
        }));

        this.filterCompotitionsService.setCompetitions(transformed);
      },
      error: (err) => {
        console.error('Error fetching competitions:', err);
      },
    });

    this.filterCompotitionsService.filteredCompetitions.subscribe(
      (filteredData) => {
        this.competitions = filteredData;
      }
    );
  }

  private formatDateRange(start: string, end: string): string {
    const startYear = new Date(start).getFullYear();
    const endYear = new Date(end).getFullYear();
    return `${startYear} - ${endYear}`;
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')}/${date.getFullYear()}`;
  }
}
