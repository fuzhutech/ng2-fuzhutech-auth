import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {ButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {MdToolbarModule, MdButtonModule, MdIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    TabViewModule,
    MdToolbarModule, MdButtonModule, MdIconModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ]

})
export class ToolbarModule {
}
