import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import { BoardService } from 'src/app/service/board-service.service';


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
              private boardService: BoardService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authService.logout().subscribe(res => {
        console.log(res);
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

  {});

  }


}
