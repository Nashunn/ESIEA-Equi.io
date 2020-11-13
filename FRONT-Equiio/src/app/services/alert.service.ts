import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {NbToastrService} from '@nebular/theme';
import { Alert } from '../models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  constructor(private toastrService: NbToastrService) {
  }

  public success(message: string, options?: any): void {
    this.toastrService.show('', message, {status: 'success'});
  }

  public error(message: string, options?: any): void {
    this.toastrService.show('', message, {status: 'danger'});
  }

  public info(message: string, options?: any): void {
    this.toastrService.show('', message, {status: 'info'});
  }

  public warn(message: string, options?: any): void {
    this.toastrService.show('', message, {status: 'warning'});
  }

  public alert(alert: Alert): void {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }
}
