import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../../../Core/interfaces/dynamic_dialog_interface';
import { CommonModule } from '@angular/common';
import {ButtonStyle} from '../../../Core/interfaces/buttonStyle';
import { ButtonComponent } from '../../pages/button/button.component';



@Component({
  selector: 'app-dynamic-dialog',
  imports: [MaterialModule,MatDialogModule,CommonModule,ButtonComponent],
  templateUrl: './userConfirmation.component.html',
  styleUrl: './userConfirmatin.component.scss'
})
export class userConfirmationComponent {

  
  constructor(
    private dialogRef: MatDialogRef<userConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title?: string;
      message?: string;
      icon?: string;
      iconColor?: string;

      showCancelButton?: boolean;
      cancelButtonStyle?: ButtonStyle;
      cancelButtonText?: string;
      cancelButtonicon?:string,

      okayButtonicon?:string,
      showOkayButton?: boolean;
      okayButtonStyle?: ButtonStyle;
      okayButtonText?: string;
    }
  ) {


  }

  onOkay()
  {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDeactivate(): void {
    this.dialogRef.close(true);
  }
}
