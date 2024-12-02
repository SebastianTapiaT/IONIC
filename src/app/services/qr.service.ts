import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QRService {
  private apiUrl = 'http://localhost:8000/api/qr';

  constructor(private http: HttpClient) {}

  saveQRData(data: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, { data });
  }

  getQRData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
