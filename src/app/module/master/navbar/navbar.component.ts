
import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../../../dialog/change-password/change-password.component";
import {UploadAvatarComponent} from "../../../dialog/upload-avatar/upload-avatar.component";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,DoCheck {
  userData:any;
constructor(private authService: AuthService,
              private router: Router,
            private dialog: MatDialog) {
  }
  ngOnInit(): void {
    // @ts-ignore
    this.userData = JSON.parse(localStorage.getItem('user'));
    if (this.userData.image === null){
      this.userData.image = "https://img.hoidap247.com/picture/answer/20210524/large_1621873431875.jpg"
    }
    this.checkLogin();
  }
  ngDoCheck() {
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

  checkLogin() {
    if (!this.authService.isLogin()){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }


  openDialogChangePassword(){
    this.dialog.open(ChangePasswordComponent)
  }
  openDialogUploadAvatar(){
    this.dialog.open(UploadAvatarComponent)
  }


}
