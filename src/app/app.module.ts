import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdToolbarModule, MdButtonModule, MdIconModule, MdMenuModule, MdSidenavModule} from '@angular/material';

import {ConfirmDialog, ConfirmDialogModule, FooterModule} from './shared';

import {AppComponent} from './app.component';
import {HomePageComponent} from './homepage.component';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent, HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule, BrowserAnimationsModule,
    MdToolbarModule, MdButtonModule, MdIconModule, MdMenuModule, MdSidenavModule,
    AppRoutingModule, FooterModule, ConfirmDialogModule
  ],
  providers: [],
  entryComponents: [ConfirmDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
}
