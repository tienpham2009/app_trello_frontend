import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  hide = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb:FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
      old_password: ['',[Validators.required]],
      new_password: ['',[Validators.required]],
      new_password_confirmation: ['',[Validators.required]],
    })
  }
  changePassword() {
    let formData = this.formChangePassword.value
    console.log(formData);
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
