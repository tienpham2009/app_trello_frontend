import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListServiceService} from '../../../../service/list-service.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

// import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  formAddList!: FormGroup;
  formAddCard!: FormGroup;
  lists: any;
  isHiddenFormAddList: boolean = true;
  isHiddenFormAddCard: Array<any> = [];
  location: any;
  listId: any;
  hiddenInput: number | undefined;

  constructor(
    private fb: FormBuilder,
    private listService: ListServiceService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    let board_id = +this.route.snapshot.paramMap.get('id');
    this.getListByBoardId();
    this.formAddList = this.fb.group({
      title: ['', [Validators.required]],
      board_id: [board_id],
    });
    this.formAddCard = this.fb.group({
      title: [''],
      contend: [],
      list_id: [''],

    })
  }

  setHiddenForCard(lists: any) {
    for (let i = 0; i < lists.length; i++) {
      this.isHiddenFormAddCard.push('true')
    }
  }

  addList() {
    let board_id = this.route.snapshot.paramMap.get('id');
    let list_data = this.formAddList?.value;
    list_data.board_id = board_id;
    this.listService.storeList(list_data).subscribe((res) => {
      this.getListByBoardId();
      this.formAddList.reset();
      this.hidden();
    });
  }

  addCard(i: number) {
    let ListId = this.lists[i].id;
    let formAddData = this.formAddCard.value;
    formAddData.list_id = ListId
    console.log(formAddData);
  }

  getListByBoardId() {
    // @ts-ignore
    let board_id = +this.route.snapshot.paramMap.get('id');
    this.listService.getListByBoardId(board_id).subscribe((res) => {
      this.lists = res.list;
      this.setHiddenForCard(this.lists)
    });
  }

  hidden() {
    this.isHiddenFormAddList = !this.isHiddenFormAddList;
  }

  hiddenFormAddCard(listId: any) {
    this.isHiddenFormAddCard[listId] = !this.isHiddenFormAddCard[listId]

    for (let i = 0; i < this.lists.length; i++) {
      if (this.isHiddenFormAddCard[i] === this.isHiddenFormAddCard[listId] && i !== listId) {
        this.isHiddenFormAddCard[i] = true
      }
    }
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

  isHiddenInput(title: any, listId: any) {
    this.hiddenInput = -1;
    console.log(listId);
    console.log(title);
    let data = {
      listId: listId,
      newTitle: title
    };
    this.listService.changeTitle(data).subscribe(() => {
      this.getListByBoardId()
    });
  }

  showInput(listId: any) {
    this.hiddenInput = listId;
  }
}
