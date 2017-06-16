import {Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {UserService} from '../services/user.service';
import {User} from '../model/user';

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html'
})
export class UserDialog extends ComponentDialog<UserDialog, User, UserService> {

  color = 'primary';


  constructor(dialogRef: MdDialogRef<UserDialog>) {
    super(dialogRef);
  }

}
