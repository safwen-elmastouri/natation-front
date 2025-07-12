import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';

interface Ranking {
  fullName: string;
  club: string;
  time: string;
  points: string;
  category: string;
}

@Component({
  selector: 'app-swimmers-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
  ],
  templateUrl: './swimmers-overview.component.html',
  styleUrls: ['./swimmers-overview.component.css'],
})
export class SwimmersOverviewComponent implements OnInit {
  selectedGender: number = 0;
  allFemaleSwimmers: any[] = [];
  allMaleSwimmers: any[] = [];

  searchTerm: string = '';
selectedSwimmer: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Ranking[]>('http://localhost:8081/api/rankings').subscribe({
      next: (data) => {
        this.allFemaleSwimmers = data
          .filter((item) => item.category.toLowerCase() === 'dames')
          .map((item, index) => ({
            place: index + 1,
            name: item.fullName,
            club: item.club,
            time: item.time,
            points: Number(item.points),
          }));

        this.allMaleSwimmers = data
          .filter((item) => item.category.toLowerCase() === 'messieurs')
          .map((item, index) => ({
            place: index + 1,
            name: item.fullName,
            club: item.club,
            time: item.time,
            points: Number(item.points),
          }));
      },
      error: (err) => {
        console.error('Error fetching rankings:', err);
      },
    });
  }

  get currentSwimmers() {
    return this.selectedGender === 0 ? this.allFemaleSwimmers : this.allMaleSwimmers;
  }

  get filteredSwimmers() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) return this.currentSwimmers;

    return this.currentSwimmers.filter((swimmer) =>
      swimmer.name.toLowerCase().includes(term) ||
      swimmer.club.toLowerCase().includes(term) ||
      swimmer.points.toString().includes(term) ||
      swimmer.time.toLowerCase().includes(term)
    );
  }

  onGenderChange(gender: number): void {
    this.selectedGender = gender;
  }

  onSearchChange(): void {
  }
}
