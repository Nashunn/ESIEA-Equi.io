import { Component, OnInit } from '@angular/core';
import {NbLoginComponent} from '@nebular/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class EquiioLoginComponent extends NbLoginComponent implements OnInit {
  public ngOnInit(): void {
  }
}
