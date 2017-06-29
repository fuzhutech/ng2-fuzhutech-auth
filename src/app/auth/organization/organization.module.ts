import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule} from 'primeng/primeng';
import {InputTextareaModule, SpinnerModule, DropdownModule} from 'primeng/primeng';
import {TreeTableModule, GrowlModule, PickListModule} from 'primeng/primeng';

import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule} from '@angular/material';


import {FzToolbarModule} from '../../shared';

import {OrganizationComponent} from './organization.component';
import {OrganizationRoutingModule} from './organization-routing.module';
import {OrganizationService} from './service/organization.service';

import {OrganizationDialogComponent} from './dialog/organization-dialog.component';
import {OrganizationGrantDialogComponent} from './grant-dialog/grant-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ButtonModule,
    FormsModule, HttpModule, InputTextModule, DataTableModule, ButtonModule, DialogModule,
    FzToolbarModule, InputTextareaModule, SpinnerModule, DropdownModule, TreeTableModule, GrowlModule, PickListModule,
    MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule
  ],
  declarations: [
    OrganizationComponent, OrganizationDialogComponent, OrganizationGrantDialogComponent
  ],
  providers: [OrganizationService],
  entryComponents: [OrganizationDialogComponent, OrganizationGrantDialogComponent],
})
export class FzOrganizationModule {
}
