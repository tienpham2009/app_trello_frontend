import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();


  constructor(private http:HttpClient) { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  checkLogin(data: any) : Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/login` , data)
  }

  isLogin(): any {
    return localStorage.getItem('token');
  }



  register(user: any):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, user)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
