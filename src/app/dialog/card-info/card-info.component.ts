import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CardService} from 'src/app/service/card.service';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css'],
})
export class CardInfoComponent implements OnInit {
  card: any;
  comments: any;
  formComment!: FormGroup;
  isHiddenInputTitle: boolean = false;
  isHiddenInputContent: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CardInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService,
    private fb: FormBuilder,
    private route:Router,
    private router:ActivatedRoute,
    private notifyService: NotificationService
  ) {
  }

  ngOnInit(): void {
    let card_id = this.data.number;
    this.getAll(card_id);
    this.formComment = this.fb.group({
      comment: [''],
    });
  }

  getAll(card_id: any) {
    this.cardService.getCard(card_id).subscribe((res) => {
      this.card = res.card;
      this.comments = res.comments;
      console.log(res);
      console.log(this.card);
    });
  }

  setHiddenInputTitle(): void {
    this.isHiddenInputTitle = !this.isHiddenInputTitle
  }

  setHiddenInputContent(): void {
    this.isHiddenInputContent = !this.isHiddenInputContent
  }

  addComment(): void {
    let data = this.formComment?.value;
    let card_id = this.data.number;
    data.card_id = this.data.number;
    console.log(data);
    if (data.comment != '') {
      this.cardService.addComment(data).subscribe((res) => {
        this.getAll(card_id);
      });
    }
    this.formComment.reset();
  }

  updateCard(): void {
    this.cardService.updateCard(this.card).subscribe(res => {
      this.notifyService.showSuccess(res.status,'Thông báo:')
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
