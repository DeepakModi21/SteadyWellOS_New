import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../Core/enviroments/env';
import {
  AuthResponse,
  LoginPayload,
} from '../../../Core/interfaces/auth_interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // Check if user is already logged in on service initialization
    this.loadUserFromCookie();
  }

  private baseUrl = environment.baseUrl;

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}auth/login`, payload, {
      headers: new HttpHeaders({
        'skip-auth': 'true',
      }),
    });
  }

  changePassword(
    userId: number,
    passwordValues: {
      old_password: string;
      new_password: string;
      confirm_password: string;
    }
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}users/change-password/${userId}`,
      passwordValues
    );
  }

  Logout(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/logout`, payload);
  }

  refreshAccessToken() {
    const refreshToken = this.cookieService.get('refresh_token'); // Or from localStorage

    return this.http.post<AuthResponse>(
      `${this.baseUrl}auth/refresh`,
      {},
      {
        headers: new HttpHeaders({
          'skip-auth': 'true',
          'x-refresh-token': `Bearer ${refreshToken}`, // Now it is sent as Bearer
        }),
      }
    );
  }

  // New methods for role management
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }

  hasRole(requiredRoles: string[]): boolean {
    const userRole = this.getUserRole();
    if (!userRole) return false;

    // Extract role from "UserRole.NURSE" format
    const role = userRole.split('.')[1];
    return requiredRoles.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole(['ADMIN']);
  }

  isNurse(): boolean {
    return this.hasRole(['NURSE']);
  }

  isAdminOrNurse(): boolean {
    return this.hasRole(['ADMIN', 'NURSE']);
  }

  private loadUserFromCookie(): void {
    const userData = this.cookieService.get('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.setCurrentUser(user);
      } catch (error) {
        // console.error('Error parsing user data from cookie:', error);
      }
    }
  }

  clearUserData(): void {
    this.currentUserSubject.next(null);
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    this.cookieService.delete('user');
  }
}
