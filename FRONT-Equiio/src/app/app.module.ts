import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbEvaIconsModule } from '@nebular/eva-icons';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSidebarModule, NbTooltipModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { EquiioHeaderComponent } from './equiio-header/equiio-header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {UserComponent} from "./user/user.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    EquiioHeaderComponent,
    WelcomeComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbTreeGridModule,
    NbCardModule,
    NbInputModule,
    NbActionsModule,
    NbTooltipModule,
  ],
  providers: [],
})
export class AppModule { }
