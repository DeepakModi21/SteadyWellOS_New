import { Component } from '@angular/core';
import { MaterialModule } from '../../../Shared/Material Module/material.module';
import { TableComponent } from '../../../Shared/pages/table/table.component';
import { CardLayoutComponent } from '../card-layout/card-layout.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule,TableComponent,CardLayoutComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
