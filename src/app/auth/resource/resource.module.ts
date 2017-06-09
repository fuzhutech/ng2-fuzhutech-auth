import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule} from 'primeng/primeng';
import {MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule} from '@angular/material';

import {ToolbarModule} from '../../shared';

import {ResourceRoutingModule} from './resource-routing.module';
import {ResourceService} from './service/resource.service';
import {ResourceComponent} from './resource.component';
import {ResourceDialogComponent} from './dialog/resource-dialog.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule,
    MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    ResourceRoutingModule
  ],
  declarations: [ResourceComponent, ResourceDialogComponent],
  providers: [ResourceService],
  entryComponents: [ResourceDialogComponent],
})
export class ResourceModule {
}
