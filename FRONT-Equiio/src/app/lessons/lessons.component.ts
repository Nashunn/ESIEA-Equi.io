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
import {UsersHorsesLessonsServices} from '../services/usersHorsesLessons.services';
import { LessonsAddDialogComponent } from './add-dialog/lessons-add-dialog.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  providers: [ LessonService, UsersHorsesLessonsServices, AlertComponent, NbDialogService, { provide: NB_DIALOG_CONFIG, useValue: {}} ],
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
    private userHorseLessonService: UsersHorsesLessonsServices,
    private alertService: AlertService,
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

  public getLessons(): void {
    if (this.userRole === Roles.Teacher) {
      this.getLessonTeacher();
    } else if (this.userRole === Roles.User) {
      this.getLessonUser();
    }
  }

  private separateNextAndOtherLessons(): void {
    this.nextLessons = [];
    this.otherLessons = [];
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

  private getLessonUser(): void {
    this.userHorseLessonService.getUHLsByUser(this.userId).subscribe((data) => {
      const uhlsData = data;
      this.allLessons = []; // empty it
      console.log(uhlsData);
      /*uhlsData.forEach((value) => {
        this.allLessons.push(value.lessonId[0]); // add lesson to allLessons
      });*/
      this.separateNextAndOtherLessons();
    },
    (err) => {
      this.isLoading = false;
      this.alertService.error('Erreur lors de la récupération des leçons');
    },
    () => this.isLoading = false,
    );
  }

  public openLessonDetails(id: string): void {
    this.router.navigate(['/lesson', id]);
  }

  public openAddLessonModal(lesson?: Lesson): void {
    // If no lesson are passed as arg
    if (!lesson) {
      lesson = new Lesson('', Date.now(), '', 1, 0, '');
    }

    this.dialogService.open(LessonsAddDialogComponent, {
      context: {
        lesson,
      },
    }).onClose.subscribe((addedLesson) => addedLesson && this.getLessons());
  }
}
