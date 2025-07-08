import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  id: number;
  email: string;
  // autres champs si besoin
}

export interface Coach {
  id: number;
  user: User;
  // autres champs si besoin
}

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private baseUrl = 'http://localhost:8081/api/equipes/coachs'; // <-- bon endpoint ici

  constructor(private http: HttpClient) {}

  getAllCoachs(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.baseUrl).pipe(
      tap(coachs => console.log("Coachs reçus du backend:", coachs))
    );
  }
}
