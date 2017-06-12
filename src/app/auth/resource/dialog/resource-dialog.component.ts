import { Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';

@Component({
  selector: 'fz-permission-dialog',
  templateUrl: './resource-dialog.component.html',
  styleUrls: ['./resource-dialog.component.css']
})
export class ResourceDialogComponent extends ComponentDialog<ResourceDialogComponent> {

  color = 'primary';


  constructor(dialogRef: MdDialogRef<ResourceDialogComponent>) {
    super(dialogRef);
  }

}