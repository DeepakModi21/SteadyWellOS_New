import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../Shared/Material Module/material.module';
import { TableComponent } from '../../../Shared/pages/table/table.component';
import { CardLayoutComponent } from '../card-layout/card-layout.component';
import { CommonModule } from '@angular/common';
import { UrgentFollowUpsComponent } from '../urgent-follow-ups/urgent-follow-ups.component';
import { RecentActivityComponent } from '../../../Shared/pages/recent-activity/recent-activity.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { MatDialog } from '@angular/material/dialog';
import { AddUsersComponent } from '../../../Shared/Dialogs/add-users/add-users.component';
import { SelectorComponent } from '../../../Shared/pages/selector/selector.component';


@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule,TableComponent,CardLayoutComponent,CommonModule,UrgentFollowUpsComponent,RecentActivityComponent, PieChartComponent,SelectorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  RecentActivities = [
  {
    name: 'Robert Kim',
    message: 'Uploaded patient records to the secure portal',
    time: '10:30AM',
    date: 'Today',
    icon: 'add_alert',
    type: 'success'
  },
  {
    name: 'Emma Watson',
    message: 'Uploaded patient records to the secure portal.',
    time: '09:15AM',
    date: 'Today',
    icon: 'add_alert',
    type: 'info'
  },
  {
    name: 'David Lee',
    message: 'Updated appointment details for John Doe.',
    time: '04:45PM',
    date: 'Yesterday',
    icon: 'add_alert',
    type: 'warning'
  },
  {
    name: 'Sophia Johnson',
    message: 'Sent prescription details to the pharmacy.',
    time: '12:05PM',
    date: 'Today',
    icon: 'add_alert',
    type: 'success'
  },
  {
    name: 'Michael Brown',
    message: 'Cancelled follow-up appointment for patient #A234.',
    time: '11:20AM',
    date: 'Yesterday',
    icon: 'add_alert',
    type: 'error'
  },
  {
    name: 'Isabella Garcia',
    message: 'Shared lab test results with Dr. Smith.',
    time: '03:40PM',
    date: 'Today',
    icon: 'add_alert',
    type: 'info'
  }
];

private Dialog=inject(MatDialog);

ngOnInit()
{
   this.Dialog.open(AddUsersComponent,{
    data: {
      Title: 'Add User Information',
      sub_title: 'Begin by selecting user type.',
    },
    maxWidth: '900px',
    height: 'auto',
    panelClass: 'custom-dialog-container'
   })
}


}
