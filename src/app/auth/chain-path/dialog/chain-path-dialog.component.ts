import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {ChainPath} from '../model/chain-path-model';
import {ChainPathService} from '../service/chain-path.service';

@Component({
  selector: 'fz-chain-path-dialog',
  templateUrl: './chain-path-dialog.component.html',
  styleUrls: ['./chain-path-dialog.component.css']
})
export class ChainPathDialogComponent extends ComponentDialog<ChainPathDialogComponent, ChainPath, ChainPathService> {

  color = 'primary';


  constructor(dialogRef: MdDialogRef<ChainPathDialogComponent>) {
    super(dialogRef);
  }

}
