import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, InputTextModule, PickListModule} from 'primeng/primeng';

import {
    TreeModule,
    GrowlModule,
    ButtonModule,
    ContextMenuModule,
    TabViewModule,
    CodeHighlighterModule
} from 'primeng/primeng';

import {
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule,
    MdSelectModule
} from '@angular/material';

import {FzToolbarModule} from '../../shared';


import {RoleComponent} from './role.component';
import {RoleRoutingModule} from './role-routing.module';
import {RoleService} from './service/role.service';
import {RoleGrantResourceDialogComponent} from './role-grant-resource-dialog/role-grant-resource-dialog.component';
import {RoleGrantUserDialogComponent} from './role-grant-user-dialog/role-grant-user-dialog.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, HttpModule,
        DataTableModule, InputTextModule, PickListModule,

        TreeModule,
        GrowlModule,
        ButtonModule,
        ContextMenuModule,
        TabViewModule,
        CodeHighlighterModule,

        MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdToolbarModule, MdSelectModule,
        FzToolbarModule,
        RoleRoutingModule,
    ],
    declarations: [
        RoleComponent, RoleGrantResourceDialogComponent, RoleGrantUserDialogComponent
    ],
    providers: [RoleService],
    entryComponents: [RoleGrantResourceDialogComponent, RoleGrantUserDialogComponent]
})
export class FzRoleModule {
}
