import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-input',
  imports: [MaterialModule,ReactiveFormsModule,CommonModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() placeholder?: string | undefined;
  @Input() type: string = 'text';
  @Input()FormControl:FormControl=new FormControl('');

}
