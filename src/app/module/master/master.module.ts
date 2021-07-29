import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BoardComponent} from "./body/board/board.component";


@NgModule({
  declarations: [
    MasterComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MasterModule { }
