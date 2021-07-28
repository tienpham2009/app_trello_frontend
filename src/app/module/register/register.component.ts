import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
formRegister!:FormGroup

  constructor(private fb: FormBuilder,
              ) { }

  ngOnInit(): void {
  this.formRegister= this.fb.group({
    name:['',Validators.required],
      email: ['',Validators.required],
      phone:['',Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})') ],
      password: ['',Validators.required],
      password_confirmation : ['',Validators.required]
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
  submit(){
    let userData = this.formRegister?.value
    console.log(userData)
    // this.authService.register(userData).subscribe(res => {
    //   this.message = res.message
    //
    // })
  }
  get name(){
    return this.formRegister?.get('name')
  }
  get email(){
    return this.formRegister?.get('email')
  }
  get phone(){
    return this.formRegister?.get('phone')
  }

  get password(){
    return this.formRegister?.get('password')
  }
  get password_confirmation(){
    return this.formRegister?.get('password_confirmation')
  }

}
