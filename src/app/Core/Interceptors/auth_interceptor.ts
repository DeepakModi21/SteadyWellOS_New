import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../Features/services/AuthSer/auth.service';
import { AuthResponse } from '../interfaces/auth_interface';
import { LoaderService } from '../../Shared/services/loader.service';
// import { LoaderService } from '../services/loader.service'; // Make sure the path is correct


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService); // Inject the loader service

  // Check if 'skip-auth' header is set to true
  const shouldSkipAuth = req.headers.get('skip-auth') === 'true';

  // Clean the 'skip-auth' header before sending
  let modifiedReq = req.clone({
    headers: req.headers.delete('skip-auth')
  });

  // Add auth and ngrok headers only if not skipping auth
  if (!shouldSkipAuth) {
    const token = cookieService.get('access_token');

    modifiedReq = modifiedReq.clone({
      setHeaders: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'ngrok-skip-browser-warning': 'true'
      }
    });
  }

  // 👉 Show loader before request is sent
  loaderService.show();

  // Handle request and refresh token on 401
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 token refresh logic if needed
      return throwError(() => error);
    }),
    finalize(() => {
      // 👉 Hide loader when request completes or errors
      loaderService.hide();
    })
  );
};
