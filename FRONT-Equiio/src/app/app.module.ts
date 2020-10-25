import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbActionsModule, NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbTreeGridModule, NbUserModule,
} from '@nebular/theme';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { HomeComponent } from './home/home.component';
import { HorsesAddHorseDialogComponent } from './horses/horses-add-horse-dialog.component';
import { HorsesComponent } from './horses/horses.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { LessonsComponent } from './lessons/lessons.component';
import {LessonsAddDialogComponent} from "./lessons/lessons-add-dialog.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HorsesAddHorseDialogComponent,
    HorsesComponent,
    UserComponent,
    UsersComponent,
    HomeComponent,
    AlertComponent,
    LessonsComponent,
    LessonsAddDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbTreeGridModule,
    NbCardModule,
    NbInputModule,
    NbActionsModule,
    NbTooltipModule,
    HttpClientModule,
    NbSpinnerModule,
    NbAlertModule,
    Ng2SmartTableModule,
    NbUserModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AppModule { }
