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

  storeCard(dataCard: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/card/store`, dataCard, this.setHeader())
  }

  moveCard(dataCard: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/card/move`, dataCard, this.setHeader())
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
}
