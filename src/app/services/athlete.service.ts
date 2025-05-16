import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Athlete {
  id: number;
  nom: string;
  discipline: string;
  specialite: string;
  description: string;
  age: number;
  record: string;
  titre: string;
  image: string;
  events: {
    id: number;
    eventTitle: string;
    competition: { title: string; dateStart: string; dateEnd: string };
    damesUrl: string;
    messieursUrl: string;
    mixteUrl: string;
    rankings: any[];
  }[];
}

@Injectable({ providedIn: 'root' })
export class AthleteService {
  constructor(private http: HttpClient) {}

  getAthlete(id: number): Observable<Athlete|undefined> {
    return this.http
      .get<Athlete[]>('assets/athletes.json')
      .pipe(map(list => list.find(a => a.id === id)));
  }
}
