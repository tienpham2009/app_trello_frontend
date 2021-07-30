import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logMessage!:string;
  loginForm!: FormGroup;
  message: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentMessage.subscribe(message => this.logMessage = message);
 console.log(this.logMessage)
    this.loginForm = this.fb.group({
      email: ['', [
                    Validators.required,
                    Validators.email
                  ]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
    });
  }



  submitForm(): void {
    let data = this.loginForm.value;
    this.authService.checkLogin(data).subscribe(
      (res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        this.message = error.message;
      }
    );
  }

}
