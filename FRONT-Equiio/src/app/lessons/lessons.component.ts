import { Component, OnInit } from '@angular/core';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../alert/alert.component';
import {Lesson} from '../models/lesson.model';
import { Roles } from '../models/roles.model';
import { Session } from '../models/session.model';
import {AlertService} from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import {LessonService} from '../services/lesson.service';
import { LessonsAddDialogComponent } from './lessons-add-dialog.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  providers: [ LessonService, AlertComponent, NbDialogService, { provide: NB_DIALOG_CONFIG, useValue: {}} ],
})

export class LessonsComponent implements OnInit {
  public userRole: string;
  public Roles = Roles;
  public session: Session;
  public isLoading = true;
  public lessons: Lesson[]; // array of lessons

  constructor(
    private authenticationService: AuthenticationService,
    private dialogService: NbDialogService,
    private lessonService: LessonService,
    private alertService: AlertService,
  ) {
    this.authenticationService.currentSession.subscribe((session) => {
      this.session = session;
      if (this.session !== null) {
        this.userRole = this.session.getUserRole();
      }
    });
  }

  public ngOnInit(): void {
    this.getLesson();
  }

  private getLesson(): void {
    this.lessonService.getLesson().subscribe((data) => {
        this.lessons = data;
      },
      (err) => {
        this.isLoading = false;
        this.alertService.error('Erreur lors de la récupération des leçons');
      },
      () => this.isLoading = false,
    );
  }

  public openAddLessonModal(lesson?: Lesson): void {
    // If no lesson are passed as arg
    if (!lesson) {
      lesson = new Lesson('', Date.now(), 1, '', '');
    }

    this.dialogService.open(LessonsAddDialogComponent, {
      context: {
        lesson,
      },
    }).onClose.subscribe((addedLesson) => addedLesson && this.getLesson());
  }
}
