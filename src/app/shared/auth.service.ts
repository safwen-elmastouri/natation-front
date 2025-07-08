import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  // ajoute d’autres champs que ton backend retourne si besoin
}

interface RegisterRequest {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  isAdmin?: boolean; // Pour le front uniquement
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8081/api/auth'; // URL de base de ton API

  constructor(private http: HttpClient) {}

  // Création super admin
  createSuperAdmin(data: RegisterRequest): Observable<any> {
    // N'envoie que ce dont le backend a besoin
    return this.http.post(`${this.apiUrl}/create-super-admin`, {
      email: data.email,
      password: data.password
    });
  }

  // Création utilisateur simple
  createUser(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      email: data.email,
      password: data.password
    });
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(error => {
        console.log('Erreur HTTP reçue:', error);

        let errorMessage = 'Une erreur est survenue.';
        
        // Ici, ton backend renvoie un message string directement :
        if (error.status === 401 || error.status === 403) {
          // error.error contient le texte renvoyé depuis Spring Boot
          errorMessage = typeof error.error === 'string'
            ? error.error
            : 'Email ou mot de passe incorrect.';
        }

        return throwError(() => new Error(errorMessage));
      })
    );
}

forgotPassword(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/forget-password`, { email });
}
resetPassword(token: string, newPassword: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
}


}
