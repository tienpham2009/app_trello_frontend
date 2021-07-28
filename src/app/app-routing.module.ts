import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './module/login/login.component';
import { RegisterComponent } from './module/register/register.component';

const routes: Routes = [
  {
    path: 'master',
    loadChildren: () => import('./module/master/master.module').then(module => module.MasterModule),
    // canActivate:[AuthGuard]
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
