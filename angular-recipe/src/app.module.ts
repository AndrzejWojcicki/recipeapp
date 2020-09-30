import { RecipeService } from './app/services/recipe.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { RecipeListComponent } from './app/components/recipe-list/recipe-list.component';
import { CategoryListComponent } from './app/components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFountComponent } from './app/components/page-not-fount/page-not-fount.component';
import { SearchComponent } from './app/components/search/search.component';
import { RecipeDetailsComponent } from './app/components/recipe-details/recipe-details.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  {path: 'przepisy/:id', component: RecipeDetailsComponent},
  {path: 'przepisy', component: RecipeListComponent},
  {path: 'szukaj/:keyword', component: RecipeListComponent},
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
    SearchComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    JwPaginationModule,
    NgbPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
