import {Component, OnInit} from '@angular/core';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../alert/alert.component';
import {Horse} from '../models/horse.model';
import {AlertService} from '../services/alert.service';
import {HorseService} from '../services/horse.service';
import {HorsesAddHorseDialogComponent} from './horses-add-horse-dialog.component';

@Component({
  selector: 'app-horses',
  styleUrls: ['./horses.component.scss'],
  templateUrl: './horses.component.html',
  providers: [HorseService, AlertComponent, NbDialogService, { provide: NB_DIALOG_CONFIG, useValue: {}}],
})
export class HorsesComponent implements OnInit {

  constructor(private dialogService: NbDialogService, private horseService: HorseService, private alertService: AlertService) {
  }

  public deleteMode: boolean[] = [];
  public isLoading = true;
  public horses: Horse[];

  public ngOnInit(): void {
    this.getHorses();
  }

  private getHorses(): void {
    this.horseService.getHorses().subscribe(
      (data) => {
        this.horses = data;
        // Initialize deleteMode booleans to false (one for each card)
        this.horses.forEach(() => this.deleteMode.push(false));
      },
      (err) => console.log(err),
      () => this.isLoading = false);
  }

  public toggleDeleteMode(i: number): void {
    this.deleteMode[i] = !this.deleteMode[i];
  }

  public deleteHorse(horse: Horse): void {
    this.horseService.deleteHorse(horse.id).subscribe((response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
          this.horses = this.horses.filter((obj) => obj.id !== horse.id);
        }
      },
      (err) => {
        this.alertService.error('An error has occured.');
      });
  }

  public openAddUserModal(horse?: Horse): void {
    if (!horse) {
      horse = new Horse('', '', '');
    }
    this.dialogService.open(HorsesAddHorseDialogComponent, {
      context: {
        horse,
      },
    }).onClose.subscribe((addedHorse) => addedHorse && this.getHorses());
  }
}
