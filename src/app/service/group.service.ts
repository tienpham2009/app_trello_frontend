import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  setHeader() {
    let token = localStorage.getItem('token')
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    return {
      headers: headers_object
    };
  }
  
  addGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/group/add` , data , this.setHeader());
  }

  getGroupByUserId(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/group/get` , this.setHeader());
  }
  
  

}
