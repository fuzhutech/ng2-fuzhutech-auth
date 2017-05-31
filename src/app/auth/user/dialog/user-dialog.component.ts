import {Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html'
})
export class UserDialog extends ComponentDialog<UserDialog>{

  color: string = 'primary';


  constructor(dialogRef: MdDialogRef<UserDialog>) {
    super(dialogRef);
  }

}
