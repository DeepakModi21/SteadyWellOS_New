import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { CountryISO } from 'ngx-material-intl-tel-input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-telephone',
  imports: [MaterialModule,CommonModule,NgxIntlTelInputModule,ReactiveFormsModule],
  templateUrl: './telephone.component.html',
  styleUrl: './telephone.component.scss'
})
export class TelephoneComponent {

  @Input()label: string = 'Phone Number';
  @Input()placeholder: string = 'Enter phone number';

  @Input()disableCountrySelection:boolean=true;

  @Input()FormControl:FormControl = new FormControl('');

  @Input() preferredCountries: CountryISO[] = [CountryISO.Canada];
  @Input() onlyCountries: CountryISO[] = [CountryISO.Canada];
  @Input() selectedCountryISO: CountryISO = CountryISO.Canada;


  @Input() enableAutoCountrySelect: boolean = false;
  @Input() searchCountryFlag: boolean = false;
  @Input() selectFirstCountry: boolean = false;
  @Input() enablePlaceholder: boolean = true;
  @Input() maxLength: number = 10;

  @Input() separateDialCode: boolean = true;
  @Input() phoneValidation: boolean = true;
  @Input() searchCountryField: SearchCountryField[] = [SearchCountryField.All];
  @Input() numberFormat: PhoneNumberFormat = PhoneNumberFormat.International;




  // preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.India];
  // CountryISO = CountryISO;


  ngOnInit(): void {
    // Initialize any additional logic if needed
    // console.log("Telephone Component Initialized with label:", this.label);

    this.FormControl.valueChanges.subscribe((value:{
  number: string;
  internationalNumber: string;
  nationalNumber: string;
  e164Number: string;
  countryCode: string; // e.g., "CA"
  dialCode: string;    // e.g., "+1"
} | null | string) => {

    if (value && typeof value !== 'string') {
  const data = (value.internationalNumber).toString();
  // this.FormControl.patchValue(data,{emitEvent:false});

  console.log("value is",this.FormControl.value);
}

    });

}

}
