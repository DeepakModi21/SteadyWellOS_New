import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CallsService } from '../../../Features/services/Calls/calls.service';
import { PatientData } from '../../../Core/interfaces/Patients_interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call-details',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './call-details.component.html',
  styleUrl: './call-details.component.scss',
})
export class CallDetailsComponent {
  isEditMode: boolean = false;
  editForm!: FormGroup;
  loading: boolean = false;
  patients: PatientData[] = [];
  statusOptions = [
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'MISSED', label: 'Missed' },
  { value: 'CANCELLED', label: 'Cancelled' }
];

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private callService: CallsService,
    public dialogRef: MatDialogRef<CallDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.isEditMode = this.data.isEdit === true;

    this.editForm = this.createForm();

    if (this.callData) {
      this.editForm.patchValue({
        scheduledTime: this.getFormattedDateTime(this.callData?.scheduled_time),
      status: this.getStatusValue(this.callData?.status),
        notes: this.callData?.notes,
      });
    }
  }
  get callData() {
    return this.data.callData;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      scheduledTime: [this.callData?.scheduled_time || '', Validators.required],
      status: [this.callData?.status || '', Validators.required],
      notes: [this.callData?.notes || ''],
    });
  }
getStatusValue(status: string): string {
  return status?.split('.')?.[1] ?? status;
}
  getFormattedDateTime(dateValue: string): string {
    if (!dateValue) return '';

    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return '';

    // Format for datetime-local input (YYYY-MM-DDTHH:MM)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'scheduled':
        return 'text-blue-600';
      case 'missed':
        return 'text-red-600';
      case 'in progress':
        return 'text-yellow-600';
      case 'cancelled':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  }

  onCancel(): void {
    if (this.isEditMode) {
      this.isEditMode = false;
    } else {
      this.dialogRef.close();
     
    }
  }

  onEdit(): void {
    this.dialogRef.close({ action: 'edit', callData: this.callData });
  }

 
onSave(): void {
  if (this.editForm.valid) {
    const payload: any = {
      conducted_by_id: this.callData?.conducted_by_id,
      scheduled_time: this.editForm.value.scheduledTime,
      status: this.editForm.value.status,
      notes: this.editForm.value.notes,
    };

    const callId = this.callData?.id;

    this.callService.updateCall(callId, payload).subscribe({
      next: (response) => {
        this.dialogRef.close({
          action: 'save',
          data: response,
        });
        this.router.navigate(['/calls']);
      },
      error: (err) => {
       
      }
    });
  }
}

  loadPatients(): void {
    this.loading = true;
    this.callService.getPatients().subscribe({
      next: (patients: any) => {
        this.patients = patients;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
