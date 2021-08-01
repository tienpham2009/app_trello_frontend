import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddUserService } from 'src/app/service/add-user.service';
import { NotificationService } from 'src/app/service/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';




@Component({
  selector: 'app-dialog-member',
  templateUrl: './dialog-member.component.html',
  styleUrls: ['./dialog-member.component.css']
})
export class DialogMemberComponent implements OnInit {
  formAddUser: FormGroup | undefined;

  constructor (@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private addMember: AddUserService,
    private route: ActivatedRoute,
    private toast: NotificationService) { }

  ngOnInit(): void {
    console.log(this.data)

    this.formAddUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role_id:['',[Validators.required]]

    })
  }
submit(){

  const board_id = this.data.dataKey;
  this.formAddUser?.addControl('board_id',new FormControl(board_id));
  const userBoard = this.formAddUser?.value;
  console.log(userBoard);
  this.addMember.add(userBoard).subscribe({
      next: (res:any) => {
        this.toast.showSuccess('Thành công','Thêm thành viên');

      }
        });

}




}
