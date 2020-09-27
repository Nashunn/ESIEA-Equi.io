import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert } from '../models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  public onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  public success(message: string, options?: any): void {
    this.alert(new Alert({ ...options, status: 'success', message }));
  }

  public error(message: string, options?: any): void {
    this.alert(new Alert({ ...options, status: 'danger', message }));
  }

  public info(message: string, options?: any): void {
    this.alert(new Alert({ ...options, status: 'info', message }));
  }

  public warn(message: string, options?: any): void {
    this.alert(new Alert({ ...options, status: 'warning', message }));
  }

  public alert(alert: Alert): void {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  public clear(id = this.defaultId): void {
    this.subject.next(new Alert({ id }));
  }
}
