import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-date-range',
  imports: [MaterialModule,CommonModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
  providers:[provideNativeDateAdapter()]
})
export class DateRangeComponent {

  today = new Date();

  @Input()minDate: Date = new Date(new Date().setHours(0, 0, 0, 0));

   @Input()maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));


  ngOnInit()
  {
    console.log("min date is",this.minDate);
  }


  
}
