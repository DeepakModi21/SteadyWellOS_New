import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'app-card-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss']
})
export class CardLayoutComponent {
  @Input() heading: string = '';
  @Input() number!: number;
  @Input() status: string = '';
  @Input() numberBgColor: string = '#007AFF';
  @Input() numberColor!: string;
 
  // Gradient colors
  @Input() gradientStart: string = '#E6F2FF';
  @Input() gradientEnd: string = 'rgba(229, 242, 255, 0)';
 
  // For the number text
  get numberStyle() {
    return { color: this.numberBgColor };
  }
 
  // For gradient background
  getGradientStyle() {
    return {
      background: `linear-gradient(90deg, ${this.gradientStart} 0%, ${this.gradientEnd} 100%)`
    };
  }
}
 
 
