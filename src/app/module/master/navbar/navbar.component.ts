import {Component,OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import { BoardService } from 'src/app/service/board-service.service';
import { Toast } from 'ngx-toastr';
import { NotificationService } from 'src/app/service/notification.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  image!: File;
  userData:any;
constructor(private authService: AuthService,
              private router: Router,
              private boardService: BoardService,
              private toast: NotificationService) {
  }
  ngOnInit(): void {
    // @ts-ignore
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.checkLogin();
  }

  logout() {
    this.authService.logout().subscribe(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error)
      })
  }

  changeAvatar($event: any) {
    this.image = $event.target.files[0];
  }
  onSubmit(){
    const data = new FormData();
    data.append('image',this.image);
    this.boardService.addImage(data).subscribe((res:any) =>
  {
    localStorage.setItem('user',JSON.stringify(res.user));
    // @ts-ignore
    this.userData = JSON.parse(localStorage.getItem('user'));
    console.log(res.user);

  })
};

  checkLogin() {
    if (!this.authService.isLogin()){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }

  showToast(){
      this.toast.showSuccess('Thành công','Lưu ảnh');
  }

}
