import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasteComponent } from './module/maste/maste.component';
import { LoginComponent } from './module/login/login.component';
import { RegisterComponent } from './module/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    MasteComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
