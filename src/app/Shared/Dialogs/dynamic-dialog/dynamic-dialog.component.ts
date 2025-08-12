import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../../../Core/interfaces/dynamic_dialog_interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dynamic-dialog',
  imports: [MaterialModule,MatDialogModule,CommonModule],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.css'
})
export class DynamicDialogComponent {

   constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    // Set default values if not provided
    this.data = {
      showOk: true,
      showCancel: false,
      ...this.data
    };
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    // console.log('OK button clicked');
    // You can add any additional logic here if needed
    this.dialogRef.close(true);
  }

  getDefaultIconColor(): string {
    const icon = this.data.icon?.toLowerCase();
    
    if (!icon) return '#666';
    
    // Auto-assign colors based on common icon patterns
    if (icon.includes('check') || icon.includes('done') || icon === 'check_circle') {
      return '#4caf50'; // Green for success
    } else if (icon.includes('error') || icon.includes('cancel') || icon === 'error') {
      return '#f44336'; // Red for error
    } else if (icon.includes('warning') || icon === 'warning') {
      return '#ff9800'; // Orange for warning
    } else if (icon.includes('info') || icon === 'info') {
      return '#2196f3'; // Blue for info
    } else if (icon.includes('delete') || icon === 'delete') {
      return '#f44336'; // Red for delete
    }
    
    return '#666'; // Default gray
  }


}
