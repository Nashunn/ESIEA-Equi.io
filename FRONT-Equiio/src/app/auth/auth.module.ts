import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule, NbCardModule,
  NbCheckboxModule,
  NbInputModule, NbSpinnerModule, NbTabsetModule,
} from '@nebular/theme';

import { EquiioLoginComponent } from '../login/login.component';
import { NgxAuthRoutingModule } from './auth-routing.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NgxAuthRoutingModule,
        NbAuthModule,
        NbCardModule,
        NbSpinnerModule,
        NbTabsetModule,
        ReactiveFormsModule,
    ],
  declarations: [
    EquiioLoginComponent,
  ],
})
export class NgxAuthModule {
}
