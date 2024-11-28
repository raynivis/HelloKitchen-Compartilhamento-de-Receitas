import { RecipeComponent } from './layout/pages/recipes/recipe/recipe.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { NewsComponent } from './layout/pages/news/news.component';
import { CategoriaComponent } from './layout/pages/cooks/categoria.component';
import { CategoriaPageComponent } from './layout/pages/cooks/categoria-page/categoria-page.component';
import { BooksComponent } from './layout/pages/books/books.component';
import { BooksPageComponent } from './layout/pages/books/books-page/books-page.component';
import { AboutComponent } from './layout/pages/about/about.component';
import { ReceitaPostComponent } from './layout/pages/recipes/recipe/recipes-post/recipes-post.component';
import { MyrecipesComponent } from './layout/pages/myrecipes/myrecipes.component';
import { NoPageComponent } from './layout/pages/no-page/no-page.component';
import {EditRecipeComponent} from './layout/pages/recipes/recipe/edit-recipe/edit-recipe.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'recipes', component: CategoriaComponent},
  {path: 'recipe/post', component: ReceitaPostComponent },
  {path: 'recipe/:id', component: RecipeComponent },
  {path: 'recipe/editar/:id', component: EditRecipeComponent },
  {path: 'categoria/:id', component: CategoriaPageComponent}, //vai ter o id da categoria
  {path: 'books', component: BooksComponent},
  {path: 'book/:id', component: BooksPageComponent}, //vai ter o id do livro
  {path: 'about', component: AboutComponent},
  {path: 'my-recipes', component: MyrecipesComponent},
  {path: 'opss', component: NoPageComponent},


  //sempre por ultimo
  { path: '**', component: NoPageComponent}
];
