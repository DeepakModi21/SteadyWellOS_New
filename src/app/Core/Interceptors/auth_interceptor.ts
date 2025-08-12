import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../Features/services/AuthSer/auth.service';
import { AuthResponse } from '../interfaces/auth_interface';


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);

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

  // Handle request and refresh token on 401
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
//       if (error.status === 401) {
//       return authService.refreshAccessToken().pipe(
//   switchMap((res: AuthResponse) => {
//     const newToken = res.access_token; // or res.token depending on your API
     
//     cookieService.set('access_token', res.access_token, res.expires_in / 3600, '/', '', true, 'Strict');
//   cookieService.set('refresh_token', res.refresh_token, 7, '/', '', true, 'Strict'); // 7 days


//     const retryReq = req.clone({
//       setHeaders: { Authorization: `Bearer ${newToken}` }
//     });

//     return next(retryReq);
//   })
// );
//       }
      return throwError(() => error);
    })
  );
};
