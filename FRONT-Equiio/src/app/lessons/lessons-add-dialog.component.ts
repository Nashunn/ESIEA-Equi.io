import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-lessons-add-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lessons-add-dialog.components.html',
  styleUrls: ['./lessons.component.scss'],
})

export class LessonsAddDialogComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;
  public error = '';
  public selectedItem = '';

  constructor(
    protected dialogRef: NbDialogRef<LessonsAddDialogComponent>,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
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

    // Todo : Voir le select pour restylisé
    // Créer un objet lesson avec les infos du form si tout est bon,
    // puis ajouter en bdd et fermer la fenêtre
    // puis dans le component lesson mettre a jour
  }
}
