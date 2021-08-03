import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.checkIsLogin()
  }
  checkIsLogin() {
    if (!this.authService.isLogin()){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
