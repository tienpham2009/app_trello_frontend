import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  checkLogin(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data)
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  isLogin() {
    console.log( !this.isTokenExpired(this.getToken()))
    return !this.isTokenExpired(this.getToken());
  }

  isTokenExpired(token: string | null): boolean {
    if (!token){
      return true;
    }
    const date = helper.getTokenExpirationDate(token);
    console.log(date);
    if (date === undefined) return false;
    // @ts-ignore
    return !(date.valueOf() > new Date().valueOf());
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/logout`, null, this.setHeader())
  }

  setHeader() {
    let token = localStorage.getItem('token')
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    return {
      headers: headers_object
    };
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, user)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  changePassword(data_password: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/change-password`, data_password, this.setHeader())
  }
}
