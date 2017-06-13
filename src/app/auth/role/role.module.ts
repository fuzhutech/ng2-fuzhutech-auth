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

import {ToolbarModule} from '../../shared';


import {RoleComponent} from './role.component';
import {RoleRoutingModule} from './role-routing.module';
import {RoleService} from './services/role.service';
import {NodeService} from './services/nodeservice';
import {RoleGrantDialogComponent} from './grant-dialog/role-grant-dialog.component';
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
    ToolbarModule,
    RoleRoutingModule,
  ],
  declarations: [
    RoleComponent, RoleGrantDialogComponent, RoleGrantUserDialogComponent
  ],
  providers: [RoleService, NodeService],
  entryComponents: [RoleGrantDialogComponent, RoleGrantUserDialogComponent]
})
export class RoleModule {
}
