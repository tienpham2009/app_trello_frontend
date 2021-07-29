import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyRoutingModule } from './body-routing.module';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    BoardComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BodyRoutingModule
  ]
})
export class BodyModule { }
