import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


import { CustomValidators } from '@utils/validators';
import { RequestStatus } from '@models/request-status.model';
import { AuthService} from '@services/auth.service'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

  formValidateUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  });

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusValidateUser : RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.RegisterAndLogin(name, email, password)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards']);
        },
        error: () =>{
          this.status = 'failed';
        }
      });
      console.log(name, email, password);
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser(){
    if (this.formValidateUser.valid) {
      this.statusValidateUser = 'loading';
      const { email } = this.formValidateUser.getRawValue();
      this.authService.ValidateUser( email)
      .subscribe({
        next: (result) => {
          if(result.isAvailable){
            this.statusValidateUser = 'success';
            this.form.controls.email.setValue(email);
            this.showRegister = true;

          }else{
            this.router.navigate(['/login'],{
              queryParams: {email}
            });
          }
        },
        error: () =>{
          this.status = 'failed';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
