import { Component, OnInit } from '@angular/core';
import{ MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogMemberComponent } from 'src/app/dialog/dialog-member/dialog-member.component';
import { BoardService } from 'src/app/service/board-service.service';
import { UserBoard } from 'src/app/user-board';

@Component({
  selector: 'app-board-bar',
  templateUrl: './board-bar.component.html',
  styleUrls: ['./board-bar.component.css']
})
export class BoardBarComponent implements OnInit {
  users:any;
  $board_id!:number;
  userBoards :UserBoard[] = [];

  constructor(public dialog: MatDialog,
    public route:ActivatedRoute,
    public boardService:BoardService) { }

  ngOnInit(): void {
  }
openDialog(){
  this.dialog.open(DialogMemberComponent ,{data : {
    dataKey: this.route.snapshot.params.id
  }
});
}
getAllUser(){
   // @ts-ignore
   let board_id = +this.route.snapshot.paramMap.get('id');
   console.log(board_id);
  this.boardService.showAllUser(board_id).subscribe(res => {
    this.users = res;
    console.log(this.users);
  })
}




}


