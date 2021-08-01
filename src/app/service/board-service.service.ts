import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getBoardByUserId(): Observable<any> {
    let token = localStorage.getItem('token');
    let headers_object = new HttpHeaders().set(
      'Authorization',
      'Bearer' + token
    );
    return this.http.get(`${environment.apiUrl}/board/get`, {
      headers: headers_object,
    });
  }

  addBoard(data: any): Observable<any> {
    let token = localStorage.getItem('token');
    let headers_object = new HttpHeaders().set(
      'Authorization',
      'Bearer' + token
    );
    return this.http.post(`${environment.apiUrl}/board/add`, data, {
      headers: headers_object,
    });
  }
  addImage(data:any): Observable<any> {
    let token =localStorage.getItem('token')
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    return this.http.post(environment.apiUrl + '/add_image', data, {headers: headers_object});
  }
}
