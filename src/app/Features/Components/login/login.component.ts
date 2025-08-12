import { Component, signal, WritableSignal } from '@angular/core';
import { MaterialModule } from '../../../Shared/Material Module/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/AuthSer/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { MatInputModule } from '@angular/material/input';
import { LoaderService } from '../../../Shared/services/loader.service';
import { LoaderComponent } from '../../../Shared/loader/loader/loader.component';



@Component({
  selector: 'app-login',
  imports: [MaterialModule,ReactiveFormsModule,MatInputModule,RouterModule,LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  Loading:boolean=false;


  loginForm: FormGroup;
isInProgress: WritableSignal<boolean> = signal(false);
 loading: boolean = false;
  passwordVisible = false;

  RememberMe: boolean = false;
  localStorage: any;

  constructor(private fb: FormBuilder,private router: Router,private auth_ser:AuthService,private cookieService: CookieService,private toastr: ToastrService,private loaderser:LoaderService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,
        //  Validators.email
        ]],
    
  password: [
    '',
    [
      Validators.required,
      // Validators.minLength(8),  
      // Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/)  
    ]
  ],
  RememberMe:[false]
});



    
  }

  ngOnInit(): void {

   if (localStorage.getItem('user')) {

  let user:any = localStorage.getItem('user');

  if(user)
  {
    user=JSON.parse(user);

    this.loginForm.patchValue({
    username: user?.username,
    password: user?.password,
    RememberMe:true
  });
  }

  // console.log("User Data", user);

  
}


   
   
  }


  toggleLoader(): void {
    this.isInProgress.set(!this.isInProgress());
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

 

  onSubmit(): void {
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  this.loading = true;
    this.toggleLoader();

    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      

    }

    this.auth_ser.login(payload).subscribe({
  next: (response) => {
    this.toggleLoader(); 

    this.loading=false;

      if(this.loginForm.get('RememberMe')?.value)
    {

     localStorage.setItem('user', JSON.stringify({
  username: response.user.username,
  password: this.loginForm.value.password,
}));
    }

    else
    {
      localStorage.removeItem('user');
    }

      this.loading = false;
    
    this.cookieService.set('access_token', response.access_token, response.expires_in);
    this.cookieService.set('refresh_token', response.refresh_token, response.expires_in);
    this.cookieService.set('user', JSON.stringify(response.user), response.expires_in);

  

  

    this.toastr.success('Login successful!', 'Success', {
      timeOut: 3000,
    });
 this.navigateBasedOnRole(response.user.role);
    // this.router.navigate(['/dashboard']);
  },
  error: (err) => {
      this.loading = false;

      // console.log("err is",err);
    
    this.toggleLoader(); 
      this.toastr.error(err.error.error, 'Error', {
      timeOut: 3000,
    });


  }
});

    

   
  }

 private navigateBasedOnRole(role: string): void {
 
    const userRole = role.split('.')[1];
    
    switch (userRole) {
      case 'ADMIN':
        this.router.navigate(['/portal/dashboard']);
        break;
      case 'NURSE':
        this.router.navigate(['/dashboard']);
        break;
    
      default:
        this.router.navigate(['/physician']);
        break;
    }
  }



}
