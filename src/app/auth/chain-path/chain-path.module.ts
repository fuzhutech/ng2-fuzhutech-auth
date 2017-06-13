import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, TreeTableModule} from 'primeng/primeng';

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

import {ChainPathRoutingModule} from './chain-path-routing.module';
import {ChainPathService} from './service/chain-path.service';
import {NodeService} from './service/nodeservice';
import {ChainPathComponent} from './chain-path.component';
import {ChainPathDialogComponent} from './dialog/chain-path-dialog.component';
import {ChainPathGrantDialogComponent} from './grant-dialog/chain-path-grant-dialog.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule, TreeTableModule,

    TreeModule,
    GrowlModule,
    ButtonModule,
    ContextMenuModule,
    TabViewModule,
    CodeHighlighterModule,

    MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    ChainPathRoutingModule
  ],
  declarations: [ChainPathComponent, ChainPathDialogComponent, ChainPathGrantDialogComponent],
  providers: [ChainPathService, NodeService],
  entryComponents: [ChainPathDialogComponent, ChainPathGrantDialogComponent],
})
export class ChainPathModule {
}
