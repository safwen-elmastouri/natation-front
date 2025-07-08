import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  email?: string;
}

export interface Coach {
  id?: number;
  user?: User;
}

export interface Equipe {
  id?: number;
  nom?: string;
  imagePath?: string;
  coach?: Coach;
}

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private baseUrl = 'http://localhost:8081/api/equipes'; // URL backend

  constructor(private http: HttpClient) { }

  getAllEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.baseUrl);
  }

  createEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.baseUrl, equipe);
  }

  updateEquipe(id: number, equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.baseUrl}/${id}`, equipe);
  }

  deleteEquipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEquipeById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${this.baseUrl}/${id}`);
  }
}
