import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-selector',
  imports: [MaterialModule,CommonModule,ReactiveFormsModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent {

  @Input() options: Array<{ label: string, value: string }>=[];

  @Input() label: string = 'Select an option';

  @Input()multiSelect:boolean=false;

  @Input() placeholder: string = 'Choose...';

  @Input()FormControl:FormControl = new FormControl();

}
