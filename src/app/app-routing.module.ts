import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './module/login/login.component';
import { BoardComponent } from './module/master/body/board/board.component';
import { HomeComponent } from './module/master/body/home/home.component';
import { MasterComponent } from './module/master/master.component';
import { RegisterComponent } from './module/register/register.component';

const routes: Routes = [
  {
    path: 'admin',
    component:MasterComponent,
    children : [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'board',
        component: BoardComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
