import { Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';

@Component({
  selector: 'fz-permission-dialog',
  templateUrl: './permission-dialog.component.html',
  styleUrls: ['./permission-dialog.component.css']
})
export class PermissionDialogComponent extends ComponentDialog<PermissionDialogComponent> {

  color = 'primary';


  constructor(dialogRef: MdDialogRef<PermissionDialogComponent>) {
    super(dialogRef);
  }

}
