import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/service/board-service.service';
import { GroupService } from 'src/app/service/group.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  modifiers: any[] = [
    {
      value: 1,
      name: 'Rieng tu',
    },
    {
      value: 2,
      name: 'Nhom',
    },
    {
      value: 3,
      name: 'Cong Khai',
    },
  ];

  modifierGroups: any[] = [
    {
      value: 1,
      name: 'Rieng tu',
    },
    {
      value: 2,
      name: 'cong khai',
    },
  ];

  formAddGroup: FormGroup | undefined;
  formAddBoard: FormGroup | undefined;

  dataBoards: any[] = [];
  dataGroups: any;
  constructor(
    private boarService: BoardService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.formAddBoard = this.fb.group({
      title: ['', [Validators.required]],
      modifier: ['', [Validators.required]],
      group: ['', [Validators.required]],
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
    });
  }

  submitFormAddBoard() {
    const data = this.formAddBoard?.value;
    this.boarService.addBoard(data).subscribe((res) => {
      this.notifyService.showSuccess(res.message, 'congratulations');
      this.getGroupByUserId();
      this.formAddBoard?.reset();
    });
  }

  submitFormAddGroup() {
    const data = this.formAddGroup?.value;
    this.groupService.addGroup(data).subscribe((res) => {
      this.formAddBoard?.reset();
      this.getGroupByUserId();
    });
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

  get name() {
    return this.formAddGroup?.get('name');
  }

  get modifierGroup() {
    return this.formAddGroup?.get('modifierGroup');
  }

  get group() {
    return this.formAddGroup?.get('groups');
  }
}
