import { User } from './../common/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private userDataUrl =
    'http://localhost:8080/api/users/search/findByUserName?userName=';
  private userEditUrl = 'http://localhost:8080/users/';

  constructor(private httpClient: HttpClient) {}

  getUserDetials(username: string): Observable<User> {
    const findUrl = `${this.userDataUrl}${username}`;
    return this.httpClient.get<User>(findUrl);
  }

  updateUser(userId: number, data): Observable<object> {
    return this.httpClient.put(`${this.userEditUrl}${userId}`, data);
  }
}
