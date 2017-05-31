import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, InputTextModule} from 'primeng/primeng';
import {MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule} from '@angular/material';

import {ToolbarModule} from '../../shared';


import {RoleComponent} from './role.component';
import {RoleRoutingModule} from './role-routing.module';
import {RoleService} from './services/role.service';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule, InputTextModule,
    MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    RoleRoutingModule,
  ],
  declarations: [
    RoleComponent
  ],
  providers: [RoleService]
})
export class RoleModule {
}
