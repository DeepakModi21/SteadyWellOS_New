import { Component } from '@angular/core';
import { MaterialModule } from '../../../Shared/Material Module/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../../../Shared/services/loader.service';





@Component({
  selector: 'app-reset-password',
  imports: [MaterialModule,CommonModule,RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

    resetForm!: FormGroup;
    EmailSent:boolean=false;

     constructor(private fb: FormBuilder,private loaderser:LoaderService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

   onSubmit() {
    if (this.resetForm.valid) {
      const email = this.resetForm.get('email')?.value;
      console.log('Sending reset link to:', email);
      // Add your password reset logic here
      alert('Password reset link sent to ' + email);

      this.loaderser.show();

      setTimeout(() => {

        this.EmailSent=true;

        this.loaderser.hide();
        
      }, 1000);

      
    }
  }

  goBack() {
    // Add navigation logic to go back to sign in
    console.log('Navigate back to sign in');
  }

}
