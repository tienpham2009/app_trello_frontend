import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userData !: any;

  constructor(private authService: AuthService,
              private router: Router) {
  }
  ngOnInit(): void {
    // @ts-ignore
    this.userData = JSON.parse(localStorage.getItem('user'));
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



}
