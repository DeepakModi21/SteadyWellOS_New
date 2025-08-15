import { Component, Input } from '@angular/core';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';
import { MaterialModule } from '../../Material Module/material.module';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CountryISO } from 'ngx-material-intl-tel-input';


@Component({
  selector: 'app-telephone',
  imports: [ NgxMaterialIntlTelInputComponent,MaterialModule,CommonModule,NgxIntlTelInputModule],
  templateUrl: './telephone.component.html',
  styleUrl: './telephone.component.scss'
})
export class TelephoneComponent {

  @Input()label: string = 'Phone Number';
  @Input()placeholder: string = 'Enter phone number';

  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.India];
  CountryISO = CountryISO;

}
