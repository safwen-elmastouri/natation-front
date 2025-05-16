// src/app/services/share-file.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShareFileService {
  private apiUrl = 'http://localhost:8081/sharefile';

  constructor(private http: HttpClient) {}

  share(payload: { filename: string; data: string; }): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
