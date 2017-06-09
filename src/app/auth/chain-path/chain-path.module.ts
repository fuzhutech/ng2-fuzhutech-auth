import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule} from 'primeng/primeng';
import {MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule} from '@angular/material';

import {ToolbarModule} from '../../shared';

import {ChainPathRoutingModule} from './chain-path-routing.module';
import {ChainPathService} from './service/permission.service';
import { ChainPathComponent } from './chain-path.component';
import { ChainPathDialogComponent } from './dialog/chain-path-dialog.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule,
    MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    ChainPathRoutingModule
  ],
  declarations: [ChainPathComponent, ChainPathDialogComponent],
  providers: [ChainPathService],
  entryComponents: [ChainPathDialogComponent],
})
export class ChainPathModule { }
