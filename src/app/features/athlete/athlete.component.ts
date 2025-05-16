import { Component, OnInit } from '@angular/core';
import { Card, CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-athlete',
  standalone: true,
  imports: [CommonModule, FormsModule,CardModule, ButtonModule],
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css']
})
export class AthleteComponent implements OnInit {
  athletes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/athlète.json').subscribe(data => {
      this.athletes = data;
    });
  }
}