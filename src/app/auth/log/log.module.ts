import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, InputTextModule} from 'primeng/primeng';
import {MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule} from '@angular/material';

import {ToolbarModule} from '../../shared';


import {LogComponent} from './log.component';
import {LogRoutingModule} from './log-routing.module';
import {LogService} from './services/log.service';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    DataTableModule, InputTextModule,
    MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule,
    ToolbarModule,
    LogRoutingModule,
  ],
  declarations: [
    LogComponent
  ],
  providers: [LogService]
})
export class LogModule {
}
