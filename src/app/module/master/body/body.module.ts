import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyRoutingModule } from './body-routing.module';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    BoardComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    BodyRoutingModule
  ]
})
export class BodyModule { }
