import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule} from 'primeng/primeng';
import {InputTextareaModule, SpinnerModule, DropdownModule} from 'primeng/primeng';
import {TreeTableModule, GrowlModule} from 'primeng/primeng';

import {MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule} from '@angular/material';


import {ToolbarModule} from '../../shared';

import {OrganizationComponent} from './organization.component';
import {OrganizationRoutingModule} from './organization-routing.module';
import {OrganizationService} from './services/organization.service';

import {OrganizationDialog} from './dialog/organization-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ButtonModule,
    FormsModule, HttpModule, InputTextModule, DataTableModule, ButtonModule, DialogModule,
    ToolbarModule, InputTextareaModule, SpinnerModule, DropdownModule, TreeTableModule, GrowlModule,
    MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule
  ],
  declarations: [
    OrganizationComponent, OrganizationDialog
  ],
  providers: [OrganizationService],
  entryComponents: [OrganizationDialog],
})
export class OrganizationModule {
}
