import { IngredientsService } from './../../../../../services/ingredients.service';
import { Ingredient } from './../../../../../common/ingredient';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-ingredients-result',
  templateUrl: './ingredients-result.component.html',
  styleUrls: ['./ingredients-result.component.css']
})
export class IngredientsResultComponent implements OnInit {

  currentUser: any;
  isSucceded = false;
  isFailed = false;
  errorMessage = '';
  addedRecipeId: number;
  ownRecipe = false;
  searchProductName = '';
  isValid = true;
  form: any = {};
  ingredients: Ingredient[] = [];

  constructor(
    // tslint:disable-next-line: variable-name
    private _activatedRoute: ActivatedRoute,
    private token: TokenStorageService,
    private recipeService: RecipeService,
    private ingredientsSerivce: IngredientsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addedRecipeId = +this._activatedRoute.snapshot.paramMap.get('id');
    this.searchProductName = this._activatedRoute.snapshot.paramMap.get('searchName');
    this.currentUser = this.token.getUser();
    if (this.currentUser) {
      this.checkAuthor();
    }
    if (this.searchProductName !== '') {
      this.getIngredients();
    }
  }

  getIngredients(): void {
    this.ingredientsSerivce.searchIngredients(this.searchProductName).subscribe(
      (data) => {
        this.ingredients = data._embedded.ingredients;
      }
    );
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

  onSubmit(): void {
    const ingredientPack = {
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      recipe: { "id": this.addedRecipeId },
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      ingredient: { "id": this.form.productName },
      amount: this.form.amount
    };

    this.ingredientsSerivce.addIngredientAmount(ingredientPack).subscribe(
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

  addRecipeToDatabase(): void {
    this.router.navigateByUrl('profil/dodajprodukt');
  }

  returnToAdding(): void {
    this.router.navigateByUrl('profil/dodajskladnik/' + this.addedRecipeId);
  }
}
