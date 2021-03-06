import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private comentUrl = 'http://localhost:8080/comments';

  constructor(private httpClient: HttpClient) { }

  addComent(data): Observable<object> {
    return this.httpClient.post(`${this.comentUrl}`, data);
  }

  deleteComent(commentId: number): Observable<object> {
    return this.httpClient.delete(`${this.comentUrl}/${commentId}`);
  }
}

