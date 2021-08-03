import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/service/board-service.service';
import { NotificationService } from 'src/app/service/notification.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
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

  formAddBoard: FormGroup | undefined;

  dataBoards: any;
  constructor(
    private boarService: BoardService,
    private fb: FormBuilder,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.formAddBoard = this.fb.group({
      title: ['' , [Validators.required]],
      modifier: ['' , [Validators.required]],
    });
    this.getBoardByUserId();
  }

  getBoardByUserId() {
    this.boarService.getBoardByUserId().subscribe((res) => {
      this.dataBoards = res.data;
    });
  }

  submitForm() {
    const data = this.formAddBoard?.value;
    this.boarService.addBoard(data).subscribe((res) => {
      this.notifyService.showSuccess(res.message , "congratulations")
      this.getBoardByUserId();
      console.log(res);
      this.formAddBoard?.reset();
    });
  }

  resetForm() {
    this.formAddBoard?.reset();
  }

  get title () {
    return this.formAddBoard?.get('title');
  }

  get modifier () {
    return this.formAddBoard?.get('modifier');
  }
  // tu
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
      this.userEmails.push({email: value});
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

}
