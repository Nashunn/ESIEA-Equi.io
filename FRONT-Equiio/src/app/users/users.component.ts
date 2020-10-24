import {Component, OnInit} from '@angular/core';
import {AlertComponent} from '../alert/alert.component';
import {User} from '../models/user.model';
import {AlertService} from '../services/alert.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
  providers: [UserService, AlertComponent],
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private alertService: AlertService) {
  }

  public isLoading = true;
  public users: User[];

  public settings = {
    actions: {
      position: 'right',
    },
    hideSubHeader: true,
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Supprimer',
      saveButtonContent: 'Enregistrer',
      cancelButtonContent: 'Annuler',
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
      editButtonContent: 'Modifier',
    },
    columns: {
      firstname: {
        title: 'Prénom',
        filter: true,
      },
      lastname: {
        title: 'Nom',
      },
      mail: {
        title: 'Mail',
      },
      phone: {
        title: 'Téléphone',
      },
    },
  };

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (err) => {
        this.alertService.error('Erreur lors de la récupération des utilisateurs');
        this.isLoading = false;
      },
      () => this.isLoading = false);
  }

  public onUpdateConfirm(event): void {
    this.userService.updateUser(event.newData).subscribe(
      (response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
          event.confirm.resolve(event.newData);
        }
      },
      (err) => {
        this.alertService.error('Erreur lors de la modification de l\'utilisateur');
      });
  }

  public onDeleteConfirm(event): void {
    this.userService.deleteUser(event.data.id).subscribe((response) => {
        if (response.returnCode > 200) {
          this.alertService.error(response.message);
        } else {
          this.alertService.success(response.message);
          this.users = this.users.filter((obj) => obj !== event.data);
        }
      },
      (err) => {
        this.alertService.error('Erreur lors de la suppression de l\'utilisateur');
      });
  }
}
