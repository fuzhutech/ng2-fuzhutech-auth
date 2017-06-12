import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule} from 'primeng/primeng';

import {
  TreeModule,
  GrowlModule,
  ButtonModule,
  ContextMenuModule,
  TabViewModule,
  CodeHighlighterModule
} from 'primeng/primeng';

import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule} from '@angular/material';

import {ToolbarModule} from '../../shared';

import {ResourceRoutingModule} from './resource-routing.module';
import {ResourceService} from './service/resource.service';
import {ResourceComponent} from './resource.component';
import {ResourceDialogComponent} from './dialog/resource-dialog.component';
import {NodeService} from './service/nodeservice';
import {ResourceGrantDialogComponent} from './grant-dialog/resource-grant-dialog.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule,

    TreeModule,
    GrowlModule,
    ButtonModule,
    ContextMenuModule,
    TabViewModule,
    CodeHighlighterModule,

    MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    ResourceRoutingModule
  ],
  declarations: [ResourceComponent, ResourceDialogComponent, ResourceGrantDialogComponent],
  providers: [ResourceService, NodeService],
  entryComponents: [ResourceDialogComponent, ResourceGrantDialogComponent],
})
export class ResourceModule {
}
