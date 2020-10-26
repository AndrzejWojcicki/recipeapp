import { IngredientsService } from './../../services/ingredients.service';
import { StepsService } from 'src/app/services/steps.service';
import { RatingService } from './../../services/rating.service';
import { CommentsService } from './../../services/comments.service';
import { IngredientsForRecipe } from './../../common/ingredients-for-recipe';
import { Rating } from './../../common/rating';
import { Comment } from 'src/app/common/comment';
import { RecipeSteps } from './../../common/recipe_step';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Recipe } from 'src/app/common/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { User } from 'src/app/common/user';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Ingredient } from 'src/app/common/ingredient';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

registerLocaleData(localePl, 'pl');

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = new Recipe();
  steps: RecipeSteps[] = new Array();
  comments: Comment[];
  authorofComment: User;
  authorofRecipe: string;
  authorsOfComments: string[] = new Array();
  ratings: Rating[] = new Array();
  total = 0;
  avgRatings: number;
  ingredientsAmount: IngredientsForRecipe[] = new Array();
  ingredient: Ingredient[] = new Array();
  user;

  // comments checking section
  message: string;
  username = '';

  // check log in
  isLoggedIn = false;

  // rating
  currentRate = 3;
  rateAdded = false;
  userRateId: number;



  constructor(
    // tslint:disable-next-line: variable-name
    private _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _recipeService: RecipeService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private commentService: CommentsService,
    private ratingService: RatingService,
    private stepService: StepsService,
    private ingredietService: IngredientsService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    if (this.user) {
      this.username = this.user.username;
      this.isLoggedIn = true;
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
        const user2 = this.tokenStorage.getUser();
        if (this.user) {
          this.isLoggedIn = true;
          this.username = user2.username;
        }
      }
    });
    // tslint:disable-next-line: label-position
    const data = '';
    this._activatedRoute.paramMap.subscribe(() => {
      this.getRecipeInfo();
      this.getRecipeSteps();
      this.getRecipeComments();
      this.getRecipeRatings();
      this.getRecipeAuthor();
      this.getRecipeIngredientsAmount();
    });
  }

  // tslint:disable-next-line: typedef
  getRecipeSteps() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getRecipeSteps(id).subscribe((data) => {
      data.sort((a: RecipeSteps, b: RecipeSteps) =>
        a.stepNumber > b.stepNumber ? 1 : -1
      );
      this.steps = data;
    });
  }

  // tslint:disable-next-line: typedef
  getRecipeComments() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getRecipeComments(id).subscribe((data) => {
      data.sort((a: Comment, b: Comment) =>
        a.dateCreated > b.dateCreated ? 1 : -1
      );
      this.comments = data;
      this.comments.forEach((comment) =>
        this.getCommentAuthor(comment.comment_id)
      );
    });
  }

  // tslint:disable-next-line: typedef
  getRecipeRatings() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getRecipeRatings(id).subscribe((data) => {
      this.ratings = data;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.ratings.length; i++) {
        this.total += this.ratings[i].value;
        this.compareRatingAuthor(this.ratings[i].rating_id);
      }
      this.avgRatings = this.total / this.ratings.length;
      if (Number.isNaN(this.avgRatings)) {
        this.avgRatings = 0;
      }
    });
  }

  compareRatingAuthor(ratingId: number): void {
    this.ratingService.getRatingAuthor(ratingId).subscribe((data) => {
      if (this.username === data.userName) {
        this.rateAdded = true;
        this.getRating(ratingId);
        this.userRateId = ratingId;
      }
    });
  }

  getRating(ratingId: number): void {
    this.ratingService.getRating(ratingId).subscribe((data) => {
      this.currentRate = data.value;
    });
  }

  addRate(ratingValue: number): void {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    const ratePack = {
      // tslint:disable-next-line: object-literal-key-quotes quotemark
      user: { "user_id": this.user.id },
      // tslint:disable-next-line: object-literal-key-quotes quotemark
      recipe: { "id": id },
      value: this.currentRate
    };
    this.ratingService.addRate(ratePack).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.reloadPage();
  }

  editRate(ratingValue: number): void {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    const ratePack = {
      // tslint:disable-next-line: object-literal-key-quotes quotemark
      user: { "user_id": this.user.id },
      // tslint:disable-next-line: object-literal-key-quotes quotemark
      recipe: { "id": id },
      value: this.currentRate
    };

    this.ratingService.updateRate(this.userRateId, ratePack).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.reloadPage();
  }

  deleteRate(): void {
    this.ratingService.deleteRate(this.userRateId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.reloadPage();
  }

  // tslint:disable-next-line: typedef
  getCommentAuthor(commentId: number) {
    this._recipeService.getCommentsAuthor(commentId).subscribe((data) => {
      this.authorofComment = data;
      this.authorsOfComments.push(this.authorofComment.userName);
    });
  }

  // tslint:disable-next-line: typedef
  getRecipeAuthor() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getRecipeAuthor(id).subscribe((data) => {
      this.authorofRecipe = data.userName;
    });
  }

  // tslint:disable-next-line: typedef
  getRecipeInfo() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.get(id).subscribe((data) => {
      this.recipe = data;
    });
  }

  // tslint:disable-next-line: typedef
  getRecipeIngredientsAmount() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._recipeService.getAmountIngredients(id).subscribe((data) => {
      data.sort((a: IngredientsForRecipe, b: IngredientsForRecipe) =>
        a.id > b.id ? 1 : -1
      );
      this.ingredientsAmount = data;
      this.ingredientsAmount.forEach((ingredient) =>
        this.getIngredientName(ingredient.id)
      );
    });
  }

  // tslint:disable-next-line: typedef
  async getIngredientName(id: number) {
    this._recipeService.getIngredient(id).subscribe((temp) => {
      this.ingredient.push(temp);
      this.ingredient.sort((a: Ingredient, b: Ingredient) =>
        a.id > b.id ? 1 : -1
      );
    });
  }

  addComment(message): void {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    const commentPack = {
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      author: { "user_id": this.user.id },
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      recipe: { "id": id },
      // tslint:disable-next-line: object-literal-key-quotes
      message: message.value
    };
    this.commentService.addComent(commentPack).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.reloadPage();
  }
  deleteComment(commentId: number): void {
    this.commentService.deleteComent(commentId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    this.reloadPage();
  }

  recipeDetailsEdit(): void {
    this.router.navigateByUrl('profil/mojeprzepisy/edytuj/' + this.recipe.id);
  }

  ingredientAdd(): void {
    this.router.navigateByUrl('profil/dodajskladnik/' + this.recipe.id);
  }

  stepAdd(): void {
    this.router.navigateByUrl('profil/dodajkrok/' + this.recipe.id);
  }

  stepsAdd(): void {
    this.router.navigateByUrl('profil/dodajkroki/' + this.recipe.id);
  }


  recipeStepEdit(stepId: number): void {
    this.router.navigateByUrl('profil/mojeprzepisy/edytuj/kroki/' + stepId + '/przepis/' + this.recipe.id);
  }

  recipeStepDelete(stepId: number): void {
    this.stepService.deleteStep(stepId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    this.reloadPage();
  }

  recipeIngredientUpdate(ingredientAmountId: number): void {
    this.router.navigateByUrl('profil/mojeprzepisy/edytuj/skladnik/' + ingredientAmountId + '/przepis/' + this.recipe.id);
  }

  recipeIngredientDelete(ingredientAmountId: number): void {
    console.log(ingredientAmountId);
    this.ingredietService.deleteIngredient(ingredientAmountId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }


}
