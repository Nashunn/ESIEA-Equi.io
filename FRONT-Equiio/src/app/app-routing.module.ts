import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {HomeComponent} from './home/home.component';
import {HorsesComponent} from './horses/horses.component';
import {LessonsComponent} from './lessons/lessons.component';
import {Roles} from './models/roles.model';
import {UserComponent} from './user/user.component';
import {UsersComponent} from './users/users.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then((m) => m.NgxAuthModule),
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard], // secured
    data: {roles: [Roles.User, Roles.Teacher, Roles.Admin]},
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard], // secured
    data: {roles: [Roles.Admin]},
  },
  {
    path: 'horses',
    component: HorsesComponent,
    canActivate: [AuthGuard], // secured
    data: {roles: [Roles.Admin]},
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    canActivate: [AuthGuard], // secured
    data: {roles: [Roles.User, Roles.Teacher, Roles.Admin]},
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
