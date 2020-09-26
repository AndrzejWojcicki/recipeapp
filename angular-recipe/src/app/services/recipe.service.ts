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
    return this.httpClient.get<GetResponseRecipe>(searchUrl).pipe(
      map(response => response._embedded.recipes)
    );
  }

  getRecipeCategory(): Observable<RecipeCategory[]>{
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseRecipe{
  _embedded: {
    recipes: [];
  };
}

interface GetResponseCategory{
  _embedded: {
    productCategory: RecipeCategory[];
  };

}
