import { Component, OnInit } from '@angular/core';
import{ MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogMemberComponent } from 'src/app/dialog/dialog-member/dialog-member.component';

@Component({
  selector: 'app-board-bar',
  templateUrl: './board-bar.component.html',
  styleUrls: ['./board-bar.component.css']
})
export class BoardBarComponent implements OnInit {

  constructor(public dialog: MatDialog,
    public route:ActivatedRoute) { }

  ngOnInit(): void {
  }
openDialog(){
  this.dialog.open(DialogMemberComponent ,{data : {
    dataKey: this.route.snapshot.params.id
  }
});
}




}

