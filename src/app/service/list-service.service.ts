import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  constructor(private http: HttpClient) {
  }

  storeList(listData: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/list/store', listData, this.setHeader())
  }
  getListByBoardId(board_id:number):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/list/${board_id}/show`,this.setHeader())
  }

  setHeader() {
    let token = localStorage.getItem('token')
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    return {
      headers: headers_object
    };
  }
}
