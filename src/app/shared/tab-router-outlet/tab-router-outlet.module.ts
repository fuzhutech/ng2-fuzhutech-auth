import {NgModule}     from '@angular/core';

import {CommonModule} from '@angular/common';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {TabGroupRouterOutLet,TabRouterOutlet} from './tab-router-outlet';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [CommonModule,FormsModule],
  exports: [TabGroupRouterOutLet,TabRouterOutlet],
  declarations: [TabGroupRouterOutLet,TabRouterOutlet],
  providers:    [TabRouterOutletService]
})
export class TabRouterOutletModule {
}

export * from './tab-router-outlet.service';
