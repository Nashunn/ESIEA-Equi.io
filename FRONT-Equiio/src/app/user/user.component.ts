import { Component, OnInit } from '@angular/core';
import {AlertComponent} from '../alert/alert.component';
import {User} from '../models/user.model';
import {AlertService} from '../services/alert.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
  providers: [UserService, AlertComponent],
})
export class UserComponent implements OnInit {
  public isEditMode = false;
  public isLoading = true;
  public user: User;

  constructor(private userService: UserService, private alertService: AlertService) { }

  public ngOnInit(): void {
    this.getUser();
  }

  public toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  public toggleEditModeAndUpdateUser(): void {
    this.toggleEditMode();
    this.updateUser();
  }

  private getUser(): void {
    this.userService.getUser().subscribe(
      (data) => this.user = data,
      (err) => console.log(err),
      () => this.isLoading = false);
  }

  public updateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
        }
      },
      (err) => {
        this.alertService.error('An error has occured.');
      });
  }
}
