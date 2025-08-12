import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
// import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoaderComponent } from '../../loader/loader/loader.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { User } from '../../../Core/interfaces/auth_interface';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

enum UserRole {
  Nurse = 'NURSE',
  Physician = 'PHYSICIAN',
  Admin = 'ADMIN',
  Patient = 'PATIENT',
  // Add more as needed
}

@Component({
  selector: 'app-add-users',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss',
})
export class AddUsersComponent implements OnInit {
  passwordVisible: boolean = false;
  userForm!: FormGroup;
  selectedUserType: string = '';
  EditorRole: string = '';

  isEditMode: boolean = false;
  UserData: any;
  loading: boolean = false;

  // Options for dropdowns
  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  protocolTypeOptions = [
    { value: 'heart_failure', label: 'Heart Failure' },
    { value: 'copd', label: 'COPD' },
    { value: 'cancer', label: 'Cancer' },
    { value: 'fit', label: 'Fit' },
  ];

  specialtyOptions = [
    { value: 'cancer', label: 'Cancer' },
    { value: 'heart-failure', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'general', label: 'General Medicine' },
  ];

  departmentOptions = [
    { value: 'icu', label: 'ICU' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'surgical', label: 'Surgical' },
    { value: 'medical', label: 'Medical' },
    { value: 'pediatric', label: 'Pediatric' },
  ];

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router,
    private dynamicDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, // Use MAT_DIALOG_DATA and Optional
    @Optional() private dialogRef: MatDialogRef<AddUsersComponent> // Optional dialog reference
  ) {
    this.isEditMode = data?.isEdit || false;

    // console.log("data is",data);

    if (this.isEditMode && data?.user) {
      this.UserData = data.user;

      this.selectedUserType = this.UserData.hasOwnProperty('role')
        ? this.getRoleLabel(this.UserData.role).toLowerCase()
        : 'patient';

      this.EditorRole = data.EditorRole;
    }
  }

  PatientControls = [
    { name: 'mrn', defaultValue: '', validators: [Validators.required] },
    {
      name: 'date_of_birth',
      defaultValue: '',
      validators: [Validators.required],
    },
    { name: 'gender', defaultValue: '', validators: [Validators.required] },
    { name: 'address', defaultValue: '', validators: [] },
    {
      name: 'primary_diagnosis',
      defaultValue: '',
      validators: [Validators.required],
    },
    { name: 'secondary_diagnoses', defaultValue: '', validators: [] },
    {
      name: 'protocol_type',
      defaultValue: '',
      validators: [Validators.required],
    },
    {
      name: 'primary_nurse_id',
      defaultValue: '',
      validators: [Validators.required],
    },
    { name: 'emergency_contact_name', defaultValue: '', validators: [] },
    { name: 'emergency_contact_phone', defaultValue: '', validators: [] },
    {
      name: 'emergency_contact_relationship',
      defaultValue: '',
      validators: [],
    },
    {
      name: 'emergency_contact_can_share_medical_info',
      defaultValue: false,
      validators: [],
    },
    {
      name: 'advance_directive',
      defaultValue: { value: true, disabled: true },
      validators: [Validators.required],
    },
    {
      name: 'advance_directive_status',
      defaultValue: '',
      validators: [Validators.required],
    },
    { name: 'dnr_status', defaultValue: false, validators: [] },
    { name: 'allergies', defaultValue: '', validators: [] },
    { name: 'notes', defaultValue: '', validators: [] },
  ];

  NurseControls = [
    {
      name: 'username',
      defaultValue: '',
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
    },
    {
      name: 'license_number',
      defaultValue: '',
      validators: [],
    },
    {
      name: 'password',
      defaultValue: '',
      validators: [Validators.required, Validators.minLength(6)],
    },
  ];

  ngOnInit(): void {
    this.initializeForm();

    if (!this.isEditMode) {
      this.userForm
        .get('role')
        ?.valueChanges.subscribe((updatedValue: string) => {
          if (updatedValue.toLowerCase() == 'patient') {
            this.AddPatientControls();
          } else if (updatedValue.toLowerCase() == 'nurse') {
            this.AddNurseControls();
          }

          this.userForm.updateValueAndValidity();

          // console.log("user form is",this.userForm.controls);
        });
    } else {
      if (
        this.isEditMode &&
        this.UserData &&
        !this.UserData.hasOwnProperty('role')
      ) {
        this.AddPatientControls();

        this.userForm.patchValue({
          first_name:
            this.UserData.full_name?.split(' ')[0] ||
            this.UserData.full_name ||
            '',
          last_name:
            this.UserData.full_name?.split(' ')[1] ||
            this.UserData.last_name ||
            '',
          email: this.UserData.email || '',
          gender: this.getLastValueFormatted(
            this.UserData.gender || ''
          ).toLowerCase(),
          phone_number: this.UserData.phone_number || '',
          role: this.UserData?.role
            ? this.getRoleLabel(this.UserData.role).toLowerCase()
            : 'patient',
          mrn: this.UserData.mrn || '',
          date_of_birth: this.UserData.date_of_birth
            ? new Date(this.UserData.date_of_birth).toISOString().split('T')[0]
            : '',
          address: this.UserData.address || '',
          advance_directive_status: this.getLastValueFormatted(
            this.UserData.advance_directive_status || ''
          ).toLowerCase(),
          primary_diagnosis: this.UserData.primary_diagnosis || '',
          secondary_diagnoses: this.UserData.secondary_diagnoses || '',
          primary_nurse_id: this.UserData.primary_nurse?.id || '',
          protocol_type: this.getLastValueFormatted(
            this.UserData.protocol_type || ''
          ).toLowerCase(),
          emergency_contact_name: this.UserData.emergency_contact_name || '',
          allergies: this.UserData.allergies || '',
          emergency_contact_can_share_medical_info:
            this.UserData.emergency_contact_can_share_medical_info || false,
          emergency_contact_relationship:
            this.UserData.emergency_contact_relationship || '',
          notes: this.UserData.notes || '',
          emergency_contact_phone: this.UserData.emergency_contact_phone || '',
        });
      } else if (
        this.isEditMode &&
        this.UserData &&
        this.UserData.hasOwnProperty('role')
      ) {
        const role = this.getRoleLabel(this.UserData.role).toLowerCase();

        if (role.toLowerCase() == 'nurse') {
          this.AddNurseControls();

          // console.log("nurse control are",this.userForm.controls);

          this.userForm.patchValue({
            first_name: this.UserData.first_name || '',
            last_name: this.UserData.last_name || '',
            email: this.UserData.email,
            username: this.UserData.username,
            phone_number: this.UserData.phone_number,
            role: this.UserData.hasOwnProperty('role')
              ? this.getRoleLabel(this.UserData.role).toLowerCase()
              : 'patient',
            license_number: this.UserData.license_number || '',
          });
        }
      }
    }
  }

  AddNurseControls() {
    this.NurseControls.forEach((control) => {
      const validators = control.validators || [];

      if (!this.isEditMode || control.name !== 'password') {
        const formControl = new FormControl(control.defaultValue, validators);

        this.userForm.addControl(control.name, formControl);
      }
    });

    // Removing Patients controls
    this.PatientControls.forEach((control) => {
      if (this.userForm.get(control.name)) {
        this.userForm.removeControl(control.name);
      }
    });
  }

  AddPatientControls() {
    this.PatientControls.forEach((control) => {
      const validators = control.validators || [];
      const formControl = new FormControl(control.defaultValue, validators);
      this.userForm.addControl(control.name, formControl);
    });

    if (this.EditorRole.toLowerCase() == 'nurse') {
      this.userForm.get('primary_nurse_id')?.disable();
    }

    // Removing Nurse controls
    this.NurseControls.forEach((control) => {
      if (this.userForm.get(control.name)) {
        this.userForm.removeControl(control.name);
      }
    });
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      // Common fields - always required
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      gender: ['', Validators.required],
      phone_number: [
        '',
        [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)],
      ],
      role: ['', [Validators.required]],
    });
  }

  getRoleLabel(role: string): string {
    switch (role.toLowerCase()) {
      case 'userrole.nurse':
        return 'Nurse';
      case 'userrole.physician':
        return 'Physician';
      case 'userrole.admin':
        return 'Admin';
      case 'userrole.patient':
        return 'Patient';
      default:
        return 'Unknown Role';
    }
  }

  onUserTypeChange(role: string): void {
    this.selectedUserType = role;
    this.clearAllDynamicValidators();
    this.setDynamicValidators(role);
  }

  private clearAllDynamicValidators(): void {
    // Clear validators for all user-type-specific fields
    const patientFields = [
      'mrn',
      'date_of_birth',
      'gender',
      'address',
      'protocol_type',
      'primary_nurse_id',
      'emergency_contact_name',
      'emergency_contact_phone',
      'emergency_contact_relationship',
    ];

    const nurseFields = ['license_number'];

    [...patientFields, ...nurseFields].forEach((field) => {
      const control = this.userForm.get(field);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }

  private setDynamicValidators(role: string): void {
    switch (role) {
      case 'patient':
        this.setPatientValidators();
        break;
      case 'nurse':
        this.setNurseValidators();
        break;
    }
  }

  private setPatientValidators(): void {
    // Set validators for patient-specific fields
    this.userForm.get('mrn')?.setValidators([Validators.required]);
    this.userForm.get('date_of_birth')?.setValidators([Validators.required]);
    this.userForm.get('gender')?.setValidators([Validators.required]);
    this.userForm
      .get('address')
      ?.setValidators([Validators.required, Validators.minLength(10)]);
    this.userForm.get('protocol_type')?.setValidators([Validators.required]);
    this.userForm.get('primary_nurse_id')?.setValidators([Validators.required]);
    this.userForm
      .get('emergency_contact_name')
      ?.setValidators([Validators.required]);
    this.userForm
      .get('emergency_contact_phone')
      ?.setValidators([Validators.required, Validators.pattern(/^\d{10}$/)]);
    this.userForm
      .get('emergency_contact_relationship')
      ?.setValidators([Validators.required]);

    // Update validity for all patient-specific fields
    [
      'mrn',
      'date_of_birth',
      'gender',
      'address',
      'protocol_type',
      'primary_nurse_id',
      'emergency_contact_name',
      'emergency_contact_phone',
      'emergency_contact_relationship',
    ].forEach((field) => {
      this.userForm.get(field)?.updateValueAndValidity();
    });
  }

  private setNurseValidators(): void {
    this.userForm
      .get('license_number')
      ?.setValidators([Validators.required, Validators.pattern(/^RN\d{6,8}$/)]);

    // Update validity
    this.userForm.get('license_number')?.updateValueAndValidity();
  }

  // Helper method to get form control
  getFormControl(controlName: string): AbstractControl | null {
    return this.userForm.get(controlName);
  }

  // Helper method to check if field has error
  hasError(controlName: string, errorType?: string): boolean {
    const control = this.getFormControl(controlName);
    if (!control) return false;

    if (errorType) {
      return control.hasError(errorType) && (control.dirty || control.touched);
    }
    return control.invalid && (control.dirty || control.touched);
  }

  // Get error message for a field
  getErrorMessage(controlName: string): string {
    const control = this.getFormControl(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required'])
      return `${this.getFieldLabel(controlName)} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['maxlength'])
      return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
    if (errors['pattern']) return this.getPatternErrorMessage(controlName);
    if (errors['min']) return `Minimum value is ${errors['min'].min}`;
    if (errors['max']) return `Maximum value is ${errors['max'].max}`;

    return 'Invalid input';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      username: 'Username',
      password: 'Password',
      phone_number: 'Phone Number',
      role: 'User Type',
      mrn: 'MRN',
      date_of_birth: 'Date of Birth',
      gender: 'Gender',
      address: 'Address',
      protocol_type: 'Protocol Type',
      primary_nurse_id: 'Primary Nurse ID',
      emergency_contact_name: 'Emergency Contact Name',
      emergency_contact_phone: 'Emergency Contact Phone',
      emergency_contact_relationship: 'Emergency Contact Relationship',
      license_number: 'Nursing License',
    };
    return labels[controlName] || controlName;
  }

  private getPatternErrorMessage(controlName: string): string {
    switch (controlName) {
      case 'phone_number':
      case 'emergency_contact_phone':
        return 'Please enter a valid phone number';
      case 'license_number':
        return 'Nursing License should start with "RN" followed by 6-8 digits';
      default:
        return 'Invalid format';
    }
  }

  onSubmit(): void {
    // Add debugging

    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.loading = true;

      if (formData.role === 'nurse') {
        const nurseData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          phone_number: formData.phone_number,
          role: formData.role,
          license_number: formData.license_number,
        };

        if (!this.isEditMode) {
          this.userService.addUser(nurseData).subscribe({
            next: (response: any) => {
              this.router.navigate(['/admin_users']);

              this.dialogRef?.close(true); // Close the dialog if it exists

              this.loading = false;

              // this.dialogRef.close();

              this.toastr.success('User added successfully', 'Success');

              this.resetForm();
            },
            error: (error: any) => {
              this.dialogRef?.close(false); // Close the dialog if it exists

              // this.dialogRef.close();
              this.loading = false;
              this.toastr.error('Failed to add user', 'Error');
            },
          });
        } else {
          this.userService.updateUser(this.UserData.id, nurseData).subscribe(
            (res: any) => {
              this.toastr.success('User updated successfully', 'Success');
              this.loading = false;
              this.dialogRef.close(true);
            },
            (err) => {
              this.loading = false;

              this.toastr.error('Error while updating the patient', 'Error');
            }
          );
        }
      } else if (formData.role === 'patient') {
        const formattedDOB = formData.date_of_birth
          ? new Date(formData.date_of_birth).toISOString().split('T')[0]
          : null;

        const patientData = {
          mrn: formData.mrn,
          first_name: formData.first_name,
          last_name: formData.last_name,
          date_of_birth: formattedDOB,
          gender: formData.gender,
          phone_number: formData.phone_number,
          email: formData.email,
          address: formData.address,
          primary_diagnosis: formData.primary_diagnosis,
          secondary_diagnoses: formData.secondary_diagnoses,
          protocol_type: formData.protocol_type,
          primary_nurse_id: formData.primary_nurse_id,
          emergency_contact_name: formData.emergency_contact_name,
          emergency_contact_phone: formData.emergency_contact_phone,
          emergency_contact_relationship:
            formData.emergency_contact_relationship,
          emergency_contact_can_share_medical_info:
            formData.emergency_contact_can_share_medical_info,
          advance_directive: formData.advance_directive,
          advance_directive_status: formData.advance_directive_status,
          dnr_status: formData.dnr_status,
          allergies: formData.allergies,
          notes: formData.notes,
        };

        if (!this.isEditMode) {
          this.userService.addPatient(patientData).subscribe({
            next: (response: any) => {
              this.router.navigate(['/admin_users']);

              // this.dialogRef.close();

              this.dialogRef?.close(true); // Close the dialog if it exists

              this.loading = false;

              this.toastr.success('Patient added successfully', 'Success');
              this.resetForm();
            },
            error: (error: any) => {
              // this.dialogRef.close();

              this.dialogRef?.close(false); // Close the dialog if it exists

              this.loading = false;
              this.toastr.error('Failed to add patient', 'Error');
            },
          });
        } else {
          this.UpdatePatientData();
        }
      } else {
        this.snackBar.open('Please select a valid user type', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    } else {
      this.markAllFieldsAsTouched();

      this.snackBar.open(
        'Please fill in all required fields correctly',
        'Close',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
        }
      );
    }
  }

  // Debug helper method
  private getFormErrors(): any {
    let formErrors: any = {};
    Object.keys(this.userForm.controls).forEach((key) => {
      const controlErrors = this.userForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });
    return formErrors;
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.markAsTouched();
    });
  }

  resetForm(): void {
    this.userForm.reset();
    this.selectedUserType = '';
    this.initializeForm();
  }

  onCancel(): void {
    if (this.userForm.touched || this.userForm.dirty) {
      this.dynamicDialog
        .open(DynamicDialogComponent, {
          data: {
            icon: 'cancel', // Material icon name
            title: 'Cancel Changes', // Dialog title
            message:
              'Are you sure to cancel in between changes will not be saved?', // Required message
            showCancel: true, // Show Cancel button
            showOk: true, // Show OK button
            cancelText: 'No', // Custom Cancel text
            okText: 'Yes', // Custom OK text
            iconColor: '#EF4444',
          },
          width: '300px',
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.resetForm();
            this.dialogRef?.close(false); // Close the dialog if it exists
          }
        });
    } else {
      this.resetForm();
      this.dialogRef?.close(false); // Close the dialog if it exists
    }
  }

  patchPatientData(patient: any): void {
    this.userForm.patchValue({
      mrn: patient.mrn || '',
      // first_name: patient.first_name || '',
      // last_name: patient.last_name || '',
      date_of_birth: patient.date_of_birth
        ? new Date(patient.date_of_birth)
        : null,
      gender: patient.gender || '',
      phone_number: patient.phone_number || '',
      email: patient.email || '',
      address: patient.address || '',
      primary_diagnosis: patient.primary_diagnosis || '',
      secondary_diagnoses: patient.secondary_diagnoses || '',
      protocol_type: patient.protocol_type || '',
      primary_nurse_id: patient.primary_nurse_id || '',
      emergency_contact_name: patient.emergency_contact_name || '',
      emergency_contact_phone: patient.emergency_contact_phone || '',
      emergency_contact_relationship:
        patient.emergency_contact_relationship || '',
      emergency_contact_can_share_medical_info:
        patient.emergency_contact_can_share_medical_info || false,
      advance_directive: patient.advance_directive || '',
      advance_directive_status: patient.advance_directive_status || '',
      dnr_status: patient.dnr_status || '',
      allergies: patient.allergies || '',
      notes: patient.notes || '',
      role: 'patient', // patch role as well if needed
    });
    this.selectedUserType = 'patient';
  }

  UpdatePatientData(): void {
    const formData = this.userForm.value;

    const formattedDOB = formData.date_of_birth
      ? new Date(formData.date_of_birth).toISOString().split('T')[0]
      : null;

    const updatedData = {
      mrn: formData.mrn,
      first_name: formData.first_name,
      last_name: formData.last_name,
      date_of_birth: formattedDOB,
      gender: formData.gender,
      phone_number: formData.phone_number,
      email: formData.email,
      address: formData.address,
      primary_diagnosis: formData.primary_diagnosis,
      secondary_diagnoses: formData.secondary_diagnoses,
      protocol_type: formData.protocol_type,
      primary_nurse_id: formData.primary_nurse_id,
      emergency_contact_name: formData.emergency_contact_name,
      emergency_contact_phone: formData.emergency_contact_phone,
      emergency_contact_relationship: formData.emergency_contact_relationship,
      emergency_contact_can_share_medical_info:
        formData.emergency_contact_can_share_medical_info,
      advance_directive: formData.advance_directive,
      advance_directive_status: formData.advance_directive_status,
      dnr_status: formData.dnr_status,
      allergies: formData.allergies,
      notes: formData.notes,
    };

    this.loading = true;

    this.userService.updatePatient(this.UserData.id, updatedData).subscribe({
      next: (response: any) => {
        this.toastr.success('Patient data updated successfully', 'Success');
        this.loading = false;
        this.dialogRef?.close(true); // Close the dialog if it exists
      },
      error: (error: any) => {
        this.loading = false;
        this.toastr.error('Failed to update patient data', 'Error');
      },
    });
  }

  getLastValueFormatted(input: string): string {
    if (!input) return '';

    // Extract the last part after the last dot
    const lastPart = input.split('.').pop() || '';

    // Convert it to lowercase and then capitalize the first letter
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).toLowerCase();
  }
}
