import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../alert/alert.component';
import {Lesson} from '../models/lesson.model';
import {AlertService} from '../services/alert.service';
import {LessonService} from '../services/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  providers: [ LessonService, AlertComponent, NbDialogService, { provide: NB_DIALOG_CONFIG, useValue: {}} ],
})
export class LessonComponent implements OnInit {
  public isLoading = true;
  public isEditMode = false;
  public lesson: Lesson; // actual lesson
  public tempLessonTime: string; // form temp time

  constructor(
    private lessonService: LessonService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
  ) { }

  public ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    this.getLesson(lessonId);
  }

  private getLesson(lessonId: string): void {
    this.lessonService.getLesson(lessonId).subscribe((data) => {
        this.lesson = data;
        // this.tempLessonTime = this.datepipe.transform(this.lesson.date, 'HH:mm');
        console.log(this.lesson.date);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.alertService.error('Erreur lors de la récupération de la leçon');
        this.router.navigate(['/lessons']);
      },
      () => this.isLoading = false,
    );
  }

  private toggleEditMode(): void {
    this.isEditMode = true;
  }

  private toggleEditModeAndUpdateLesson(): void {
    console.log(this.lesson.date);
    this.isEditMode = false;
  }

  private back(): void {
    this.router.navigate(['/lessons']);
  }

  private constructNewDate(lessonDate: string, lessonTime: string): string {
    return lessonDate.substring(0, 11) + lessonTime + ':00.000Z';
  }
}
