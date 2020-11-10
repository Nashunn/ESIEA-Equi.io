import {DatePipe} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../alert/alert.component';
import {Lesson} from '../models/lesson.model';
import { Roles } from '../models/roles.model';
import { Session } from '../models/session.model';
import {AlertService} from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import {LessonService} from '../services/lesson.service';
import { LessonsAddDialogComponent } from './add-dialog/lessons-add-dialog.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  providers: [ LessonService, AlertComponent, NbDialogService, DatePipe, { provide: NB_DIALOG_CONFIG, useValue: {}} ],
})

export class LessonsComponent implements OnInit {
  public userRole: string;
  public userId: string;
  public Roles = Roles;
  public session: Session;
  public isLoading = true;
  public allLessons: Lesson[]; // array of all lessons
  public nextLessons: Lesson[] = []; // array of next lessons
  public otherLessons: Lesson[] = []; // array of other lessons

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialogService: NbDialogService,
    private lessonService: LessonService,
    private alertService: AlertService,
    private datePipe: DatePipe,
  ) {
    this.authenticationService.currentSession.subscribe((session) => {
      this.session = session;
      if (this.session !== null) {
        this.userRole = this.session.getUserRole();
        this.userId = this.session.getUserId();
      }
    });
  }

  public ngOnInit(): void {
    this.getLessons();
  }

  private getLessons(): void {
    if (this.userRole === Roles.Teacher) {
      this.getLessonTeacher();
    } else if (this.userRole === Roles.User) {
      // this.getLessonUser();
    }
  }

  private separateNextAndOtherLessons(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.allLessons.forEach((value) => {
      if (value.date <= tomorrow.toISOString()) {
        this.nextLessons.push(value);
      } else {
        this.otherLessons.push(value);
      }
    });
  }

  private getLessonTeacher(): void {
    this.lessonService.getLessonsByTeacher(this.userId).subscribe((data) => {
        this.allLessons = data;
        this.separateNextAndOtherLessons();
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
    }).onClose.subscribe((addedLesson) => addedLesson && this.getLessons());
  }

  public openLessonDetails(id: string): void {
    this.router.navigate(['/lesson', id]);
  }
}
