import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
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

  constructor(private userService: UserService) { }

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
    console.log('update user');
    this.userService.updateUser(this.user).subscribe((response) => {});
  }
}
