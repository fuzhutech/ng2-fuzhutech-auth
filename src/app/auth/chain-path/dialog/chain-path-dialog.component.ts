import { Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';

@Component({
  selector: 'fz-permission-dialog',
  templateUrl: './chain-path-dialog.component.html',
  styleUrls: ['./chain-path-dialog.component.css']
})
export class ChainPathDialogComponent extends ComponentDialog<ChainPathDialogComponent> {

  color = 'primary';


  constructor(dialogRef: MdDialogRef<ChainPathDialogComponent>) {
    super(dialogRef);
  }

}
