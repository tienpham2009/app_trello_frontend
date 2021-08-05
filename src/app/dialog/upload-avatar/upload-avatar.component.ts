import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../service/notification.service";
import {BoardService} from "../../service/board-service.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CardInfoComponent} from "../card-info/card-info.component";

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {
  image!: File;

  constructor(private toast: NotificationService,
              private boardService: BoardService,
              public dialogRef: MatDialogRef<CardInfoComponent>,

  ) { }

  ngOnInit(): void {
  }

  changeAvatar($event: any) {
    this.image = $event.target.files[0];
  }
  uploadAvatar(){
    const data = new FormData();
    data.append('image',this.image);
    console.log(data)
    this.boardService.addImage(data).subscribe((res:any) =>
    {
      console.log(res)
      this.toast.showSuccess('Thành công','Lưu ảnh');
      localStorage.setItem('user',JSON.stringify(res.user));
    })
  };

}
