import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { NewsComponent } from './layout/pages/news/news.component';
import { CooksComponent } from './layout/pages/cooks/cooks.component';
import { CooksPageComponent } from './layout/pages/cooks/cooks-page/cooks-page.component';
import { BooksComponent } from './layout/pages/books/books.component';
import { BooksPageComponent } from './layout/pages/books/books-page/books-page.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'cooks', component: CooksComponent},
  {path: 'categoria', component: CooksPageComponent}, //vai ter o id da categoria
  {path: 'books', component: BooksComponent},
  {path: 'book', component: BooksPageComponent}, //vai ter o id do livro
];
