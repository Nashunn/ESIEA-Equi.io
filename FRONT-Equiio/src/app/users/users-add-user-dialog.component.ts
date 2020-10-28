import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {AlertService} from '../services/alert.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  template: `
    <nb-card class="row">
      <nb-card-header>Ajouter un utilisateur</nb-card-header>
      <nb-card-body>
        <form [formGroup]="addUserForm">
          <!-- Firstname & Lastname -->
          <label for="reg_firstname" class="label-margin">Prénom et Nom<sup>*</sup></label>
          <div *ngIf="addUserSubmitted && (freg.reg_firstname.errors && freg.reg_lastname.errors)"
               class="invalid-feedback">
            <div *ngIf="freg.reg_firstname.errors.required && freg.reg_lastname.errors.required">Prénom et Nom
              obligatoires
            </div>
          </div>
          <div *ngIf="addUserSubmitted && (freg.reg_firstname.errors && !freg.reg_lastname.errors)"
               class="invalid-feedback">
            <div *ngIf="freg.reg_firstname.errors.required">Prénom obligatoire</div>
          </div>
          <div *ngIf="addUserSubmitted && (!freg.reg_firstname.errors && freg.reg_lastname.errors)"
               class="invalid-feedback">
            <div *ngIf="freg.reg_lastname.errors.required">Nom obligatoire</div>
          </div>
          <input
            type="text"
            class="form-control input-margin col-5"
            formControlName="reg_firstname"
            [ngClass]="{ 'is-invalid': addUserSubmitted && freg.reg_firstname.errors }"
            name="reg_firstname" id="reg_firstname" placeholder="Prénom"
            nbInput fullWidth
          />
          <input
            type="text"
            class="form-control input-margin col-6 offset-1"
            formControlName="reg_lastname"
            [ngClass]="{ 'is-invalid': addUserSubmitted && freg.reg_lastname.errors }"
            name="reg_lastname" id="reg_lastname" placeholder="Nom"
            nbInput fullWidth
          />
          <!-- Email -->
          <label for="reg_email" class="label-margin">Email<sup>*</sup></label>
          <div *ngIf="addUserSubmitted && freg.reg_email.errors" class="invalid-feedback">
            <div *ngIf="freg.reg_email.errors.required">Email obligatoire</div>
          </div>
          <input
            type="text"
            class="input-margin"
            formControlName="reg_email"
            [ngClass]="{ 'is-invalid': addUserSubmitted && freg.reg_email.errors }"
            name="reg_email" id="reg_email" placeholder="Email"
            nbInput fullWidth
          />
          <!-- Phone -->
          <label for="reg_tel" class="label-margin">Tel<sup>*</sup></label>
          <div *ngIf="addUserSubmitted && freg.reg_tel.errors" class="invalid-feedback">
            <div *ngIf="freg.reg_tel.errors.required">Téléphone obligatoire</div>
          </div>
          <input
            type="tel"
            class="input-margin"
            formControlName="reg_tel"
            [ngClass]="{ 'is-invalid': addUserSubmitted && freg.reg_tel.errors }"
            name="reg_tel" id="reg_tel" placeholder="Téléphone"
            nbInput fullWidth
          />
          <!-- Licence number -->
          <label for="reg_licence" class="label-margin">Numéro de licence</label>
          <input
            type="text"
            class="input-margin"
            formControlName="reg_licence"
            [ngClass]="{ 'is-invalid': addUserSubmitted && freg.reg_licence.errors }"
            name="reg_licence" id="reg_licence" placeholder="Numéro de licence"
            nbInput fullWidth
          />
          <!-- Password -->
          <label for="reg_password" class="label-margin">Mot de passe<sup>*</sup></label>
          <div *ngIf="addUserSubmitted && freg.reg_password.errors" class="invalid-feedback">
            <div *ngIf="freg.reg_password.errors.required">Mot de passe obligatoire</div>
          </div>
          <input
            type="password"
            class="input-margin"
            formControlName="reg_password"
            [ngClass]="{ 'is-invalid': addUserSubmitted && freg.reg_password.errors }"
            name="reg_password" id="reg_password" placeholder="Mot de passe"
            nbInput fullWidth
          />
          <!-- Password confirmation -->
          <label for="reg_passwordConfirm" class="label-margin">Mot de passe (Confirmation)<sup>*</sup></label>
          <div *ngIf="addUserSubmitted && freg.reg_passwordConfirm.errors" class="invalid-feedback">
            <div *ngIf="freg.reg_passwordConfirm.errors.required">Confirmation de mot de passe obligatoire</div>
          </div>
          <input
            type="password"
            class="input-margin"
            formControlName="reg_passwordConfirm"
            [ngClass]="{ 'is-invalid': addUserSubmitted && freg.reg_passwordConfirm.errors }"
            name="reg_passwordConfirm" id="reg_passwordConfirm" placeholder="Confirmation Mot de passe"
            nbInput fullWidth
          />
          <div *ngIf="errorAdd" class="invalid-feedback mt-3 mb-0">{{errorAdd}}</div>
        </form>
      </nb-card-body>
      <nb-card-footer>
        <div>
          <button nbButton status="danger" class="col-lg-6" (click)="cancel()">Annuler</button>
          <button nbButton status="success" class="col-lg-6" (click)="submit()">Valider</button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
})
export class UsersAddUserDialogComponent implements OnInit {
  public addUserForm: FormGroup;
  public addUserSubmitted = false;
  public errorAdd = '';

  constructor(protected dialogRef: NbDialogRef<UsersAddUserDialogComponent>, private userService: UserService,
              private alertService: AlertService, private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      reg_firstname: ['', Validators.required],
      reg_lastname: ['', Validators.required],
      reg_email: ['', Validators.required],
      reg_tel: ['', Validators.required],
      reg_licence: [''],
      reg_password: ['', Validators.required],
      reg_passwordConfirm: ['', Validators.required],
    });
  }

  get freg(): { [p: string]: AbstractControl } { return this.addUserForm.controls; }

  public cancel(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    this.addUserSubmitted = true;

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }

    this.userService.addUser(this.addUserForm.get('reg_firstname').value, this.addUserForm.get('reg_lastname').value,
      this.addUserForm.get('reg_email').value, this.addUserForm.get('reg_tel').value,
      this.addUserForm.get('reg_licence').value, this.addUserForm.get('reg_password').value).subscribe(
      (response) => {
        if (response.returnCode > 250) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
        }
        this.dialogRef.close(true);
      },
      (err) => {
        this.alertService.error('Erreur lors de l\'ajout de l\'utilisateur');
        this.dialogRef.close(false);
      });
  }
}
