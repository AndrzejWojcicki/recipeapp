import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DietsService {
  private comentUrl = 'http://localhost:8080/diet';

  constructor(private httpClient: HttpClient) { }

  addDiet(data): Observable<object> {
    return this.httpClient.post(`${this.comentUrl}`, data);
  }

  updateDiet(dietId: number): Observable<object> {
    return this.httpClient.delete(`${this.comentUrl}/${dietId}`);
  }

  deleteDiet(dietId: number): Observable<object> {
    return this.httpClient.delete(`${this.comentUrl}/${dietId}`);
  }
}

