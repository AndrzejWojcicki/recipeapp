import { IngredientsForRecipe } from './../../common/ingredients-for-recipe';
import { Rating } from './../../common/rating';
import { Comment } from 'src/app/common/comment';
import { RecipeSteps } from './../../common/recipe_step';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { User } from 'src/app/common/user';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Ingredient } from 'src/app/common/ingredient';


registerLocaleData(localePl, 'pl');

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {



  recipe: Recipe = new Recipe();
  steps: RecipeSteps[];
  comments: Comment[];
  authorofComment: User;
  authorofRecipe: string;
  authorsOfComments: string[] = new Array();
  ratings: Rating[] = new Array();
  total = 0;
  avgRatings: number;
  ingredientsAmount: IngredientsForRecipe[] = new Array();
  ingredient: Ingredient[] = new Array();

  // tslint:disable-next-line: variable-name
  constructor(private _activatedRoute: ActivatedRoute,
              // tslint:disable-next-line: variable-name
              private _recipeService: RecipeService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: label-position
    const data = '';
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getRecipeInfo();
        this.getRecipeSteps();
        this.getRecipeComments();
        this.getRecipeRatings();
        this.getRecipeAuthor();
        this.getRecipeIngredientsAmount();
      }
    );
  }

  // tslint:disable-next-line: typedef
  getRecipeSteps() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getRecipeSteps(id).subscribe(
      data => {
        data.sort((a: RecipeSteps, b: RecipeSteps) => (a.stepNumber > b.stepNumber) ? 1 : -1);
        this.steps = data;
      }
    );
  }

  // tslint:disable-next-line: typedef
  getRecipeComments() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getRecipeComments(id).subscribe(
      data => {
        data.sort((a: Comment, b: Comment) => (a.dateCreated > b.dateCreated) ? 1 : -1);
        this.comments = data;
        this.comments.forEach( comment =>
          this.getCommentAuthor(comment.comment_id));
      }
    );
  }

// tslint:disable-next-line: typedef
getRecipeRatings() {
  const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
  this._recipeService.getRecipeRatings(id).subscribe(
    data => {
      this.ratings = data;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.ratings.length; i++) {
    this.total += this.ratings[i].value;
  }
      this.avgRatings = this.total / this.ratings.length;
      if (Number.isNaN(this.avgRatings)){
        this.avgRatings = 0;
      }
    }
  );
}

  // tslint:disable-next-line: typedef
  getCommentAuthor(commentId: number) {
    this._recipeService.getCommentsAuthor(commentId).subscribe(
      data => {
        this.authorofComment = data;
        this.authorsOfComments.push(this.authorofComment.userName);
      }
    );
  }

  // tslint:disable-next-line: typedef
  getRecipeAuthor() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getRecipeAuthor(id).subscribe(
      data => {
        this.authorofRecipe = data.userName;
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
  }

  // tslint:disable-next-line: typedef
  getRecipeIngredientsAmount() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getAmountIngredients(id).subscribe(
      data => {
        data.sort((a: IngredientsForRecipe, b: IngredientsForRecipe) => (a.id > b.id) ? 1 : -1);
        this.ingredientsAmount = data;
        this.ingredientsAmount.forEach(ingredient =>
          this.getIngredientName(ingredient.id)
          );
      }
    );
  }

  // tslint:disable-next-line: typedef
  getIngredientName(id: number) {
    this._recipeService.getIngredient(id).subscribe(
      temp => {
        this.ingredient.push(temp);
        this.ingredient.sort((a: Ingredient, b: Ingredient) => (a.id > b.id) ? 1 : -1);
      }
    );
  }
}
