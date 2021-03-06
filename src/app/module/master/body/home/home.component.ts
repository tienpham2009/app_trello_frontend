import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/service/board-service.service';
import { GroupService } from 'src/app/service/group.service';
import { NotificationService } from 'src/app/service/notification.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Email {
  email: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  modifiers: any[] = [
    {
      value: 1,
      name: 'Riêng tư',
    },
    {
      value: 2,
      name: 'Nhóm',
    },
    {
      value: 3,
      name: 'Công Khai',
    },
  ];

  modifierGroups: any[] = [
    {
      value: 1,
      name: 'Riêng tư',
    },
    {
      value: 2,
      name: 'công khai',
    },
  ];

  formAddGroup: FormGroup | undefined;
  formAddBoard: FormGroup | undefined;
  dataBoards: any[] = [];
  dataGroups: any;
  dataImages: any;
  formAddUserGroup: FormGroup | undefined;
  data: any;
  id_group!: number;
  members: any;

  constructor(
    private boarService: BoardService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.formAddUserGroup = this.fb.group({
      email_array: ['', [Validators.required, Validators.email]],
      group_id: [''],
    });
    this.formAddBoard = this.fb.group({
      title: ['', [Validators.required]],
      modifier: ['', [Validators.required]],
      group: ['', [Validators.required]],
      image: [''],
    });

    this.formAddGroup = this.fb.group({
      name: ['', [Validators.required]],
      modifierGroup: ['', [Validators.required]],
    });

    this.getGroupByUserId();
  }

  getGroupByUserId() {
    this.groupService.getGroupByUserId().subscribe((res) => {
      this.dataGroups = res.groups;
      this.dataBoards = res.dataBoards;
      this.dataImages = res.images;
      console.log(this.dataBoards);
    });
  }

  submitFormAddBoard() {
    const data = this.formAddBoard?.value;
    this.boarService.addBoard(data).subscribe((res) => {
      this.notifyService.showSuccess(res.message, 'Thông báo');
      this.getGroupByUserId();
      this.formAddBoard?.reset();
    });
  }

  submitFormAddGroup() {
    const data = this.formAddGroup?.value;
    console.log(data);
    this.groupService.addGroup(data).subscribe((res) => {
      this.getGroupByUserId();
    });
    this.formAddBoard?.reset();
  }

  resetForm() {
    this.formAddBoard?.reset();
  }

  get title() {
    return this.formAddBoard?.get('title');
  }

  get modifier() {
    return this.formAddBoard?.get('modifier');
  }
  // add user group

  get name() {
    return this.formAddGroup?.get('name');
  }

  get modifierGroup() {
    return this.formAddGroup?.get('modifierGroup');
  }

  get group() {
    return this.formAddGroup?.get('groups');
  }
  //
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  userEmails: Email[] = [];
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.userEmails.push({ email: value });
      //     const group_id = this.data.dataKey;
      // this.formAddUserGroup?.addControl('group_id',new FormControl(group_id));
      const userGroup = this.userEmails.values;
      // console.log(userGroup);
      this.groupService.addUserGroup(userGroup).subscribe({
        next: (res: any) => {
          // this.toast.showSuccess('Thành công','Thêm thành viên');
          console.log(res);
        },
      });
      // console.log(this.userEmails)
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(userEmail: Email): void {
    const index = this.userEmails.indexOf(userEmail);

    if (index >= 0) {
      this.userEmails.splice(index, 1);
    }
  }
  getId(id: number) {
    this.id_group = id;
  }

  addUserGroup() {
    const userGroup = this.formAddUserGroup?.value;
    userGroup.email_array = this.userEmails;
    userGroup.group_id = this.id_group;
    this.groupService.addUserGroup(userGroup).subscribe({
      next: (res: any) => {
        this.notifyService.showSuccess('Thành công', 'Thêm thành viên');
      },
    });
  }

  showMember(group_id: any) {
    this.groupService.getUserGroup(group_id).subscribe((res) => {
      this.members = res.members;
    });
  }
}
