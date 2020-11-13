import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import {Lesson} from '../../models/lesson.model';
import {Response} from '../../models/response.model';
import { AlertService } from '../../services/alert.service';
import {AuthenticationService} from '../../services/authentication.service';
import {LessonService} from '../../services/lesson.service';

@Component({
  selector: 'app-lessons-add-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lessons-add-dialog.components.html',
  styleUrls: ['../lessons.component.scss'],
})

export class LessonsAddDialogComponent implements OnInit {
  @Input() public lesson: Lesson;
  public form: FormGroup;
  public submitted = false;
  public error = '';

  constructor(
    protected dialogRef: NbDialogRef<LessonsAddDialogComponent>,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private lessonService: LessonService,
    private authenticationService: AuthenticationService,
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group ({
      name: [''],
      date: ['', Validators.required],
      level: ['', Validators.required],
      numRiders: ['', Validators.required],
    });
  }

  // Getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } { return this.form.controls; }

  public cancel(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // Create lesson if everything is ready
    const lesson = new Lesson(
      this.form.get('name').value === '' ? 'Leçon' : this.form.get('name').value,
      this.form.get('date').value,
      this.form.get('level').value,
      this.form.get('numRiders').value,
      0,
      this.authenticationService.currentSessionValue.getUserId(),
    );
    // Add lesson
    this.lessonService.addLesson(lesson).subscribe(
      (response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
        }
      },
      (err) => {
        this.alertService.error('Erreur lors de l\'ajout de la leçon');
      });

    // Close popup
    this.dialogRef.close(lesson);
  }
}
