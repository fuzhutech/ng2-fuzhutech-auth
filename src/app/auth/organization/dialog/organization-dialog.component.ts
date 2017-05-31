import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {ComponentDialog} from '../../../shared';

@Component({
  selector: 'organization-dialog',
  templateUrl: './organization-dialog.component.html'
})
export class OrganizationDialog extends ComponentDialog<OrganizationDialog> {

  color = 'primary';


  constructor(dialogRef: MdDialogRef<OrganizationDialog>) {
    super(dialogRef);
  }

}
