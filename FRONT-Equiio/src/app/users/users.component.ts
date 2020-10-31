import {Component, OnInit} from '@angular/core';
import {NB_DIALOG_CONFIG, NbDialogService} from '@nebular/theme';
import {LocalDataSource} from 'ng2-smart-table';
import {AlertComponent} from '../alert/alert.component';
import {Roles} from '../models/roles.model';
import {User} from '../models/user.model';
import {AlertService} from '../services/alert.service';
import {UserService} from '../services/user.service';
import {UsersAddUserDialogComponent} from './users-add-user-dialog.component';

@Component({
  selector: 'app-user',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
  providers: [UserService, AlertComponent, NbDialogService, { provide: NB_DIALOG_CONFIG, useValue: {}}],
})
export class UsersComponent implements OnInit {
  public source: LocalDataSource;

  constructor(private userService: UserService, private alertService: AlertService, private dialogService: NbDialogService) {
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
    },
    edit: {
      confirmSave: true,
      editButtonContent: 'Modifier',
      saveButtonContent: 'Enregistrer',
      cancelButtonContent: 'Annuler',
    },
    columns: {
      firstname: {
        title: 'Prénom',
        filter: true,
      },
      lastname: {
        title: 'Nom',
        filter: true,
      },
      mail: {
        title: 'Mail',
        filter: true,
      },
      phone: {
        title: 'Téléphone',
      },
      licence: {
        title: 'Licence',
      },
      role: {
        title: 'Rôle',
        editor: {
          type: 'list',
          config: {
            list: Object.values(Roles).map((o) => {
              return {value: o, title: o};
            }),
          },
        },
      },
    },
  };

  public ngOnInit(): void {
    this.getUsers();
  }

  public onSearch(query: string = ''): void {
    console.log('on search');
    if (query !== '') {
      this.source.setFilter([
        {
          field: 'firstname',
          search: query,
        },
        {
          field: 'lastname',
          search: query,
        },
        {
          field: 'mail',
          search: query,
        },
      ], false);
    } else {
      this.source.reset();
    }
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.source = new LocalDataSource(data);
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
          this.getUsers();
        }
      },
      (err) => {
        this.alertService.error('Erreur lors de la suppression de l\'utilisateur');
      });
  }

  public openAddUserModal(): void {
    this.dialogService.open(UsersAddUserDialogComponent)
      .onClose.subscribe((addedUser) => addedUser && this.getUsers());
  }
}
