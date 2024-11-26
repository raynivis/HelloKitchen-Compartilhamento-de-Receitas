import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { NewsComponent } from './layout/pages/news/news.component';
import { CooksComponent } from './layout/pages/cooks/cooks.component';
import { CooksPageComponent } from './layout/pages/cooks/cooks-page/cooks-page.component';
import { BooksComponent } from './layout/pages/books/books.component';
import { BooksPageComponent } from './layout/pages/books/books-page/books-page.component';
import { AboutComponent } from './layout/pages/about/about.component';
import { CooksDetailsComponent} from './layout/pages/cooks/cooks-details/cooks-details.component'
import { CookPostComponent } from './layout/pages/cooks/cook-post/cook-post.component';
import { MyrecipesComponent } from './layout/pages/myrecipes/myrecipes.component';
import { NoPageComponent } from './layout/pages/no-page/no-page.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'cooks', component: CooksComponent},
  {path: 'cooks/post', component: CookPostComponent },
  {path: 'cooks/:id', component: CooksDetailsComponent },
  {path: 'categoria/:id', component: CooksPageComponent}, //vai ter o id da categoria
  {path: 'books', component: BooksComponent},
  {path: 'book/:id', component: BooksPageComponent}, //vai ter o id do livro
  {path: 'about', component: AboutComponent},
  {path: 'my-recipes', component: MyrecipesComponent},
  {path: 'opss', component: NoPageComponent},


  //sempre por ultimo
  { path: '**', component: NoPageComponent}
];
