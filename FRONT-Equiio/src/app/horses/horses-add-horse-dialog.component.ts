import {Component, Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Horse} from '../models/horse.model';
import {AlertService} from '../services/alert.service';
import {HorseService} from '../services/horse.service';

@Component({
  selector: 'app-add-horse-dialog',
  template: `
    <nb-card class="row" style="width: 50vw">
      <nb-card-header>{{this.horse.id ? 'Modifier un cheval' : 'Ajouter un cheval'}}</nb-card-header>
      <nb-card-body>
        <!-- Name -->
        <label for="name" class="label-margin">Nom</label>
        <input #name nbInput fullWidth placeholder="Nom" class="input-margin" [(ngModel)]="this.horse.name">
        <!-- Height -->
        <label for="height" class="label-margin">Taille</label>
        <input #height nbInput fullWidth placeholder="Taille" class="input-margin" [(ngModel)]="this.horse.height">
        <!-- Desc -->
        <label for="desc" class="label-margin">Description</label>
        <textarea
          #description nbInput fullWidth placeholder="Description"
          class="input-margin"
          style="resize: vertical;"
          [(ngModel)]="this.horse.description">
        </textarea>
      </nb-card-body>
      <nb-card-footer>
        <div class="d-flex justify-content-between flex-wrap">
          <button nbButton status="danger" class="col-5" size="medium" (click)="cancel()">Annuler</button>
          <button nbButton status="success" class="col-5" size="medium"
                  (click)="submit(name.value, height.value, description.value)">Valider
          </button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
})
export class HorsesAddHorseDialogComponent {
  @Input() public horse: Horse;

  constructor(protected dialogRef: NbDialogRef<HorsesAddHorseDialogComponent>, private horseService: HorseService,
              private alertService: AlertService) {
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public submit(name, height, description): void {
    if (this.horse.id) {
      this.horseService.updateHorse(this.horse).subscribe(
        (response) => {
          if (response.returnCode > 200) {
            this.alertService.error(response.message);
          } else {
            this.alertService.success(response.message);
          }
        },
        (err) => {
          this.alertService.error('Erreur lors de la modification du cheval');
        });
      this.dialogRef.close();
    } else {
      const horse = new Horse(name, height, description);
      this.horseService.addHorse(horse).subscribe(
        (response) => {
          if (response.returnCode > 200) {
            this.alertService.error(response.message);
          } else {
            this.alertService.success(response.message);
          }
        },
        (err) => {
          this.alertService.error('Erreur lors de l\'ajout du cheval');
        });
      this.dialogRef.close(horse);
    }
  }
}
