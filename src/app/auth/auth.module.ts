//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdDialogModule, MdSidenavModule, MdTabsModule} from '@angular/material';

import {MenuSideModule, FooterModule, TabRouterOutletModule} from '../shared';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, /*BrowserAnimationsModule,*/
    MdDialogModule, MdSidenavModule, MdTabsModule,
    MenuSideModule, FooterModule, TabRouterOutletModule,
    AuthRoutingModule
  ],
  declarations: [AuthComponent],
  providers: []
})
export class AuthModule {
}
