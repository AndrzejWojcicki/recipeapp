import { RecipeSteps } from './../common/recipe_step';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../common/recipe';
import { RecipeCategory } from '../common/recipe-Category';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:8080/api/recipes';
  private categoryUrl = 'http://localhost:8080/api/recipe-Category';

  constructor(private httpClient: HttpClient) { }

  getRecipes(theCategoryId: number): Observable<Recipe[]>{
    const searchUrl = `${this.baseUrl}/search/category?id=${theCategoryId}`;
    return this.getRecipeList(searchUrl);
  }

  // tslint:disable-next-line: typedef
  private getRecipeList(searchUrl: string) {
    return this.httpClient.get<GetResponseRecipe>(searchUrl).pipe(
      map(response => response._embedded.recipes)
    );
  }

  getRecipeCategory(): Observable<RecipeCategory[]>{
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.recipeCategory)
    );
  }

  getRecipeSteps(recipeId: number): Observable<RecipeSteps[]>{
    const stepsUrl = `${this.baseUrl}/${recipeId}/steps`;
    return this.httpClient.get<GetResponseSteps>(stepsUrl).pipe(
      map(response => response._embedded.stepsOfRecipe)
      );
  }

  searchRecipes(keyword: string): Observable<Recipe[]>{
    const searchUrl = `${this.baseUrl}/search/search?name=${keyword}`;
    return this.getRecipeList(searchUrl);
  }

  get(recipeId: number): Observable<Recipe> {
    const recipeDetailUrl = `${this.baseUrl}/${recipeId}`;
    return this.httpClient.get<Recipe>(recipeDetailUrl);
  }
}



interface GetResponseRecipe{
  _embedded: {
    recipes: [];
  };
}

interface GetResponseCategory{
  _embedded: {
    recipeCategory: RecipeCategory[];
  };
}

interface GetResponseSteps{
  _embedded: {
    stepsOfRecipe: RecipeSteps[];
  };
}
