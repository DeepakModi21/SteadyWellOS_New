import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appEmailMask]',
  host: {
    '[attr.mask]': "'A*@A*.A*'",
    '[attr.suffix]': "''",
    '[attr.prefix]': "''",
    '[attr.dropSpecialCharacters]': 'false',
    '[attr.hiddenInput]': 'false'
  }
})
export class EmailMaskDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Set mask attributes dynamically if needed
    this.renderer.setAttribute(this.el.nativeElement, 'mask', 'A*@A*.A*');
    this.renderer.setAttribute(this.el.nativeElement, 'dropSpecialCharacters', 'false');
  }
}
