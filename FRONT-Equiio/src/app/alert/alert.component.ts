import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert } from '../models/alert.model';
import { AlertService } from '../services/alert.service';

@Component({ selector: 'app-alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
  @Input() public id = 'default-alert';
  @Input() public fade = true;

  public alerts: Alert[] = [];
  public alertSubscription: Subscription;
  public routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  public ngOnInit(): void {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe((alert) => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach((x) => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 300);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  public ngOnDestroy(): void {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  public removeAlert(alert: Alert): void {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) { return; }

    if (this.fade) {
      // fade out alert
      this.alerts.find((x) => x === alert).fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter((x) => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter((x) => x !== alert);
    }
  }
}
