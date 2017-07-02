import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, PickListModule} from 'primeng/primeng';
import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule} from '@angular/material';

import {FzToolbarModule} from '../../shared';

import {UserRoutingModule} from './user-routing.module';
import {UserService} from './service/user.service';
import {UserComponent} from './user.component';
import {UserDialogComponent} from './dialog/user-dialog.component';
import {UserRoleDialogComponent} from './user-role-dialog/user-role-dialog.component';


@NgModule({
    imports: [
        CommonModule, FormsModule, HttpModule,
        DataTableModule, PickListModule,
        MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule,
        FzToolbarModule,
        UserRoutingModule
    ],
    exports: [
        UserComponent
    ],
    declarations: [
        UserComponent, UserDialogComponent, UserRoleDialogComponent
    ],
    providers: [UserService],
    entryComponents: [UserDialogComponent, UserRoleDialogComponent],
})
export class FzUserModule {
}
