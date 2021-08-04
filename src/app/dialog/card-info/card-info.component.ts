import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css'],
})
export class CardInfoComponent implements OnInit {
  
  card: any;

  constructor(
    public dialogRef: MatDialogRef<CardInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    let card_id = this.data.number;
    this.cardService.getCard(card_id).subscribe((res) => {
      this.card = res.card;
      console.log(this.card);
      
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
