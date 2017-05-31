import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule, MdToolbarModule} from '@angular/material';

import {LoginRoutingModule} from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule, MdToolbarModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
