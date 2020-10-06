import { User } from './../../../../common/user';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserDetailsService } from './../../../../services/userdetails.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

export class Descriptions {
  Value: string;
  constructor(Value: string) {
    this.Value = Value;
  }
}

@Component({
  selector: 'app-add-steps',
  templateUrl: './add-steps.component.html',
  styleUrls: ['./add-steps.component.css']
})
export class AddStepsComponent implements OnInit {

  currentUser: any;
  currentUserDetails: User = new User();
  isSubmitted = false;
  isSucceded = false;
  isFailed = false;
  errorMessage = '';
  form: any = [];
  addedRecipeId: number;
  ownRecipe = false;

  descriptions: Descriptions[] = new Array();
  isForUpdate = false;
  newDescription: any = {};
  updatedDescription;

  constructor(
    // tslint:disable-next-line: variable-name
    private _activatedRoute: ActivatedRoute,
    private token: TokenStorageService,
    private userService: UserDetailsService,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.addedRecipeId = +this._activatedRoute.snapshot.paramMap.get('id');
    this.currentUser = this.token.getUser();
    this.checkAuthor();
    console.log(this.currentUser.id);
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

  addDescription(): void {
    this.descriptions.push(
      this.newDescription
    );
    this.newDescription = {};
  }

  deleteStep(index: number): void {
    this.descriptions.splice(index, 1);
  }

  // When user selects edit option
  editStep(id: number): void {
    this.newDescription.Value = this.descriptions[id].Value;
    this.updatedDescription = id;
    this.isForUpdate = true;
  }


  // when user clicks on update button to submit updated value
  updateStep(): void {
    const data = this.updatedDescription;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.descriptions.length; i++) {
      if (i === data) {
        this.descriptions[i].Value = this.newDescription.Value;
      }
    }
    this.isForUpdate = false;
    this.newDescription = {};
  }
  onSubmit(): void {
    console.log(this.descriptions);

  }


}
