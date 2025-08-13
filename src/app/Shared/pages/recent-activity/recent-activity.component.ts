import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-activity',
  imports: [MaterialModule,CommonModule],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss'
})
export class RecentActivityComponent {

 @Input() name: string = '';
  @Input() message: string = '';
  @Input() time: string = '';
  @Input() date: string = '';
  @Input() icon: string = 'notifications'; // Default icon
  @Input() activityType: string = 'default';

}
