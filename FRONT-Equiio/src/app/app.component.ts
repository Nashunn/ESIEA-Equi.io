import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})

export class AppComponent {
  public title = 'Equi.io';
  public currentUser: User;
  public tokenValid = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (this.currentUser !== null) {
        this.tokenValid = !!this.currentUser.token;
      }
    });
  }

  public logout(): void {
    this.authenticationService.logout();
    this.tokenValid = false;
    this.router.navigate(['/auth/login']);
  }
}
