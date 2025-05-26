import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'COACH' | 'ATHLETE';

export interface User {
  id: number;
  email: string;
  type?: UserType | null;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
}

export interface UserRoleAssignmentRequest {
  userId: number;
  role: UserType;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8081/api/admin';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

 assignRole(request: UserRoleAssignmentRequest): Observable<string> {
  return this.http.post('http://localhost:8081/api/admin/assign-role', request, { responseType: 'text' });
}


  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
