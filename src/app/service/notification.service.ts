import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  success(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private toastr: ToastrService) { }


  showSuccess(message : any, title: any,){
    this.toastr.success(message, title)
}
}
