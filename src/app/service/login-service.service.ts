import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  checkLogin(data: any) : Observable<any>{
    return this.http.post(`${environment.url}` , data)
  }

  isLogin(){
    return localStorage.getItem('token');
  }

}
