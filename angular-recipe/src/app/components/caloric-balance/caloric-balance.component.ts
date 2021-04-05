import { Ingredient } from './../../common/ingredient';
import { UserDiet } from './../../common/userdiet';
import { DietsService } from './../../services/diet.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { UserDetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-caloric-balance',
  templateUrl: './caloric-balance.component.html',
  styleUrls: ['./caloric-balance.component.css']
})
export class CaloricBalanceComponent implements OnInit {

  currentUser: any;
  user: User = new User();
  tempIA: UserDiet[] = new Array();

  procCalories = 0;
  procFat = 0;
  procProteins = 0;
  procCarbs = 0;

  temporary = 0;
  totalCalories = 0;
  totalProteins = 0;
  totalFat = 0;
  totalCarbs = 0;
  productCalories = 0;
  productProteins = 0;
  productFat = 0;
  productCarbs = 0;
  grams = 0;
  caloricValue = 0;
  proteins = 0;
  fat = 0;
  carbs = 0;
  tempArray = new Array();
  ingredient = new Array();

  constructor(
    private token: TokenStorageService,
    private userDetials: UserDetailsService,
    private dietService: DietsService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getUserInfo();
    this.getRecipeIngredientsAmount();
  }

  getUserInfo(): void {
    this.userDetials
      .getUserDetials(this.currentUser.username)
      .subscribe((data) => {
        this.user = data;
      });
  }

  // tslint:disable-next-line: typedef
  getRecipeIngredientsAmount() {
    this.dietService.getAmountIngredients(this.currentUser.id).subscribe((data) => {
      data.sort((a: UserDiet, b: UserDiet) =>
        a.id > b.id ? 1 : -1
      );
      this.tempIA = data;
      this.tempIA.forEach((amount) =>
        // tslint:disable-next-line: no-shadowed-variable
        this.dietService.getIngredient(amount.id).subscribe((ingredient) => {
          this.dietService.getDietIngredientId(amount.id, ingredient.id).subscribe((userDietPack) => {
            this.tempArray.push(userDietPack);
            this.calculate(userDietPack.ingredient, userDietPack.diet);
            this.procCalories = Math.round((this.totalCalories / this.user.calories) * 100);
            this.procProteins = Math.round((this.totalProteins / this.user.proteins) * 100);
            this.procFat = Math.round((this.totalFat / this.user.fat) * 100);
            this.procCarbs = Math.round((this.totalCarbs / this.user.carbohydrates) * 100);
          });
        })
      );
    });
  }

  // tslint:disable-next-line: typedef
  calculate(temp: Ingredient, amount: UserDiet) {
    this.grams = this.toGrams(amount);
    this.temporary = (amount.amount * this.grams);
    this.temporary = this.temporary / 100;
    this.totalCalories = this.totalCalories + (this.temporary * temp.calories);
    this.totalCalories = Math.round(this.totalCalories);
    this.totalCarbs = this.totalCarbs + (this.temporary * temp.carbohydrates);
    this.totalCarbs = Math.round(this.totalCarbs);
    this.totalFat = this.totalFat + (this.temporary * temp.fat);
    this.totalFat = Math.round(this.totalFat);
    this.totalProteins = this.totalProteins + (this.temporary * temp.proteins);
    this.totalProteins = Math.round(this.totalProteins);
  }

  // tslint:disable-next-line: typedef
  toGrams(amount) {
    if (amount.unit.includes('łyżeczka')
      || amount.unit.includes('łyżeczki')
      || amount.unit.includes('łyżeczek')) {
      return 5;
    }
    else if (amount.unit.includes('łyżka')
      || amount.unit.includes('łyżki')
      || amount.unit.includes('łyżek')
    ) {
      return 15;
    }
    else if (amount.unit.includes('ząb')
    ) {
      return 5;
    }
    else if (amount.unit.includes('szklan')
    ) {
      return 250;
    }
    else if (amount.unit.includes('szczypt')
    ) {
      return 1;
    }
    else if (amount.unit.includes('pęcz')
    ) {
      return 25;
    }
    else if (amount.unit.includes('kg')
    ) {
      return 1000;
    }
    else if (amount.unit.includes('dag')
    ) {
      return 10;
    }
    else if (amount.unit.includes('g')
    ) {
      return 1;
    }
    else if (amount.unit.includes('ml')
    ) {
      return 1;
    }
    else if (amount.unit.includes('l')
    ) {
      return 1000;
    }
  }

  deleteUserDiet(userDietId): void {
    this.dietService.deleteDiet(userDietId).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log(error);
      });
    window.location.reload();
  }

  deleteAll(): void {
    this.tempArray.forEach((diet) =>
      this.dietService.deleteDiet(diet.diet.id).subscribe(response => {
        console.log(response);
      },
        error => {
          console.log(error);
        })
    );
    window.location.reload();
  }
}
