import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CardService} from 'src/app/service/card.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css'],
})
export class CardInfoComponent implements OnInit {
  formChangeTitle!: FormGroup;
  card: any;
  isHiddenInputTitle: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CardInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    let card_id = this.data.number;
    this.cardService.getCard(card_id).subscribe((res) => {
      this.card = res.card;
    });
    this.formChangeTitle = this.fb.group({
      title:[],
      content:[]
    })
  }
  setHiddenInputTitle():void{
    this.isHiddenInputTitle = !this.isHiddenInputTitle
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeTitleCard():void {
    console.log(this.formChangeTitle)
  }
}
