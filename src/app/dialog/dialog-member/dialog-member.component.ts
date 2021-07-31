import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddUserService } from 'src/app/service/add-user.service';




@Component({
  selector: 'app-dialog-member',
  templateUrl: './dialog-member.component.html',
  styleUrls: ['./dialog-member.component.css']
})
export class DialogMemberComponent implements OnInit {
  formAddUser: FormGroup | undefined;

  constructor (private fb: FormBuilder,
    private addMember: AddUserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.formAddUser = this.fb.group({
      user_id: ['', [Validators.required, Validators.email]],
      role_id:['',[Validators.required]]

    })
  }
submit(){
  const board_id = this.route.snapshot.params.id;
  this.formAddUser?.addControl('board_id',new FormControl(board_id));
  const userBoard = this.formAddUser?.value;

    this.addMember.add(userBoard).subscribe({
      next: (res:any) => {

      }
        });

}
getErrorMessageEmail() {
  if (this.email?.hasError('required')) {
    return 'You must enter a value';
  }
  return this.email?.hasError('email') ? 'Not a valid email' : '';
}
get email() {
  return this.formAddUser?.get('email')
}

}
