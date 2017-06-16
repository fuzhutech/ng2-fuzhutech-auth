import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {Organization} from '../services/organization';
import {OrganizationService} from '../services/organization.service';

@Component({
  selector: 'fz-organization-dialog',
  templateUrl: './organization-dialog.component.html'
})
export class OrganizationDialogComponent extends ComponentDialog<OrganizationDialogComponent, Organization, OrganizationService> {

  color = 'primary';


  constructor(dialogRef: MdDialogRef<OrganizationDialogComponent>) {
    super(dialogRef);
  }

}
