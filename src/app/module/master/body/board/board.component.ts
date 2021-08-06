import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListServiceService} from '../../../../service/list-service.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CardService} from "../../../../service/card.service";
import {NotificationService} from "../../../../service/notification.service";
import { MatDialog } from '@angular/material/dialog';
import { CardInfoComponent } from 'src/app/dialog/card-info/card-info.component';

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
  hiddenInput: number | undefined;
  board: any;

  constructor(
    private fb: FormBuilder,
    private listService: ListServiceService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private dialog : MatDialog
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
    this.cardService.storeCard(formAddData).subscribe(res => {
      this.notifyService.showSuccess(res.message, 'Thông báo');
      this.hiddenFormAddCard(i);
      this.getListByBoardId();
    })
  }

  getListByBoardId() {
    // @ts-ignore
    let board_id = +this.route.snapshot.paramMap.get('id');
    this.listService.getListByBoardId(board_id).subscribe((res) => {
      this.lists = res.lists;
      console.log(this.lists);
      this.setHiddenForCard(this.lists)
    });
  }


  hidden() {
    this.isHiddenFormAddList = !this.isHiddenFormAddList;
  }

  hiddenFormAddCard(index: any) {
    this.isHiddenFormAddCard[index] = !this.isHiddenFormAddCard[index]
    for (let i = 0; i < this.lists.length; i++) {
      if (this.isHiddenFormAddCard[i] === this.isHiddenFormAddCard[index] && i !== index) {
        this.isHiddenFormAddCard[i] = true
      }
    }
  }

  dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
      this.listService.moveList(this.lists).subscribe((res) => {
        console.log(res)
      });
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

  dropCard(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    for (let i = 0; i < this.lists.length; i++) {
        this.lists[i].cards['list_id'] = this.lists[i]['id']
    }
    // @ts-ignore
    event.container.data[event.currentIndex].list_id = event.container.data.list_id
    this.cardService.moveCard(event.previousContainer.data).subscribe(res=>{
      console.log(res)
    })
    this.cardService.moveCard(event.container.data).subscribe(res=>{
      console.log(res)
    })
  }

  showCard(number: number): void {
   const dialogRef = this.dialog.open(CardInfoComponent , {
      width: '40rem',
      height: '45rem',
      data:
      {
        number: number,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getListByBoardId()
    });
  }

  

}
