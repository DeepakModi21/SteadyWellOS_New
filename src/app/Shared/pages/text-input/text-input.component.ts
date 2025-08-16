import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { UpperCaseDirective } from '../../Directives/upper-case.directive';


type MaskAndPatterns = {
  mask: string | undefined;
  patterns: Record<string, { pattern: RegExp; optional?: boolean; symbol?: string }>;
};

@Component({
  selector: 'app-text-input',
  imports: [MaterialModule,ReactiveFormsModule,CommonModule,NgxMaskDirective,UpperCaseDirective],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements OnChanges {

  @Input() label: string = '';
  @Input() placeholder?: string | undefined;
  @Input() type: string = 'text';
  @Input()FormControl:FormControl=new FormControl('');
  @Input() customMask: Record<string, {pattern: RegExp; optional?: boolean; symbol?: string }> | null = null;
  @Input()shownMaskExpression:string='--- --- ---';
  @Input()showMaskTyped:boolean=true;
  @Input()forceUpperCase:boolean=false;


 DefaultMask:string | undefined;
 defaultMaskPattern!:Record<string, { pattern: RegExp; optional?: boolean; symbol?: string }>


 customMaskPattern!:Record<string, { pattern: RegExp; optional?: boolean; symbol?: string }>;
customMaskKey!:string | undefined;



 ngOnChanges(changes:SimpleChanges)
 {

  if(changes['customMask'])
  {

     if(!this.customMask)
  {
  const { mask,patterns } = this.getDeafultMaskAndPatterns();
   this.DefaultMask = mask;
  this.defaultMaskPattern= patterns;

  }

  else
  {

     const custom = this.getCustomMaskAndPattern();
this.customMaskPattern = custom?.patterns ?? {};
this.customMaskKey = custom?.mask ?? '';

  }

  }

 
};


getCustomMaskAndPattern(): MaskAndPatterns | null {
  if (!this.customMask || Object.keys(this.customMask).length === 0) {
    return null;
  }

  const key = Object.keys(this.customMask)[0]; // e.g., "x"

  return {
    mask: `${key}*`, // repeat the user's key
    patterns: this.customMask
  };
}



getDeafultMaskAndPatterns(): MaskAndPatterns {
  switch (this.type.toLowerCase()) {
    case 'text':
      return {
        mask: 't*',
        patterns: {
          t: { pattern: /[a-zA-Z ]/ }
        }
      };

    case 'number':
      return {
        mask: 'n*',
        patterns: {
          n: { pattern: /[0-9]/ }
        }
      };

    case 'mixed':
      return {
        mask: 'm*',
        patterns: {
          m: { pattern: /[a-zA-Z0-9]/ }
        }
      };

    case 'email':
      return {
        mask: 'e*',
        patterns: {
          e: {
            // allow a-z, A-Z, 0-9, @, ., _, and -
            pattern: /[a-zA-Z0-9._@-]/
          }
        }
      };

    default:
      return {
        mask: 'd*',
        patterns: {
          d: { pattern: /[\s\S]/ } // allow any character
        }
      };
  }
}




}
