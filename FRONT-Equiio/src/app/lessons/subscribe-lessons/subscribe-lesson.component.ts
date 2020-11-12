import { Component, OnInit } from '@angular/core';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../../alert/alert.component';
import {Lesson} from '../../models/lesson.model';
import { Roles } from '../../models/roles.model';
import {Session} from '../../models/session.model';
import {UserHorseLesson} from '../../models/userHorseLesson.model';
import {AlertService} from '../../services/alert.service';
import {AuthenticationService} from '../../services/authentication.service';
import {LessonService} from '../../services/lesson.service';
import {UsersHorsesLessonsService} from '../../services/usersHorsesLessons.service';

@Component({
  selector: 'app-subscribe-lesson',
  templateUrl: './subscribe-lesson.component.html',
  styleUrls: ['./../lessons.component.scss'],
  providers: [ LessonService, UsersHorsesLessonsService, AlertComponent, NbDialogService, { provide: NB_DIALOG_CONFIG, useValue: {}} ],
})
export class SubscribeLessonComponent implements OnInit {
  public userRole: string;
  public userId: string;
  public session: Session;
  public isLoading = true;
  public Roles = Roles;
  public allLessons: Lesson[] = []; // array of all lessons
  public diplayedLessons: Lesson[] = []; // array of non-subscribed lessons
  public subsLessons: UserHorseLesson[] = []; // array of subscribed lessons (UHL)

  constructor(
    private authenticationService: AuthenticationService,
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
    this.prepareLessons();
  }

  public getLessons(): void {
    // Get all lessons available
    this.lessonService.getLessons().subscribe((data) => {
        this.allLessons = data;
        this.prepareDisplayedLessons();
      },
      (err) => {
        this.isLoading = false;
        this.alertService.error('Erreur lors de la récupération des leçons');
      },
      () => this.isLoading = false,
    );
  }

  private prepareDisplayedLessons(): void {
    const lessonsIds = [];
    const uhlsIds = [];
    this.diplayedLessons = [];

    this.allLessons.every((v) => lessonsIds.push(v.id));
    this.subsLessons.every((v) => uhlsIds.push(v.lessonId._id));

    lessonsIds.forEach((id) => {
      if (!uhlsIds.includes(id)) {
        this.diplayedLessons.push(this.allLessons.find((lesson) => lesson.id === id));
      }
    });
  }

  private prepareLessons(): void {
    // Begin to search UHL of the user, then all lessons
    this.userHorseLessonService.getUHLsByUser(this.userId).subscribe((data) => {
        this.subsLessons = data;
      },
      (err) => {
        this.isLoading = false;
        this.alertService.error('Erreur lors de la récupération des leçons');
      },
      () => this.getLessons(),
    );
  }

  public subscribeToLesson(lessonId): void {
    // create uhl
    const uhl = new UserHorseLesson(this.userId, null, lessonId);
    // request to add uhl
    this.userHorseLessonService.addUHLs(uhl).subscribe((response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
        }
    },
    (err) => {
        this.isLoading = false;
        this.alertService.error('Erreur lors de l\'inscription à la leçon');
    },
    () => this.prepareLessons(),
    );
  }
}
