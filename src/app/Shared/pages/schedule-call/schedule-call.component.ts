import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../Features/components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

import { LoaderComponent } from '../loader/loader/loader.component';
import { CallsService } from '../../../Features/services/Calls/calls.service';
import { PatientData } from '../../../Core/interfaces/Patients_interface';
import {
  CallType,
  ConductedByUser,
  ScheduleCallRequest,
} from '../../../Core/interfaces/calls';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-call',
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    LoaderComponent,
  ],
  templateUrl: './schedule-call.component.html',
  styleUrl: './schedule-call.component.scss',
})
export class ScheduleCallComponent implements OnInit {
  scheduleForm: FormGroup;
  patients: PatientData[] = [];
  selectedPatient: PatientData | null = null;
  Loading = false;
  isScheduling = false;

   callTypes: CallType[] = [
    { id: 'follow_up', name: 'Follow-up' },
    { id: 'assessment', name: 'Assessment' },
    { id: 'medication_check', name: 'Medication Check' },
    { id: 'consultation', name: 'Consultation' },
    { id: 'emergency', name: 'Emergency' }
  ];
  conductedByUsers: ConductedByUser[] = [];

  constructor(
    private fb: FormBuilder,

    private callService: CallsService,
    private router: Router
  ) {
    this.scheduleForm = this.fb.group({
      patient: ['', Validators.required],
      callType: ['', Validators.required],
      scheduledDateTime: ['', Validators.required],
      conductedBy: ['', Validators.required],
      notes: [''],
    });

    // Set default date and time
    const defaultDate = new Date('2025-08-05T13:15');
    this.scheduleForm.patchValue({
      scheduledDateTime: this.formatDateTimeLocal(defaultDate),
    });
  }

  ngOnInit(): void {
    this.loadPatients();
    this.setupPatientSelectionListener();
    this.loadNurses();
  }

  private setupPatientSelectionListener(): void {
    this.scheduleForm.get('patient')?.valueChanges.subscribe((patientId) => {
      if (patientId) {
        this.selectedPatient =
          this.patients.find((p) => p.id === patientId) || null;
      } else {
        this.selectedPatient = null;
      }
    });
  }

  loadPatients(): void {
    this.Loading = true;
    this.callService.getPatients().subscribe({
      next: (patients: any) => {
        this.patients = patients;
        this.Loading = false;
      },
      error: () => {
        this.Loading = false;
      },
    });
  }
  loadNurses(): void {
    this.callService.getNurses().subscribe({
      next: (conductedByUsers: any) => {
        this.conductedByUsers = conductedByUsers;
      },
      error: () => {},
    });
  }

  formatDateTimeLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private formatDateTimeForAPI(dateTimeLocal: string): string {
    // Convert from datetime-local format to ISO format
    return new Date(dateTimeLocal).toISOString();
  }

  onScheduleCall(): void {
    if (this.scheduleForm.valid && !this.isScheduling) {
      this.isScheduling = true;

      const formValue = this.scheduleForm.value;
      const payload: ScheduleCallRequest = {
        patient_id: formValue.patient,
        scheduled_time: this.formatDateTimeForAPI(formValue.scheduledDateTime),
        call_type: formValue.callType,
        notes: formValue.notes || '',
        // conducted_by: formValue.conductedBy,
      };

      console.log('Scheduling call with payload:', payload);

      this.callService.scheduleCall(payload).subscribe({
        next: () => {
          console.log('Call scheduled successfully:');
          this.isScheduling = false;
          // You might want to show success message and navigate away
          // this.router.navigate(['/calls']); // if you have routing
        },
        error: () => {
          this.isScheduling = false;
          // You might want to show error message
        },
      });
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      Object.keys(this.scheduleForm.controls).forEach((key) => {
        this.scheduleForm.get(key)?.markAsTouched();
      });
    }
  }

  onBackToCalls(): void {
this.router.navigate(['/calls']);
  }

  // Helper method to format date for display
  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }

  // Helper method to calculate age
  calculateAge(dateOfBirth: string): number | null {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  onCancelBtn(): void {
    this.router.navigate(['/calls']);
  }
}