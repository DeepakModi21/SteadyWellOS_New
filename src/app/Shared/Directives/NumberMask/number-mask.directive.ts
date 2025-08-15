import { Directive } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';

@Directive({
  selector: '[appNumberMask]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgxMaskDirective,
      inputs: ['mask', 'dropSpecialCharacters', 'prefix']
    }
  ]
})
export class NumberMaskDirective {
  constructor(private mask: NgxMaskDirective) {

    // this.mask.mask = '00-00';
    // this.mask.dropSpecialCharacters = true;
    // this.mask.prefix = '';
  }
}
