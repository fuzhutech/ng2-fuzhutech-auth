import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule} from 'primeng/primeng';
import {MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule} from '@angular/material';

import {ToolbarModule} from '../../shared';

import {PermissionRoutingModule} from './permission-routing.module';
import {PermissionService} from './service/permission.service';
import { PermissionComponent } from './permission.component';
import { PermissionDialogComponent } from './dialog/permission-dialog.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule,
    MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    PermissionRoutingModule
  ],
  declarations: [PermissionComponent, PermissionDialogComponent],
  providers: [PermissionService],
  entryComponents: [PermissionDialogComponent],
})
export class PermissionModule { }
