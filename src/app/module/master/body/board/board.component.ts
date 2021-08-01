import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListServiceService } from '../../../../service/list-service.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  formAddList!: FormGroup;
  lists: any;
  isHiddenFormAddList: boolean = true;
  location: any;
  listId: any;
  hiddenInput: number | undefined;

  constructor(
    private fb: FormBuilder,
    private listService: ListServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    let board_id = +this.route.snapshot.paramMap.get('id');
    this.getListByBoardId();
    this.formAddList = this.fb.group({
      title: ['', [Validators.required]],
      board_id: [board_id],
    });
  }

  addList() {
    let list_data = this.formAddList?.value;
    console.log(list_data);
    
    this.listService.storeList(list_data).subscribe((res) => {
      this.getListByBoardId();
      this.formAddList.reset();
      this.hidden();
    });
  }

  getListByBoardId() {
    // @ts-ignore
    let board_id = +this.route.snapshot.paramMap.get('id');
    this.listService.getListByBoardId(board_id).subscribe((res) => {
      this.lists = res.list;
      console.log(this.lists);
    });
  }
  hidden() {
    this.isHiddenFormAddList = !this.isHiddenFormAddList;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.lists.length; i++) {
      let data = {
        location: i,
        listId: this.lists[i].id,
      };
      this.listService.moveList(data).subscribe(() => {
        this.getListByBoardId();
      });
    }
  }

  changeTitleList(element: any) {
    console.log(element);
  }

  isHiddenInput( title: any , listId: any) {
    this.hiddenInput = -1;
    console.log(listId);
    console.log(title);
    let data = {
      listId : listId,
      newTitle : title
    };
    this.listService.changeTitle(data).subscribe(() => {
      this.getListByBoardId()
    });
    
    
  }

  showInput(listId: any) {
    this.hiddenInput = listId;
  }
}
