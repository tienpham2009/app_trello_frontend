import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../service/notification.service";
import {BoardService} from "../../service/board-service.service";

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {
  image!: File;

  constructor(private toast: NotificationService,
              private boardService: BoardService,
  ) { }

  ngOnInit(
  ): void {
  }
  showToast(){
    this.toast.showSuccess('Thành công','Lưu ảnh');
  }
  changeAvatar($event: any) {
    this.image = $event.target.files[0];
  }
  uploadAvatar(){
    const data = new FormData();
    data.append('image',this.image);
    this.boardService.addImage(data).subscribe((res:any) =>
    {
     this.showToast()
      localStorage.setItem('user',JSON.stringify(res.user));
    })
  };

}