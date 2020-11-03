import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../alert/alert.component';
import {Lesson} from '../models/lesson.model';
import {AlertService} from '../services/alert.service';
import {LessonService} from '../services/lesson.service';
import {Response} from "../models/response.model";

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
  public tempLessonDate: Date; // form temp date

  constructor(
    private lessonService: LessonService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    this.getLesson(lessonId);
  }

  private getLesson(lessonId: string): void {
    this.lessonService.getLesson(lessonId).subscribe((data) => {
        this.lesson = data;
        this.tempLessonDate = new Date(this.lesson.date);
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

  private back(): void {
    this.router.navigate(['/lessons']);
  }
}
