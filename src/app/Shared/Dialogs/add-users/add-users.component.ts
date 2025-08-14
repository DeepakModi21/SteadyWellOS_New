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
  FormArray,
  FormsModule,
} from '@angular/forms';

import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';


import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { TextInputComponent } from '../../pages/text-input/text-input.component';
import { CheckBoxComponent } from '../../pages/check-box/check-box.component';
import { SelectorComponent } from '../../pages/selector/selector.component';
import { ButtonComponent } from '../../pages/button/button.component';




@Component({
  selector: 'app-add-users',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule,TextInputComponent,FormsModule,CheckBoxComponent,SelectorComponent,ButtonComponent],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss',
})
export class AddUsersComponent implements OnInit {

  PersonalInfoGroup:FormGroup;
  PatientInfoGroup:FormGroup;
  StaffInfoGroup:FormGroup;

  MainForm: FormArray<FormGroup> = new FormArray<FormGroup>([]);

  DialogData!:{ Title: string; sub_title: string,EditMode:boolean,UserData:Array<any>};

  UserType: string = 'patient'; // Default user type

constructor(
  @Inject(MAT_DIALOG_DATA) 
  public data: { 
    Title: string; 
    sub_title: string; 
    EditMode?: boolean; 
    UserData?: Array<any>;
  }
) 

{
  this.DialogData = {
    Title: data.Title,
    sub_title: data.sub_title,
    EditMode: data.EditMode ?? false,    // default false
    UserData: data.UserData ?? []        // default empty array
  };

  this.PersonalInfoGroup = new FormGroup({
    full_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  this.PatientInfoGroup=new FormGroup({
    mrn: new FormControl('', Validators.required),
    primary_physician: new FormControl('', Validators.required),
    clinical_phone_number: new FormControl('', Validators.required),
    assigned_nurse: new FormControl('', Validators.required),
    patient_type: new FormControl('', Validators.required),
    primary_disease: new FormControl('', Validators.required),
    years_with_condition: new FormControl('', Validators.required),
    emergency_contact_name: new FormControl(''),
    emergency_contact_phone: new FormControl(''),
    emergency_contact_relationship: new FormControl(''),
    allow_sharing_medical_info: new FormControl(false),


  })

    this.StaffInfoGroup = new FormGroup({
      license_number: new FormControl('', [Validators.required]),
      department: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      time_zone: new FormControl ('', Validators.required)
    });

  this.MainForm.push(this.PersonalInfoGroup);

  this.MainForm.push(this.PatientInfoGroup);

  this.MainForm.push(this.StaffInfoGroup);
}

UserTypes: {label:string, value:string}[] = [
  { label: 'Staff', value: 'staff' },
  { label: 'Patient', value: 'patient' },
]

PatientInformation:{label: string;
  inputType: string;
  datatype: string;
  canEdit: boolean;
  control: string;
  placeholder?: string;
  options?: Array<{label: string, value: string}>;
  width: string;}[]=[
  {
    label:'MRN',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'mrn',
    placeholder: 'MRN',
    width: 'half'

  },
  {
    label:'Primary Physician',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'primary_physician',
    placeholder: 'Enter Primary Physician',
    width: 'half'
  },
  {
    label:'Clinical Phone Number',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'clinical_phone_number',
    placeholder: 'Clinical Phone Number',
    width: 'half'
  },
   {
    label:'Assigned Nurse',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'assigned_nurse',
    placeholder: 'Assigned Nurse',
    width: 'half'
  },
   {
    label:'Patient Type',
    inputType: 'select',
    datatype: 'select',
    canEdit: true,
    control: 'patient_type',
    placeholder: 'Patient Type',
    width: 'half',
    options: [
      {
        label:'Inpatient',
        value: 'inpatient',
      },
      {
        label:'Outpatient',
        value: 'outpatient',
      },
      {label:'Emergency',
        value: 'emergency',
      }
    ]
  },
  {
    label:'Primary Disease/Condition',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'primary_disease',
    placeholder: 'Enter Primary Disease/Condition',
    width: 'half',
  },

  {
    label:'Years with condition',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'years_with_condition',
    placeholder: 'Years with Condition',
    width: 'half',
  },
]


PersonalInformation: {
  label: string;
  inputType: string;
  datatype: string;
  canEdit: boolean;
  control: string;
  placeholder?: string;
  options?: Array<{label: string, value: string}>;
  width: string;
}[] = [
  {
    label: 'Full Name',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'full_name',
    placeholder: 'Enter your full name',
    width:'half'
  },
  {
    label: 'Email',
    inputType: 'text',
    datatype: 'email',
    canEdit: true,
    control: 'email',
    placeholder: 'Enter your email address',
    width:'half'
  },
  {
    label: 'Gender',
   inputType: 'select',
    datatype: 'select',
    canEdit: true,
    control: 'gender',
    placeholder: 'Select your gender',
    options: [
      {
        label:'Male',
        value:'male',
      },  
      {
        label:'Female',
        value:'female',
      },
      {
        label:'Other',
        value:'other',
      }
    ],
    width:'half'
  },
  {
    label: 'Address',
    inputType: 'text',
    datatype: 'textarea',
    canEdit: true,
    control: 'address',
    placeholder: 'Enter your full address',
    width:'full'
  },
  {
    label: 'Phone Number',
     inputType: 'telephone',
    datatype: 'telephone',
    canEdit: true,
    control: 'phone_number',
    placeholder: 'Enter your phone number',
    width:'half'
  }
];

EmergencyContactInformation: {label: string;
  inputType: string;
  datatype: string;
  canEdit: boolean;
  control: string;
  placeholder?: string;
  options?: Array<{label: string, value: string}>;
  width: string;}[]=[
    {
      label:'Full Name',
      inputType: 'text',
      datatype: 'text',
      canEdit: true,
      control: 'emergency_contact_name',
      placeholder: 'Enter Emergency Contact Name',
      width: 'half'
    },
     {
      label:'Phone Number',
      inputType: 'text',
      datatype: 'text',
      canEdit: true,
      control: 'emergency_contact_phone',
      placeholder: 'Enter Emergency Contact Name',
      width: 'half'
    },
     {
      label:'Relationship',
      inputType: 'text',
      datatype: 'text',
      canEdit: true,
      control: 'emergency_contact_relationship',
      placeholder: 'Emergency Contact Relationship',
      width: 'half'
    },
    {
      label:'Allow Sharing Medical Information',
      inputType: 'checkbox',
      datatype: 'checkbox',
      canEdit: true,
      control: 'allow_sharing_medical_info',
      placeholder: 'Allow Sharing Medical Information',
      width: 'full'
    }

  ];

AdvanceDirectiveInformation: {
  label: string;
  inputType: string;
  datatype: string;
  canEdit: boolean;
  control: string;
  placeholder?: string;
  options?: Array<{label: string, value: string}>;
  width: string;
}[] = [

  {
    label: 'Advance Directive Status',
    inputType: 'select',
    datatype: 'select',
    canEdit: true,
    control: 'advance_directive',
    placeholder: 'Select Advance Directive',
    width: 'half'
  },
  {
    label: 'DNR Status',
    inputType: 'checkbox',
    datatype: 'checkbox',
    canEdit: true,
    control: 'dnr_status',
    placeholder: 'Do Not Resuscitate (DNR)',
    width: 'full'
  },
  {
    label: 'Advance Directive on File',
    inputType: 'checkbox',
    datatype: 'checkbox',
    canEdit: true,
    control: 'adavance_directive_on_file',
    placeholder: 'Do Not Resuscitate (DNR)',
    width: 'full'
  },
  {
    label: 'Notes',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'dnr_status',
    placeholder: 'Clinical Notes',
    width: 'full'
  }

]


StaffInformation: {
  label: string;
  inputType: string;
  datatype: string;
  canEdit: boolean;
  control: string;
  placeholder?: string;
  options?: Array<{label: string, value: string}>;
  width: string;
}[] = [
  {
    label: 'License Number',
    inputType: 'text',
    datatype: 'number',
    canEdit: true,
    control: 'license_number',
    placeholder: 'Enter License Number',
    width: 'half'
  },
  {
    label: 'Department',
    inputType: 'select',
    datatype: 'select',
    canEdit: true,
    control: 'department',
    placeholder: 'Select Department',
    options: [
      { label: 'Cardiology', value: 'cardiology' },
      { label: 'Neurology', value: 'neurology' },
      { label: 'Oncology', value: 'oncology' },
      { label: 'Pediatrics', value: 'pediatrics' },
      { label: 'Radiology', value: 'radiology' },
      { label: 'Surgery', value: 'surgery' },
      { label: 'Emergency', value: 'emergency' },
      { label: 'Psychiatry', value: 'psychiatry' }, 
    ],
    width: 'half'  
  },
  {
    label: 'Role',
    inputType: 'text',
    datatype: 'text',
    canEdit: true,
    control: 'role',
    placeholder: 'Enter Role',
    width: 'half'
  },
  
  {
    label:'Time Zone',
    inputType: 'select',
    datatype: 'select',
    canEdit: true,
    control: 'time_zone',
    placeholder: 'Select Time Zone',
    options: [
      { label: 'Pacific Time (PT)', value: 'PT' },
      { label: 'Mountain Time (MT)', value: 'MT' },
      { label: 'Central Time (CT)', value: 'CT' },
      { label: 'Eastern Time (ET)', value: 'ET' },
      { label: 'Greenwich Mean Time (GMT)', value: 'GMT' },
      { label: 'Central European Time (CET)', value: 'CET' }, 
    ],
    width: 'half'   
  }
]    


getFormGroupByName(index: number): FormGroup {
    return this.MainForm.at(index) as FormGroup;
}


getFormControlByName(index: number, controlName: string): FormControl {
  
  return (this.MainForm.get([index, controlName]) as FormControl) ?? new FormControl('');
}



onUserTypeChange()
{
    console.log("User Type is",this.UserType);
}

  ngOnInit(): void {
    
  }
  
}
