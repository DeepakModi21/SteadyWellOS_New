import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material Module/material.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [MaterialModule,ReactiveFormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

    passwordForm: FormGroup;
  hideNewPassword = true;
  hideConfirmPassword = true;

  isValidLength:boolean=false;
  hasUpperCase:boolean=false;
  hasSpecialChar:boolean=false;
  hasNumber:boolean=false;
  hasRepetitiveNumbers:boolean=false;


  strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    if (!value) {
      return null; // handled by required
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasNumber && hasSpecialChar;

    return valid ? null : { strongPassword: true };
  };
}



  constructor(private fb: FormBuilder)
  {
      this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(10),this.strongPasswordValidator()]],
      currentPassword:['',Validators.required],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
 
  }
  

  // get isValidLength(): boolean {
  //   const newPassword = this.passwordForm.get('newPassword')?.value || '';
  //   return newPassword.length >= 10;
  // }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (confirmPassword && newPassword !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const confirmPasswordControl = control.get('confirmPassword');
      if (confirmPasswordControl?.hasError('passwordMismatch')) {
        const errors = { ...confirmPasswordControl.errors };
        delete errors['passwordMismatch'];
        confirmPasswordControl.setErrors(Object.keys(errors).length ? errors : null);
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      // console.log('Password reset submitted:', formData);
      // Handle password reset logic here
      
      // Example: Call a service to reset password
      // this.authService.resetPassword(formData.newPassword).subscribe(...)
    }
  }

  getErrorMessage(form: FormGroup, controlName: string): string {
  const control = form.get(controlName);
  
  if (!control || !control.errors || !control.touched && !control.dirty) return '';

  if (control.hasError('required')) {
    return 'This field is required';
  }

  if (control.hasError('minlength')) {
    const minLength = control.errors?.['minlength'].requiredLength;
    return `Minimum length is ${minLength} characters`;
  }

  if (control.hasError('maxlength')) {
    const maxLength = control.errors?.['maxlength'].requiredLength;
    return `Maximum length is ${maxLength} characters`;
  }

  if (control.hasError('pattern')) {
    return 'Invalid format';
  }

  // Example for custom validator errors
  if (control.hasError('emailExists')) {
    return 'This email is already registered';
  }

  if(control.hasError('strongPassword'))
  {
      return "Your password doesn't match the below criteria "
  }

  // Catch-all for any other custom errors
  const firstErrorKey = Object.keys(control.errors)[0];
  return control.errors[firstErrorKey] || 'Invalid value';
}

getFormControlByName(controlName:string):FormControl | null
{
  const FormGroup=this.passwordForm;

  return FormGroup.get(controlName) as FormControl
}

onPasswordInput() {

  // console.log("hey");

  const password=this.passwordForm.get('newPassword')?.value;

  if(password && password!=='')
  {
    
  this.isValidLength = password.length >= 10;
  this.hasUpperCase = /[A-Z]/.test(password);
  this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  this.hasNumber = /[0-9]/.test(password);

  // Check for repetitive numbers like 111, 222
  this.hasRepetitiveNumbers = /(0{2,}|1{2,}|2{2,}|3{2,}|4{2,}|5{2,}|6{2,}|7{2,}|8{2,}|9{2,})/.test(password);

  }

}





}
