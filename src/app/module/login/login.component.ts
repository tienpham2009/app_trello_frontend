import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: string | undefined;

  constructor(private fb: FormBuilder, private loginService: LoginService , private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)]
      ],
    });
  }


  submit():void {
    let data = this.loginForm.value
    this.loginService.checkLogin(data).subscribe(res=>{
        localStorage.setItem('token',res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/master/home'])
    },error => {
      this.message = error.message
    })
  }

  get password() {
    return this.loginForm?.get('password');
  }

  get email() {
    return this.loginForm?.get('email');
  }

  getErrorMessageEmail() {
    if (this.email?.hasError('required')) {
      return 'email khong duoc de trong ';
    }
    return this.email?.hasError('email') ? 'email khong hop le' : '';
  }

  getErrorMessagePassword() {
    if (this.password?.hasError('required')) {
      return 'password khong duoc de trong ';
    }else if (this.password?.hasError('minlength')){
      return 'Mat khau tren 6 ki tu';
    }
    return this.password?.hasError('maxlength') ? 'Mat khau khong qua 32 ki tu' : '';
  }
}
