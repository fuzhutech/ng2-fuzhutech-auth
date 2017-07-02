import {Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {UserService} from '../service/user.service';
import {User} from '../model/user';

@Component({
    selector: 'fz-user-dialog',
    templateUrl: './user-dialog.component.html'
})
export class UserDialogComponent extends ComponentDialog<UserDialogComponent, User, UserService> {

    color = 'primary';


    constructor(dialogRef: MdDialogRef<UserDialogComponent>) {
        super(dialogRef);
    }

}
