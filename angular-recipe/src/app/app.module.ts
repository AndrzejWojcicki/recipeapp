import { RecipeService } from './services/recipe.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { CategoryListComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFountComponent } from './components/page-not-fount/page-not-fount.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'przepisy', component: RecipeListComponent},
  {path: 'kategoria/:id', component: RecipeListComponent},
  {path: '', redirectTo: '/przepisy', pathMatch: 'full'},
  {path: '**', component: PageNotFountComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    CategoryListComponent,
    PageNotFountComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
