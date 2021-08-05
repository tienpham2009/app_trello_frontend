import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/login/login.component';
import { RegisterComponent } from './module/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {  MatButtonModule } from '@angular/material/button';
import {  MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule} from '@angular/material/toolbar';
import { BoardBarComponent } from './module/master/body/board/board-bar/board-bar.component';
import { DialogMemberComponent } from './dialog/dialog-member/dialog-member.component';
import{ MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BoardComponent } from './module/master/body/board/board.component';
import { HomeComponent } from './module/master/body/home/home.component';
import { MasterComponent } from './module/master/master.component';
import { NavbarComponent } from './module/master/navbar/navbar.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCardModule} from "ng-zorro-antd/card";
import {MatCardModule} from '@angular/material/card';
import {ChangePasswordComponent} from "./dialog/change-password/change-password.component";
import { UploadAvatarComponent } from './dialog/upload-avatar/upload-avatar.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import { CardInfoComponent } from './dialog/card-info/card-info.component';



registerLocaleData(en);




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardComponent,
    MasterComponent,
    NavbarComponent,
    BoardBarComponent,
    DialogMemberComponent,
    ChangePasswordComponent,
    CardInfoComponent
    ],

  entryComponents:[
    DialogMemberComponent,
    ChangePasswordComponent,
    UploadAvatarComponent,
    CardInfoComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    DragDropModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzCardModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatListModule,
    MatLineModule,
    MatChipsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
