import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  message!: string;
  errormessage:string = 'Mật khẩu không khớp';
  isConfirm:boolean=true
  toastrMessage!:any;

  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router:Router,
              private notifyService: NotificationService,

  ) {
  }

  ngOnInit(): void {
    this.authService.currentMessage.subscribe(message => this.message = message);

    this.formRegister = this.fb.group({
        name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
        email: ['', [Validators.required,Validators.email]],
        phone: ['', [Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})'),Validators.required]],
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

  register() {
    let userData = this.formRegister?.value
   this.authService.register(userData).subscribe(res => {
     console.log(res)
     this.toastrMessage='Đăng kí thành công'
     this.showToaster()
     this.router.navigate(['/login'])
   },error => {
     console.log(error.error)

     if (error.error.email){
       this.toastrMessage=error.error.email;
       this.notifyService.showError(this.toastrMessage,'Thông báo')
     }

     if (error.error.phone){
       this.toastrMessage=error.error.phone;
       this.notifyService.showError(this.toastrMessage,'Thông báo')
     }
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

  showToaster() {
    this.notifyService.showSuccess(
      this.toastrMessage,
      'Notification'
    );
  }
}
