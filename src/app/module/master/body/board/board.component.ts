import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ListServiceService} from "../../../../service/list-service.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  formAddList !: FormGroup

  constructor(
    private fb: FormBuilder,
    private listService:ListServiceService
  ) {
  }

  ngOnInit(): void {
    this.formAddList = this.fb.group({
      title: [''],
      board_id: ['1'],
    })
  }

  addList() {
  let list_data=this.formAddList?.value
    this.listService.storeList(list_data).subscribe(res => {
      console.log(res)
    })
    console.log(list_data)
  }


}
