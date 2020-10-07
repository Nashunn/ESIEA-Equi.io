import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import {
  NbActionsModule, NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSidebarModule,
  NbTooltipModule,
  NbSpinnerModule,
  NbTreeGridModule, NbUserModule,
} from '@nebular/theme';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import {AlertComponent} from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
//import { LoginComponent } from './login/login.component';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    // LoginComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3080',
          login: {
            endpoint: '/auth/sign-in',
            method: 'post',
          },
          register: {
            endpoint: '/auth/sign-up',
            method: 'post',
          },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
          },
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
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
    FormsModule,
    NbAlertModule,
    NbUserModule,
  ],
  providers: [],
})
export class AppModule { }
