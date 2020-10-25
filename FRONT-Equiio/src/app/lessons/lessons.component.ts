import { Component, OnInit } from '@angular/core';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import { Roles } from '../models/roles.model';
import { Session } from '../models/session.model';
import { AuthenticationService } from '../services/authentication.service';
import { LessonsAddDialogComponent } from './lessons-add-dialog.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  providers: [ NbDialogService, { provide: NB_DIALOG_CONFIG, useValue: {}} ],
})
export class LessonsComponent {
  public userRole: string;
  public Roles = Roles;
  public session: Session;

  constructor(private authenticationService: AuthenticationService, private dialogService: NbDialogService) {
    this.authenticationService.currentSession.subscribe((session) => {
      this.session = session;
      if (this.session !== null) {
        this.userRole = this.session.getUserRole();
      }
    });
  }

  public openAddLessonModal(): void {
    this.dialogService.open(LessonsAddDialogComponent, {
      context: {},
    }).onClose.subscribe((addedLesson) => addedLesson);
  }

}
