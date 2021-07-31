import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BoardService } from 'src/app/service/board-service.service';

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
  constructor(private boarService: BoardService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formAddBoard = this.fb.group({
      title: [''],
      modifier: [''],
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
    this.boarService.addBoard(data).subscribe( (res) => {
      this.getBoardByUserId();
        console.log(res);
        
    });
  }
}
