import { Component, OnInit } from '@angular/core';
import { Response } from '../models/response.model';
import {User} from '../models/user.model';
import {AlertService} from '../services/alert.service';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
  providers: [UserService],
})
export class UserComponent implements OnInit {
  public isEditMode = false;
  public isLoading = true;
  public user: User;
  public isChangePasswordMode = false;
  public oldPassword;
  public newPassword;
  public newPasswordConfirm;

  constructor(private authService: AuthenticationService, private userService: UserService, private alertService: AlertService) { }

  public ngOnInit(): void {
    this.getUser();
  }

  public toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  public toggleChangePasswordMode(): void {
    this.isChangePasswordMode = !this.isChangePasswordMode;
  }

  public cancelChangePassword(): void {
    this.isChangePasswordMode = false;
  }

  public isChangePasswordValid(): boolean {
    return this.oldPassword && this.newPassword && this.newPassword === this.newPasswordConfirm;
  }

  public toggleEditModeAndUpdateUser(): void {
    this.toggleEditMode();
    this.updateUser();
  }

  private getUser(): void {
    this.userService.getUser().subscribe(
      (data) => this.user = data,
      (err) => {
        this.isLoading = false;
        this.alertService.error('Error lors de la récupération de vos informations');
      },
      () => this.isLoading = false);
  }

  public updateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (response: Response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
        }
      },
      (err) => {
        this.alertService.error('Erreur lors de la mise à jour de vos informations');
      });
  }

  public changePassword(): void {
    this.toggleChangePasswordMode();
    this.authService.updatePassword(this.user.id, this.oldPassword, this.newPassword).subscribe(
      (response: Response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
        }
      },
      (err) => {
        this.alertService.error('Erreur lors de la mise à jour du mot de passe');
      });
  }
}
