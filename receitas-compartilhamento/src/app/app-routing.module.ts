import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ListaReceitasComponent } from './pages/lista-receitas/lista-receitas.component';
import { DetalhesReceitaComponent } from './pages/detalhes-receita/detalhes-receita.component';
import { GerenciarLivrosComponent } from './pages/gerenciar-livros/gerenciar-livros.component';
import { BooksComponent } from './pages/books/books.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'receitas', component: ListaReceitasComponent },
  { path: 'receitas/:id', component: DetalhesReceitaComponent },
  { path: 'books/:bookId/recipes', component: BooksComponent },
  { path: 'home', component: HomeComponent },
  { path: 'livros', component: GerenciarLivrosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
