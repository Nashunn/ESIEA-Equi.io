import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {Lesson} from '../models/lesson.model';
import { Roles } from '../models/roles.model';
import { Session } from '../models/session.model';
import {UserHorseLesson} from '../models/userHorseLesson.model';
import {AlertService} from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import {LessonService} from '../services/lesson.service';
import {UsersHorsesLessonsService} from '../services/usersHorsesLessons.service';
import { LessonsAddDialogComponent } from './add-dialog/lessons-add-dialog.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  providers: [ LessonService, UsersHorsesLessonsService, NbDialogService, { provide: NB_DIALOG_CONFIG, useValue: {}} ],
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
  private uhls = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialogService: NbDialogService,
    private lessonService: LessonService,
    private userHorseLessonService: UsersHorsesLessonsService,
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
      this.allLessons = []; // empty it
      data.forEach((value) => {
        const uhlInfo = { horse: (value.horseId ? value.horseId : 'non attribué'), uhl: value };
        this.uhls[value.lessonId.id] = uhlInfo;
        this.allLessons.push(value.lessonId); // add lesson to allLessons
      });
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

  public unsubscribeLesson(uhl: UserHorseLesson): void {
    this.userHorseLessonService.deleteUHL(uhl).subscribe((data) => {
      this.isLoading = true;
    },
    (err) => {
      this.isLoading = false;
      this.alertService.error('Erreur lors de la récupération des leçons');
    },
    () => {
      this.isLoading = false;
      this.getLessons();
    });
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
