import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../Shared/Material Module/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenav } from '@angular/material/sidenav';
import { LoaderComponent } from '../../../Shared/pages/loader/loader/loader.component';
import { LoaderService } from '../../../Shared/services/loader.service';




@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule,CommonModule,RouterModule,NavbarComponent,LoaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  sidenavOpened = true;

  Loading:boolean=false;


  navigationItems: any[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      active:true
    },
    {
      label: 'Patients',
      icon: 'people',
      route: '/patients',
      active:false
    },
    {
      label: 'Calls',
      icon: 'phone',
      route: '/calls',
      active:false
    },
    {
      label: 'Protocols',
      icon: 'description',
      route: '/protocols',
      active:false
    },
    {
      label: 'Assessments',
      icon: 'assignment',
      route: '/assessments',
      active: false
    },
    {
      label: 'Staff',
      icon: 'favorite',
      route: '/staff',
      active:false
    }
  ];

  ngOnInit()
  {
    this.loaderser.isLoading$.subscribe((res:boolean)=>
    {
      this.Loading=res;
    })
  }

  constructor(private loaderser:LoaderService){}

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
      this.sidenavOpened = !this.sidenavOpened;
  }

  closeSidenav(): void {
    if (window.innerWidth < 768) {
      // this.sidenav.close();
    }
  }

}
