import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import {UserComponent} from './user/user.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'home',
    component: WelcomeComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
