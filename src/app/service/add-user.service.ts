import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserBoard } from '../user-board';


@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  userBoard: UserBoard[] =[];

  constructor(private http:HttpClient) { }
  add(userBoard:UserBoard ): Observable<any> {
    return this.http.post(environment.apiUrl + '/add_user', userBoard);
  }
}
