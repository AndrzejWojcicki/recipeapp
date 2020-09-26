import { RecipeSteps } from './../../common/recipe_step';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe = new Recipe();
  steps: RecipeSteps[];

  // tslint:disable-next-line: variable-name
  constructor(private _activatedRoute: ActivatedRoute,
              // tslint:disable-next-line: variable-name
              private _recipeService: RecipeService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getRecipeInfo();
      }
    );
  }

  // tslint:disable-next-line: typedef
  getRecipeSteps(id: number) {
    this._recipeService.getRecipeSteps(id).subscribe(
      data => {
        data.sort((a: RecipeSteps, b: RecipeSteps) => (a.stepNumber > b.stepNumber) ? 1 : -1);
        this.steps = data;
      }
    );
  }

  // tslint:disable-next-line: typedef
  getRecipeInfo() {

    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.get(id).subscribe(
      data => {
        this.recipe = data;
      }
    );
    this.getRecipeSteps(id);
  }
}
