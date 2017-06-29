import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';  //ReactiveFormsModule

import {MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule, MdToolbarModule} from '@angular/material';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {LoginService} from './service/login.service';


@NgModule({
  imports: [
    CommonModule, FormsModule,
    MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule, MdToolbarModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class FzLoginModule {
}
