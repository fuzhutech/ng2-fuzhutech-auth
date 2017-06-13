import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule} from 'primeng/primeng';
import {InputTextareaModule, SpinnerModule, DropdownModule} from 'primeng/primeng';
import {TreeTableModule, GrowlModule, PickListModule} from 'primeng/primeng';

import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule} from '@angular/material';


import {ToolbarModule} from '../../shared';

import {OrganizationComponent} from './organization.component';
import {OrganizationRoutingModule} from './organization-routing.module';
import {OrganizationService} from './services/organization.service';

import {OrganizationDialog} from './dialog/organization-dialog.component';
import {OrganizationGrantDialogComponent} from './grant-dialog/grant-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ButtonModule,
    FormsModule, HttpModule, InputTextModule, DataTableModule, ButtonModule, DialogModule,
    ToolbarModule, InputTextareaModule, SpinnerModule, DropdownModule, TreeTableModule, GrowlModule, PickListModule,
    MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule
  ],
  declarations: [
    OrganizationComponent, OrganizationDialog, OrganizationGrantDialogComponent
  ],
  providers: [OrganizationService],
  entryComponents: [OrganizationDialog, OrganizationGrantDialogComponent],
})
export class OrganizationModule {
}
