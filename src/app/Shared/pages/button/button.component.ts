import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';

export interface ButtonStyle {
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  border?: string;
  cursor?: string;
  borderColor?: string;
  boxShadow?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  transition?: string;
  borderWidth?: string;
  boderRadius?: string;
  textDecoration?: string;
  textTransform?: string;
  width?: string;
  height?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  margin?: string;
  flex?: string;  
  position?: string;
  top?: string;
  borderStyle?: string;
}




@Component({
  selector: 'app-button',
  imports: [MaterialModule,CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() buttonText: string = 'Click Me!';

  @Output() onClick:EventEmitter<void> = new EventEmitter<void>();

  @Input() icon: string = '';

   @Input() Style: ButtonStyle = {
  backgroundColor: '#284B5F',
  color: 'white',
  borderRadius: '5px',
  padding: '10px 20px',
  fontFamily: 'Optima',
  fontWeight: '400',
 fontStyle: 'Normal',
  fontSize: '18px',
  boderRadius:'8px',
  borderColor: '#284B5F',
  borderStyle: 'solid',
};

  @Input() disabled: boolean = false;


  onButtonClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }

}
