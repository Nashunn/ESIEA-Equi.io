import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {UsersComponent} from './users/users.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard], // secured
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then((m) => m.NgxAuthModule),
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
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
