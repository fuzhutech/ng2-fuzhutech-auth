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

import {FzToolbarModule} from '../../shared';

import {ResourceRoutingModule} from './resource-routing.module';
import {ResourceService} from './service/resource.service';
import {ResourceComponent} from './resource.component';
import {ResourceDialogComponent} from './dialog/resource-dialog.component';
import {ResourceGrantDialogComponent} from './grant-dialog/resource-grant-dialog.component';

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
        FzToolbarModule,
        ResourceRoutingModule
    ],
    declarations: [ResourceComponent, ResourceDialogComponent, ResourceGrantDialogComponent],
    providers: [ResourceService],
    entryComponents: [ResourceDialogComponent, ResourceGrantDialogComponent],
})
export class FzResourceModule {
}
