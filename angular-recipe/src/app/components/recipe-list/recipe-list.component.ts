import { Recipe } from './../../common/recipe';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  // templateUrl: './recipe-list.component.html',
  templateUrl: './recipe-grid.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  currentCategoryId: number;
  searchMode: boolean;

  // tslint:disable-next-line: variable-name
  constructor(private _recipeService: RecipeService,
              // tslint:disable-next-line: variable-name
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listRecipes();
    });
  }

  // tslint:disable-next-line: typedef
  listRecipes(){
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchRecipes();
    }else {
      this.handleListRecipes();
    }
  }

  // tslint:disable-next-line: typedef
  isEasy(difficulty: number){
      if (difficulty === 1){
        return true;
      }
      return false;
  }

  // tslint:disable-next-line: typedef
  isMedium(difficulty: number){
    if (difficulty === 2){
      return true;
    }
    return false;
}

// tslint:disable-next-line: typedef
isHard(difficulty: number){
  if (difficulty === 3){
    return true;
  }
  return false;
}

// tslint:disable-next-line: typedef
handleListRecipes() {
  const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
  if (hasCategoryId){
    this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
  } else {
    this.currentCategoryId = 1;
  }

  this._recipeService.getRecipes(this.currentCategoryId).subscribe(
    data => this.recipes = data
  );
}

// tslint:disable-next-line: typedef
handleSearchRecipes() {
  const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
  this._recipeService.searchRecipes(keyword).subscribe(
    data => {
      this.recipes = data;
    }
  );
}
}
