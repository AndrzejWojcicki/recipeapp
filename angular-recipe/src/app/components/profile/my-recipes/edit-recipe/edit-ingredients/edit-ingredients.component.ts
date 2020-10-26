import { IngredientsForRecipe } from './../../../../../common/ingredients-for-recipe';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/common/ingredient';

@Component({
  selector: 'app-edit-ingredients',
  templateUrl: './edit-ingredients.component.html',
  styleUrls: ['./edit-ingredients.component.css']
})
export class EditIngredientsComponent implements OnInit {

  currentUser: any;
  isSucceded = false;
  isFailed = false;
  errorMessage = '';
  addedRecipeId: number;
  addedIngredient: number;
  ownRecipe = false;
  searchProductName = '';
  ingredient = new Ingredient();
  form: any = {};

  constructor(
    // tslint:disable-next-line: variable-name
    private _activatedRoute: ActivatedRoute,
    private token: TokenStorageService,
    private recipeService: RecipeService,
    private ingredientsSerivce: IngredientsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addedRecipeId = +this._activatedRoute.snapshot.paramMap.get('recipeId');
    this.addedIngredient = +this._activatedRoute.snapshot.paramMap.get('id');
    this.currentUser = this.token.getUser();
    if (this.currentUser) {
      this.checkAuthor();
    }
    if (this.addedIngredient) {
      this.getIngredientAmountInfo();
      this.getIngredientInfo();
    }
  }

  checkAuthor(): void {
    this.recipeService.getRecipeAuthor(this.addedRecipeId).subscribe(
      (data) => {
        if (data.user_id === this.currentUser.id) {
          this.ownRecipe = true;
        }
      }
    );
  }

  getIngredientAmountInfo(): void {
    this.ingredientsSerivce.getIngredientAmountData(this.addedIngredient).subscribe(
      (data) => {
        this.form.amount = data.amount;
      }
    );
  }

  getIngredientInfo(): void {
    this.ingredientsSerivce.getIngredientData(this.addedIngredient).subscribe(
      (data) => {
        console.log(data);
        this.ingredient = data;
      }
    );
  }

  onSubmit(): void {
    const ingredientPack = {
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      recipe: { "id": this.addedRecipeId },
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      ingredient: { "id": this.ingredient.id },
      amount: this.form.amount
    };

    this.ingredientsSerivce.updateIngredient(this.addedIngredient, ingredientPack).subscribe(
      (response) => {
        console.log(response);
        this.isSucceded = true;
      },
      (error) => {
        console.log(error);
        this.isFailed = true;
        this.errorMessage = error.error.message;
      }
    );

  }

  returnToRecipe(): void {
    this.router.navigateByUrl('przepisy/' + this.addedRecipeId);
  }
}
