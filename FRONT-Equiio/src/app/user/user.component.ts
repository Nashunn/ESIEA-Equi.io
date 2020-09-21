import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  public isEditMode = false;

  constructor() { }

  public ngOnInit(): void {
  }

  public toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

}
