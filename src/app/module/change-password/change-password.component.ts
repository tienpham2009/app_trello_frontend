import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formChangePassword !: FormGroup;
  message !: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
      old_password: [],
      new_password: [],
      new_password_confirmation: [],
    })
  }

  changePassword() {
    let formData = this.formChangePassword.value
    this.authService.changePassword(formData).subscribe(res => {
      console.log(res)
      this.message = res.message
    }, error => {
      console.log(error)
     if(error.error['old_password'] && error.error['new_password']){
        this.message = error.error['old_password'] + error.error['new_password']
     }else {
       this.message = error.error
     }
    })
  }
}
