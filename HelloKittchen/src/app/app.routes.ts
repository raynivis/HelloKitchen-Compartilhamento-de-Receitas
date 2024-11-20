import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { NewsComponent } from './layout/pages/news/news.component';
import { CooksComponent } from './layout/pages/cooks/cooks.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'cooks', component: CooksComponent}
];
