import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const token = cookieService.get('access_token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const isTokenExpired = (jwt: string): boolean => {
    try {
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (err) {
      return true; // if invalid token, treat as expired
    }
  };

  if (isTokenExpired(token)) {
    // console.warn('Token expired, redirecting to login');
    cookieService.delete('access_token');
    router.navigate(['/login']);
    return false;
  }

 const requiredRoles = route.data?.['roles'] as string[];
  
  if (requiredRoles && requiredRoles.length > 0) {
    const userData = cookieService.get('user');
    
    if (!userData) {
      toastr.error('User data not found', 'Access Denied');
      router.navigate(['/login']);
      return false;
    }

    try {
      const user = JSON.parse(userData);
      const userRole = user.role;
      
      if (!userRole) {
        toastr.error('User role not found', 'Access Denied');
        router.navigate(['/unauthorized']);
        return false;
      }

      // Extract role from "UserRole.NURSE" format
      const role = userRole.split('.')[1];
      
      if (!requiredRoles.includes(role)) {
        toastr.error('You do not have permission to access this page', 'Access Denied');
        router.navigate(['/unauthorized']);
        return false;
      }
    } catch (error) {
      // console.error('Error parsing user data:', error);
      toastr.error('Invalid user data', 'Access Denied');
      router.navigate(['/login']);
      return false;
    }
  }

  return true;







  
};
