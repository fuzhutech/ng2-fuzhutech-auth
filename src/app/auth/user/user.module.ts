import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, PickListModule} from 'primeng/primeng';
import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule} from '@angular/material';

import {ToolbarModule} from '../../shared';

import {UserRoutingModule} from './user-routing.module';
import {UserService} from './services/user.service';
import {UserComponent} from './user.component';
import {UserDialog} from './dialog/user-dialog.component';
import {UserRoleDialogComponent} from './user-role-dialog/user-role-dialog.component';


@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule, PickListModule,
    MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    UserRoutingModule
  ],
  exports: [
    UserComponent
  ],
  declarations: [
    UserComponent, UserDialog, UserRoleDialogComponent
  ],
  providers: [UserService],
  entryComponents: [UserDialog, UserRoleDialogComponent],
})
export class UserModule {
}
