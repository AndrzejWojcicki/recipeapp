import { RecipeService } from './app/services/recipe.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app/app.component';
import { RecipeListComponent } from './app/components/recipe-list/recipe-list.component';
import { CategoryListComponent } from './app/components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFountComponent } from './app/components/page-not-fount/page-not-fount.component';
import { SearchComponent } from './app/components/search/search.component';
import { RecipeDetailsComponent } from './app/components/recipe-details/recipe-details.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './app/components/homepage/homepage.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { ProfileComponent } from './app/components/profile/profile.component';

import { authInterceptorProviders } from './app/helpers/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from './app/components/profile/edit-profile/edit-profile.component';
import { MyRecipesComponent } from './app/components/profile/my-recipes/my-recipes/my-recipes.component';
import { AddRecipeComponent } from './app/components/profile/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './app/components/profile/my-recipes/edit-recipe/edit-recipe.component';
import { AddIngredientsComponent } from './app/components/profile/add-recipe/add-ingredients/add-ingredients.component';
import { AddStepsComponent } from './app/components/profile/add-recipe/add-steps/add-steps.component';
import { EditIngredientsComponent } from './app/components/profile/my-recipes/edit-recipe/edit-ingredients/edit-ingredients.component';
import { EditStepComponent } from './app/components/profile/my-recipes/edit-recipe/edit-step/edit-step.component';
import { AddStepComponent } from './app/components/profile/add-step/add-step.component';
import { IngredientsResultComponent } from './app/components/profile/add-recipe/add-ingredients/ingredients-result/ingredients-result.component';
import { AddIngredientToDatabaseComponent } from './app/components/profile/add-recipe/add-ingredients/ingredients-result/add-ingredient-to-database/add-ingredient-to-database.component';
import { EditStepsComponent } from './app/components/profile/my-recipes/edit-recipe/edit-steps/edit-steps.component';

const routes: Routes = [
  { path: 'przepisy/:id', component: RecipeDetailsComponent },
  { path: 'przepisy', component: HomepageComponent },
  { path: 'zaloguj', component: LoginComponent },
  { path: 'zarejestruj', component: RegisterComponent },
  { path: 'profil/mojeprzepisy/edytuj/skladnik/:id/przepis/:recipeId', component: EditIngredientsComponent },
  { path: 'profil/mojeprzepisy/edytuj/kroki/:id/przepis/:recipeId', component: EditStepComponent },
  { path: 'profil/mojeprzepisy/edytuj/:id', component: EditRecipeComponent },
  { path: 'profil/dodajskladnik/:id/searchIngredient/:searchName', component: IngredientsResultComponent },
  { path: 'profil/dodajskladnik/:id', component: AddIngredientsComponent },
  { path: 'profil/dodajprodukt', component: AddIngredientToDatabaseComponent },
  { path: 'profil/dodajkrok/:id', component: AddStepComponent },
  { path: 'profil/dodajkroki/:id', component: AddStepsComponent },
  { path: 'profil/edytujkroki/:id', component: EditStepsComponent },
  { path: 'profil/edit/:id', component: EditProfileComponent },
  { path: 'profil/dodajprzepis', component: AddRecipeComponent },
  { path: 'profil/mojeprzepisy', component: MyRecipesComponent },
  { path: 'profil', component: ProfileComponent },
  { path: 'szukaj/:keyword', component: RecipeListComponent },
  { path: 'kategoria/:id', component: RecipeListComponent },
  { path: '', redirectTo: '/przepisy', pathMatch: 'full' },
  { path: '**', component: PageNotFountComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    CategoryListComponent,
    PageNotFountComponent,
    SearchComponent,
    RecipeDetailsComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditProfileComponent,
    MyRecipesComponent,
    AddRecipeComponent,
    AddIngredientsComponent,
    EditRecipeComponent,
    AddStepsComponent,
    EditIngredientsComponent,
    EditStepComponent,
    AddStepComponent,
    IngredientsResultComponent,
    AddIngredientToDatabaseComponent,
    EditStepsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    JwPaginationModule,
    NgbPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    DragDropModule
  ],
  providers: [RecipeService, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
