import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ChainPathComponent} from './chain-path.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: ChainPathComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ChainPathRoutingModule {
}
