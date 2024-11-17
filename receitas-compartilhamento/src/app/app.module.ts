import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import * as http from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ListaReceitasComponent } from './pages/lista-receitas/lista-receitas.component';
import { DetalhesReceitaComponent } from './pages/detalhes-receita/detalhes-receita.component';
import { GerenciarLivrosComponent } from './pages/gerenciar-livros/gerenciar-livros.component';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    ListaReceitasComponent,
    DetalhesReceitaComponent,
    GerenciarLivrosComponent,
    HomeComponent,
    BooksComponent
  ],
  imports: [
    http.HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
