import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Couloir {
  id?: number;
  nom: string;
  longueur?: number;
    numero?: number; // <- Ajouté

}

export interface Piscine {
  id?: number;
  nom: string;
  adresse: string;
  disponible?: boolean;
  couloirs: Couloir[];
}

@Injectable({
  providedIn: 'root'
})
export class PiscineService {

  private apiUrl = 'http://localhost:8081/api/piscines';

  constructor(private http: HttpClient) { }

  getAllPiscines(): Observable<Piscine[]> {
    return this.http.get<Piscine[]>(this.apiUrl);
  }

  getPiscineById(id: number): Observable<Piscine> {
    return this.http.get<Piscine>(`${this.apiUrl}/${id}`);
  }

  createPiscine(piscine: Piscine): Observable<Piscine> {
    return this.http.post<Piscine>(this.apiUrl, piscine);
  }

  updatePiscine(id: number, piscine: Piscine): Observable<Piscine> {
    return this.http.put<Piscine>(`${this.apiUrl}/${id}`, piscine);
  }

  deletePiscine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
