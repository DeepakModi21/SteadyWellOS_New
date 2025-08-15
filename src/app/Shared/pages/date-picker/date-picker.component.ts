import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {

  @Input()minDate: Date = new Date(new Date().setHours(0, 0, 0, 0));

   @Input()maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));

   @Input()FormControl=new FormControl();

   @Input() label:string='';

}
