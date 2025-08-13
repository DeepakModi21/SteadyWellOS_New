import { Routes } from '@angular/router';
import { LoginComponent } from './Features/Components/login/login.component';
import { ResetPasswordComponent } from './Features/Components/reset-password/reset-password.component';
import { SidebarComponent } from './Features/Components/sidebar/sidebar.component';
import { authGuard } from './Core/Guards/auth-guard.guard';
import { DashboardComponent } from './Features/Components/dashboard/dashboard.component';


export const routes: Routes = [
     {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path:'login',component: LoginComponent},
    {path:'reset_password',component:ResetPasswordComponent},    
    {path:'portal',component:SidebarComponent,canActivate:[authGuard],
        children:[
            {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]}
        ]
    },

    // {path:'forgot_password', loadComponent: () => import('./Features/components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)},

    // {path:'dashboard',component:DashboardComponent, canActivate: [authGuard],data: { roles: ['ADMIN', 'NURSE'] }},
    // {path:'patients',component:PatientsComponent, canActivate: [authGuard]},
    // {path:'physician',component:PhysicianComponent, canActivate: [authGuard]},
    // {path:'admin_users',component:AdminUsersComponent,canActivate: [authGuard],data: { roles: ['ADMIN'] }},
    // {path:'calls',component:CallsComponent,},
    // {path:'assessments',component:AssessmentsComponent},
    // {path:'calls',component:CallsComponent, canActivate: [authGuard]},
    // {path:'assessments',component:AssessmentsComponent, canActivate: [authGuard]},
    // {path:'change_password',component:ChangePasswordComponent, canActivate:[authGuard]},
    // {path:'user_profile',component:UserProfileComponent,canActivate:[authGuard]},
    
    // {path:'schedule-calls',component:ScheduleCallComponent,canActivate:[authGuard]},
    // {path:'call-details',component:CallDetailsComponent,canActivate:[authGuard]},
];
