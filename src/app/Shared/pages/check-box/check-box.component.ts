import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  imports: [MaterialModule,CommonModule,ReactiveFormsModule],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss'
})
export class CheckBoxComponent {

  @Input() label: string = '';
  @Input()FormControl:FormControl = new FormControl();

  updateCheck(checked: boolean) {
    // this.FormControl.setValue(checked);


  }

}
