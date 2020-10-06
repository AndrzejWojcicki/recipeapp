import { User } from './../common/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../common/recipe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private userDataUrl =
    'http://localhost:8080/api/users/search/findByUserName?userName=';
  private userEditUrl = 'http://localhost:8080/users/';
  private userRecipesUrl = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  getUserDetials(username: string): Observable<User> {
    const findUrl = `${this.userDataUrl}${username}`;
    return this.httpClient.get<User>(findUrl);
  }

  updateUser(userId: number, data): Observable<object> {
    return this.httpClient.put(`${this.userEditUrl}${userId}`, data);
  }

  // tslint:disable-next-line: typedef
  getUserRecipes(userId: number): Observable<Recipe[]> {
    const findRecipesUrl = `${this.userRecipesUrl}/${userId}/recipes`;
    return this.httpClient.get<GetResponseRecipe>(findRecipesUrl)
      .pipe(map((response) => response._embedded.recipes));
  }
}

interface GetResponseRecipe {
  _embedded: {
    recipes: [];
    // tslint:disable-next-line: semicolon
  };
}
