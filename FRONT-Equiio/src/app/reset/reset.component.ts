import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Response} from '../models/response.model';
import {AlertService} from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss', './../app.component.scss'],
})

export class EquiioResetComponent implements OnInit {
  public resetPwdForm: FormGroup;
  public loginSubmitted = false;
  public errorLog = '';

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentSessionValue) {
      this.router.navigate(['/']);
    }
  }

  public ngOnInit(): void {
    this.resetPwdForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  // Getter for easy access to form fields
  get flog(): { [p: string]: AbstractControl } { return this.resetPwdForm.controls; }

  // Submit Login form
  public onSubmitResetPwd(): void {
    this.loginSubmitted = true;

    // stop here if form is invalid
    if (this.resetPwdForm.invalid) {
      return;
    }

    this.authenticationService.resetPassword(this.flog.email.value)
      .subscribe((response: Response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
        }
      });
  }
}
