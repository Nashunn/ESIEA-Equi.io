import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../alert/alert.component';
import {Horse} from '../models/horse.model';
import {Lesson} from '../models/lesson.model';
import {Response} from '../models/response.model';
import {AlertService} from '../services/alert.service';
import {HorseService} from '../services/horse.service';
import {LessonService} from '../services/lesson.service';
import {UsersHorsesLessonsService} from '../services/usersHorsesLessons.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  providers: [LessonService, UsersHorsesLessonsService, HorseService, AlertComponent, NbDialogService, {
    provide: NB_DIALOG_CONFIG,
    useValue: {},
  }],
})
export class LessonComponent implements OnInit {
  public settings: any;
  public isLoading = true;
  public horsesLoading = true;
  public isEditMode = false;
  public lesson: Lesson; // actual lesson
  public tempLessonDate: Date; // form temp date
  public subscribers: any[] = [];
  public horses: Horse[] = [];

  constructor(
    private lessonService: LessonService,
    private alertService: AlertService,
    private userHorseLessonService: UsersHorsesLessonsService,
    private horseService: HorseService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    this.getLesson(lessonId);
    this.getHorses();
    this.getUHLsByLesson(lessonId);
  }

  private getLesson(lessonId: string): void {
    this.lessonService.getLesson(lessonId).subscribe((data) => {
        this.lesson = data;
        this.tempLessonDate = new Date(this.lesson.date);
      },
      (err) => {
        this.alertService.error('Erreur lors de la récupération de la leçon');
        this.router.navigate(['/lessons']);
      },
    );
  }

  public getUHLsByLesson(lessonId: string): void {
    this.userHorseLessonService.getUHLsByLesson(lessonId).subscribe((data) => {
        Object.values(data).forEach(
          (uhl: any) => {
            const subscriber = {
              id: uhl.id,
              userId: uhl.userId,
              horseId: uhl.horseId.id,
              horse: uhl.horseId,
              lessonId: uhl.lessonId,
              firstname: uhl.userId.firstname,
              lastname: uhl.userId.lastname,
              mail: uhl.userId.mail,
              phone: uhl.userId.phone,
              licence: uhl.userId.licence,
            };
            console.log(subscriber);
            this.subscribers.push(subscriber);
          },
        );
      },
      (err) => {
        this.isLoading = false;
        this.alertService.error('Erreur lors de la récupération des leçons');
      },
      () => this.isLoading = false);
  }

  private getHorses(): void {
    this.horseService.getHorses().subscribe(
      (data) => {
        this.horses = data;
      },
      (err) => {
        this.alertService.error('Erreur lors de la récupération des chevaux');
      },
      () => {
        this.generateTableSettings();
        this.horsesLoading = false;
      });
  }

  private toggleEditMode(): void {
    this.isEditMode = true;
  }

  private toggleEditModeAndUpdateLesson(): void {
    this.lesson.date = this.tempLessonDate.toISOString();
    this.lessonService.updateLesson(this.lesson).subscribe(
      (response: Response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
        }
      },
    );
    this.isEditMode = false;
  }

  public onUpdateConfirm(event): void {
    const newUhl = {
      id: event.newData.id,
      userId: event.newData.userId,
      horseId: event.newData.horseId,
      lessonId: event.newData.lessonId,
    };

    this.userHorseLessonService.updateUHL(newUhl).subscribe(
      (response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
          event.confirm.resolve(event.newData);
        }
      },
      (err) => {
        this.alertService.error('Erreur lors de la modification du cheval');
      });
  }

  public generateTableSettings(): void {
    this.settings = {
      actions: {
        position: 'right',
        delete: false,
      },
      hideSubHeader: true,
      edit: {
        confirmSave: true,
        editButtonContent: 'Modifier',
        saveButtonContent: 'Enregistrer',
        cancelButtonContent: 'Annuler',
      },
      columns: {
        firstname: {
          title: 'Prénom',
          editable: false,
        },
        lastname: {
          title: 'Nom',
          editable: false,
        },
        mail: {
          title: 'Mail',
          editable: false,
        },
        phone: {
          title: 'Téléphone',
          editable: false,
        },
        licence: {
          title: 'Licence',
          editable: false,
        },
        horse: {
          title: 'Cheval',
          valuePrepareFunction: (horse) => horse ? horse.name : '',
          editor: {
            type: 'list',
            config: {
              list: Object.values(this.horses).map((horse) => {
                return {value: horse.id, title: horse.name};
              }),
            },
          },
        },
      },
    };
  }
}
