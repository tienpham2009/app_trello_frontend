import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../service/register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  message:string = 'mat khau khong khop';
  isConfirm:boolean=true

  constructor(private fb: FormBuilder,
              private registerService:RegisterService,
              private router:Router,

  ) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
        name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
        email: ['', [Validators.required,Validators.email]],
        phone: ['', [Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
        password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(32)]],
        password_confirmation: ['', [Validators.required]]
      },
      {validator: this.ConfirmedValidator('password', 'password_confirmation')})
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  submit() {
    let userData = this.formRegister?.value
   this.registerService.register(userData).subscribe(res => {
     console.log(res)
     this.router.navigate(['/login'])
   })
  }

  get name() {
    return this.formRegister?.get('name')
  }

  get email() {
    return this.formRegister?.get('email')
  }

  get phone() {
    return this.formRegister?.get('phone')
  }

  get password() {
    return this.formRegister?.get('password')
  }

  get password_confirmation() {
    return this.formRegister?.get('password_confirmation')
  }

  checkPassword():void{
    let formData= this.formRegister?.value
    if (formData.password !== formData.password_confirmation){

      this.isConfirm=false
    }else {
      this.isConfirm=true
    }

  }
}
