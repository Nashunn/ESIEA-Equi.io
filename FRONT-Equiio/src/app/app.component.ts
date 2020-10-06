import { Component } from '@angular/core';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public user = {};
  public tokenValid = false;

  constructor(private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.tokenValid = token.isValid();
          this.user = token.getPayload();
        }

      });
  }

  public title = 'Equi.io';
}
