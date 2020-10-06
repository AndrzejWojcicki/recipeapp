import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  private stepUrl = 'http://localhost:8080/steps';

  constructor(private httpClient: HttpClient) { }

  addStep(data): Observable<object> {
    return this.httpClient.post(`${this.stepUrl}`, data);
  }

  updateStep(stepId: number, data): Observable<object> {
    return this.httpClient.put(`${this.stepUrl}/${stepId}`, data);
  }

  deleteStep(stepId: number): Observable<object> {
    return this.httpClient.delete(`${this.stepUrl}/${stepId}`);
  }
}
