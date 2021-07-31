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
    let token =localStorage.getItem('token')
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token  );
    return this.http.get(`${environment.apiUrl}/auth/boards` , {headers: headers_object} );
  }

  addBoard(data: any): Observable<any> {
    let token =localStorage.getItem('token')
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    return this.http.post(`${environment.apiUrl}/auth/boards`, data , {headers: headers_object});
  }
}