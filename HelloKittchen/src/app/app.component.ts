import { Component, inject } from '@angular/core';
import { RouterOutlet, ROUTES, Routes } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LeftBarComponent } from "./layout/left-bar/left-bar.component";
import { HomeComponent } from "./layout/pages/home/home.component";
import { RightBarComponent } from "./layout/right-bar/right-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, LeftBarComponent, RouterOutlet, RightBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title="HelloKittchen";
}
