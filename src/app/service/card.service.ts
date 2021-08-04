import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  setHeader() {
    let token = localStorage.getItem('token')
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    return {
      headers: headers_object
    };
  }

  getCard(card_id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/card/${card_id}/get` , this.setHeader())
  }

  storeCard(dataCard:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/list/changeTitle` , dataCard , this.setHeader())
  }
  
}
