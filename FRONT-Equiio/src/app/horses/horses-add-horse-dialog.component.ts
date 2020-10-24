import {Component, Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Horse} from '../models/horse.model';
import {AlertService} from '../services/alert.service';
import {HorseService} from '../services/horse.service';

@Component({
  selector: 'app-add-horse-dialog',
  template: `
    <nb-card class="row">
      <nb-card-header>{{this.horse.id ? 'Modifier un cheval' : 'Ajouter un cheval'}}</nb-card-header>
      <nb-card-body>
        <div class="row mb-3">
          <input #name nbInput placeholder="Name" [(ngModel)]="this.horse.name">
        </div>
        <div class="row mb-3">
          <input #height nbInput placeholder="Taille" [(ngModel)]="this.horse.height">
        </div>
        <div class="row mb-3">
          <textarea #description nbInput placeholder="Description" [(ngModel)]="this.horse.description"></textarea>
        </div>
      </nb-card-body>
      <nb-card-footer>
        <div>
          <button nbButton status="danger" class="col-lg-6" (click)="cancel()">Annuler</button>
          <button nbButton status="success" class="col-lg-6"
                  (click)="submit(name.value, height.value, description.value)">Valider
          </button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
})
export class HorsesAddHorseDialogComponent {
  @Input() public horse: Horse;

  // FIXME (YLB): Add file input : https://github.com/akveo/nebular/issues/2285
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
