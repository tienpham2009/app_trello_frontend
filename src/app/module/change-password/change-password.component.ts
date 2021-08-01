import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formChangePassword !: FormGroup;
  message !: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService) {
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
      this.toastr.success(this.message,'Thông báo:')
    }, error => {
      console.log(error)
   if (error.error['old_password']){
     this.message = error.error['old_password'];
     this.toastr.error(this.message,'Thông báo:')
   }
   if (error.error['new_password']){
     this.message = error.error['new_password'];
     this.toastr.error(this.message,'Thông báo:')
   }
    })
  }



}
