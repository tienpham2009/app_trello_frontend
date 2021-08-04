import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyRoutingModule } from './body-routing.module';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ReactiveFormsModule} from "@angular/forms";
import { AddUserGroupComponent } from './home/add-user-group/add-user-group.component';



@NgModule({
  declarations: [
    BoardComponent,
    HomeComponent,
    NavbarComponent,
    AddUserGroupComponent

  ],
  imports: [
    CommonModule,
    BodyRoutingModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class BodyModule { }
