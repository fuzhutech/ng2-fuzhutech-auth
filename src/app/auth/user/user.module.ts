import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule} from 'primeng/primeng';
import {MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule} from '@angular/material';

import {ToolbarModule} from '../../shared';

import {UserRoutingModule} from './user-routing.module';
import {UserService} from './services/user.service';
import {UserComponent} from './user.component';
import {UserDialog} from './dialog/user-dialog.component';


@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule,
    MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    UserRoutingModule
  ],
  exports: [
    UserComponent
  ],
  declarations: [
    UserComponent, UserDialog
  ],
  providers: [UserService],
  entryComponents: [UserDialog],
})
export class UserModule {
}
