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
    return this.http.post(`${environment.apiUrl}/auth/login` , data)
  }

  isLogin(): any {
    return localStorage.getItem('token');
  }

}
