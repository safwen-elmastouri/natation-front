// src/app/services/athlete.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Athlete } from '../models/athlete.model';

@Injectable({ providedIn: 'root' })
export class AthleteService {
  private baseUrl = 'http://localhost:8081/api/athlete';

  constructor(private http: HttpClient) {}

  getAthlete(id: number): Observable<Athlete> {
    return this.http.get<Athlete>(
      `${this.baseUrl}/getAthletesWithCompetitionsAndEvents/${id}`
    );
  }

  confirmEvent(eventId: number, athleteId: number, response: boolean | null): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/confirm/${eventId}/${athleteId}/${response}`,
      {}
    );
  }
  
  checkEvent(
    athleteId: number,
    eventId: number
  ): Observable<boolean|null> {
    return this.http.get<boolean|null>(
      `${this.baseUrl}/check/${athleteId}/${eventId}`
    );
  }

}
