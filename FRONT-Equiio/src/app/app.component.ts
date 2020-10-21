import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from './models/roles.model';
import {Session} from './models/session.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'Equi.io';
  public session: Session;
  public tokenValid = false;
  public userRole: string;
  public Roles = Roles;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentSession.subscribe((session) => {
      this.session = session;
      if (this.session !== null) {
        this.tokenValid = !!this.session.getToken();
        this.userRole = this.session.getUserRole();
      }
    });
  }

  public logout(): void {
    this.authenticationService.logout();
    this.tokenValid = false;
  }
}
