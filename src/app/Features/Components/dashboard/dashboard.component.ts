import { Component } from '@angular/core';
import { MaterialModule } from '../../../Shared/Material Module/material.module';
import { TableComponent } from '../../../Shared/pages/table/table.component';


@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule,TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
