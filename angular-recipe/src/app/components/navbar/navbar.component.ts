import { Component, OnInit } from '@angular/core';
import { RecipeCategory } from 'src/app/common/recipe-Category';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: RecipeCategory[];

  // tslint:disable-next-line: variable-name
  constructor(private _categoryService: RecipeService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  // tslint:disable-next-line: typedef
  listCategories(){
    this._categoryService.getRecipeCategory().subscribe(
      data => this.categories = data
    );
  }

}
