import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../Shared/Material Module/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule,CommonModule,RouterModule,NavbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  sidenavOpened = true;


  navigationItems: any[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Patients',
      icon: 'people',
      route: '/patients'
    },
    {
      label: 'Calls',
      icon: 'phone',
      route: '/calls'
    },
    {
      label: 'Protocols',
      icon: 'description',
      route: '/protocols'
    },
    {
      label: 'Assessments',
      icon: 'assignment',
      route: '/assessments',
      active: true
    },
    {
      label: 'Staff',
      icon: 'favorite',
      route: '/staff'
    }
  ];

  onNavigationClick(item: any): void {
    // Reset all active states
    this.navigationItems.forEach(nav => nav.active = false);
    // Set clicked item as active
    item.active = true;
    
    console.log('Navigating to:', item.route);
    // Add your navigation logic here
    // this.router.navigate([item.route]);
  }


   toggleSidenav(): void {
    this.sidenav.toggle();
  }

  closeSidenav(): void {
    if (window.innerWidth < 768) {
      this.sidenav.close();
    }
  }

}
