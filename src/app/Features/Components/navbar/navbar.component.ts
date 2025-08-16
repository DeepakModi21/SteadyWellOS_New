import { Component } from '@angular/core';
import { MaterialModule } from '../../../Shared/Material Module/material.module';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';


import { User } from '../../../Core/interfaces/auth_interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthSer/auth.service';

import { userConfirmationComponent } from '../../../Shared/Dialogs/userConfirmation/userConfirmation.component';



@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // loading: boolean = false;
  
  constructor(
    private router: Router,
    private cookieser: CookieService,
    private authser: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  LoggedInUser: User | null = null;

  ngOnInit() {
    const user = this.cookieser.get('user');

    if (user) {
      this.LoggedInUser = JSON.parse(user) as User;
    }
  }


    isToggleOn = true;

  onToggleChange(event: any) {
    this.isToggleOn = event.checked;
    console.log('Toggle state:', this.isToggleOn);
  }


  onLogout() {
    this.dialog
      .open(userConfirmationComponent, {
    data: {
  title: 'Logout Confirmation',
  message: 'Are you sure you want to log out?',
  icon: 'logout', // You can also use 'exit_to_app' depending on your design
  iconColor: 'red',
  
  showCancelButton: true,
  cancelButtonStyle: { backgroundColor: 'white', color: '#1A202C', borderColor: '#1A202C',borderStyle:'solid',borderRadius:'8px' },
  cancelButtonText: 'Cancel',

  showOkayButton: true,
  okayButtonStyle: { backgroundColor: '#E53E3E',borderRadius:'8px' },
  okayButtonText: 'Logout'
},

        width: '320px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {

          let payload: any = {
            access_token: this.cookieser.get('access_token'),
          };

          this.authser.Logout(payload).subscribe({
            next: () => {
              this.cookieser.delete('access_token');
              this.cookieser.delete('refresh_token');
              this.cookieser.delete('user');
              this.router.navigate(['/login']);

            },
            error: (err) => {
              this.toastr.error(err.error.error, 'Error');

            },
          });
        }
      });
  }

  getInitials(name: string): string {
    if (!name) return 'U';

    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }



  ViewProfile()
  {
    this.router.navigate(['/user_profile'])
  }
}
