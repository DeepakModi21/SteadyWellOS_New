import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-layout',
   standalone: true, 
  imports: [CommonModule],
  templateUrl: './card-layout.component.html',
  styleUrl: './card-layout.component.scss'
})

export class CardLayoutComponent {
 @Input() heading: string = '';
  @Input() number: number | string = '';
  @Input() status: string = '';
   @Input() numberBgColor: string = '#007AFF';
    @Input() gradientStart: string = '#E6F2FF';
  @Input() gradientEnd: string = 'rgba(229, 242, 255, 0)';

  /** Default gradient from Figma */
  @Input() gradientColors: [string, string] = ['#E6F2FF', 'rgba(229, 242, 255, 0)'];

  /** Computed gradient style */
  get gradientStyle() {
    return {
      background: `linear-gradient(180deg, ${this.gradientColors[0]} 0%, ${this.gradientColors[1]} 100%)`
    };
  }

   get numberStyle() {
    return {
       color: this.numberBgColor
    };
  }


   @Input() numberColor!: string;       // Dynamic number color
     // Dynamic gradient end

getGradientStyle() {
  return {
    background: `linear-gradient(90deg, ${this.gradientStart} 0%, ${this.gradientEnd} 100%)`
  };
}


}
