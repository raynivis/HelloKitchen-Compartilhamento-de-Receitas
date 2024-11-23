import type { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const hwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const user = authService.getUser();
  if (!user || !user.access_token) {
    return next(req);
  }

  const modified = req.clone({
    setHeaders: {
      Authorization: `${user.token_type} ${user.access_token}`,
    },
  });
  return next(modified);
};
