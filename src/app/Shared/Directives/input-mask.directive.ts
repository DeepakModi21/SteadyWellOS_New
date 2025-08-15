import { AfterViewInit, Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[appInputMask]'
})


export class InputMaskDirective implements AfterViewInit {

   constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const input = this.el.nativeElement.querySelector('input');

    if (input) {
      input.addEventListener('input', () => {
        const digits = input.value.replace(/\D/g, '').slice(0, 10);
        let formatted = digits;

        if (digits.length > 6) {
          formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
        } else if (digits.length > 3) {
          formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
        }

        input.value = formatted;
      });
    }
  }

}
