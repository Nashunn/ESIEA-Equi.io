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
  public tokenValid = false;
  public currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe((x) => this.currentUser = x);
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }
}
