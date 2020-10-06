import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './../app.component.scss'],
})
export class EquiioLoginComponent implements OnInit {
  public ngOnInit(): void {
  }
}
