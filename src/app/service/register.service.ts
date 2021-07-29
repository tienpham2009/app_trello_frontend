import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }


  register(user: any):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, user)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
