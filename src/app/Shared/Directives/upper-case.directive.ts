import { Directive, Input } from '@angular/core';
import {  HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUpperCase]'
})
export class UpperCaseDirective {

  @Input('appUpperCase') enableUppercase: boolean = true;

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (this.enableUppercase && value) {
      const upper = value.toUpperCase();
      this.ngControl.control?.setValue(upper, { emitEvent: false });
    }
  }

}
