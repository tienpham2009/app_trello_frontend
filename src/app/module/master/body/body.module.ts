import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyRoutingModule } from './body-routing.module';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BoardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BodyRoutingModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class BodyModule { }
