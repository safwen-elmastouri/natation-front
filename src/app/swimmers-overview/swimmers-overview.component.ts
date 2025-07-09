import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// 👇 PrimeNG modules
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
    TableModule,      // ✅ Import TableModule
  ],
  templateUrl: './swimmers-overview.component.html',
  styleUrls: ['./swimmers-overview.component.css'],
})
export class SwimmersOverviewComponent implements OnInit {
  selectedStyle: number = 0;
  selectedGender: number = 0;

  allFemaleSwimmers: any[] = [];
  allMaleSwimmers: any[] = [];

  displayedSwimmers: any[] = [];

  // Search term for filtering
  searchTerm: string = '';

  championTitle = 'Championnat de Tunisie TC - EL MENZAH';
  championDateRange = '26/12/2023 - 28/12/2023';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Ranking[]>('http://localhost:8081/api/rankings').subscribe({
      next: (data) => {
        this.allFemaleSwimmers = data
          .filter((item) => item.category.toLowerCase() === 'dames')
          .map((item, key) => ({
            place: key + 1,
            name: item.fullName,
            club: item.club,
            time: item.time,
            points: Number(item.points),
          }));

        this.allMaleSwimmers = data
          .filter((item) => item.category.toLowerCase() === 'messieurs')
          .map((item, key) => ({
            place: key + 1,
            name: item.fullName,
            club: item.club,
            time: item.time,
            points: Number(item.points),
          }));

        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching rankings:', err);
      },
    });
  }

  get currentSwimmers() {
    return this.selectedGender === 0
      ? this.allFemaleSwimmers
      : this.allMaleSwimmers;
  }

  get filteredSwimmers() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.paginate(this.currentSwimmers);
    }

    const filtered = this.currentSwimmers.filter((swimmer) => {
      return (
        swimmer.name.toLowerCase().includes(term) ||
        swimmer.club.toLowerCase().includes(term) ||
        swimmer.points.toString().includes(term) ||
        swimmer.time.toLowerCase().includes(term)
      );
    });

    return this.paginate(filtered);
  }

  // Paginate an array according to currentPage and itemsPerPage
  paginate(arr: any[]): any[] {
    this.totalPages = Math.ceil(arr.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return arr.slice(start, end);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.currentSwimmers.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onGenderChange(gender: number): void {
    this.selectedGender = gender;
    this.currentPage = 1;
  }

  onSearchChange(): void {
    this.currentPage = 1; // Reset to first page when searching
  }
}
