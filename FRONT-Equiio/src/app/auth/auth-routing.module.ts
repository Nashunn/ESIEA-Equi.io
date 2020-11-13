import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiioLoginComponent } from '../login/login.component';
import { EquiioResetComponent } from '../reset/reset.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: EquiioLoginComponent,
      },
      {
        path: 'logout',
        component: EquiioLoginComponent,
      },
      {
        path: 'reset',
        component: EquiioResetComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
