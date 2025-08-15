import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-buttons',
  imports: [FormsModule,ReactiveFormsModule,MaterialModule,CommonModule],
  templateUrl: './radio-buttons.component.html',
  styleUrl: './radio-buttons.component.scss'
})
export class RadioButtonsComponent implements OnChanges {

  @Input()FormControl:FormControl=new FormControl();

@Output() valueChanges = new EventEmitter<{ selectedValue: string }>();


  @Input()DefaultValue:string='';

  @Input()RaddioGroups:Array<{
    label:string,
    value:string,
  }>=[];


 ngOnChanges(changes:SimpleChanges)
 {
     if(changes['DefaultValue'])
     {
        if(this.DefaultValue)
        {
          this.FormControl.patchValue(this.DefaultValue.toLowerCase());
          this.valueChanges.emit({
            selectedValue:this.FormControl.value
        })
        }
     }
 }

 onRadioChange(Event:Event)
 {
    this.valueChanges.emit({
      selectedValue:this.FormControl.value
    })
 }

 

}
