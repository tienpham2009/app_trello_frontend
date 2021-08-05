import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/app/service/card.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css'],
})
export class CardInfoComponent implements OnInit {
  formEdit!: FormGroup;
  card: any;

  hidden:boolean =true;
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<CardInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.formEdit=this.fb.group({
      content:[]
    })
    let card_id = this.data.number;
    this.getCardById(card_id)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
  let data = this.formEdit?.value;
    console.log(data)
  }

  setHidden(){
    this.hidden=!this.hidden;
    console.log(this.hidden)
  }

  getCardById(id:number ){
    console.log(id)
    this.cardService.getCardById(id).subscribe((res) => {
      this.card = res.card;
      console.log(this.card);
    });
  }
}
