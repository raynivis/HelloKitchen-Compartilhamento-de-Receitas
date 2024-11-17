import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideRouter(routes),
    {
      provide: 'APP_INITIALIZER',
      useFactory: (authService: AuthService) => () => authService.checkAuthentication(),
      deps: [AuthService],
      multi: true,
    },]
};
