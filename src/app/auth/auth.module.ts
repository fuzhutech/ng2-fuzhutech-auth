import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdDialogModule, MdSidenavModule, MdTabsModule} from '@angular/material';
import {ContextMenuModule} from 'primeng/primeng';
import {FzSharedModule} from '../shared';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        MdDialogModule, MdSidenavModule, MdTabsModule,
        ContextMenuModule,
        FzSharedModule,
        AuthRoutingModule
    ],
    declarations: [AuthComponent],
    providers: []
})
export class FzAuthModule {
}
