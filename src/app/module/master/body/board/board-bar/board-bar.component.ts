import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogMemberComponent } from 'src/app/dialog/dialog-member/dialog-member.component';
import { BoardService } from 'src/app/service/board-service.service';
import { UserBoard } from 'src/app/user-board';

@Component({
  selector: 'app-board-bar',
  templateUrl: './board-bar.component.html',
  styleUrls: ['./board-bar.component.css'],
})
export class BoardBarComponent implements OnInit {
  users: any;
  $board_id!: number;
  userBoards: UserBoard[] = [];
  board: any;

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public boardService: BoardService
  ) {}

  ngOnInit(): void {
    let board_id = this.route.snapshot.paramMap.get('id');
    this.getBoard(board_id);
  }
  openDialog() {
    this.dialog.open(DialogMemberComponent, {
      data: {
        dataKey: this.route.snapshot.params.id,
      },
    });
  }
  getAllUser() {
    // @ts-ignore
    let board_id = +this.route.snapshot.paramMap.get('id');
    console.log(board_id);
    this.boardService.showAllUser(board_id).subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
  }

  getBoard(board_id: any) {
    this.boardService.getBoard(board_id).subscribe((res) => {
      this.board = res;
    });
  }
}
