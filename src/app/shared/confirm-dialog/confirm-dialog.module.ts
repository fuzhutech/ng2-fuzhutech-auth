import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';
import {ConfirmDialog} from './confirm-dialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ConfirmDialog],
  exports: [ConfirmDialog],
  entryComponents: [ConfirmDialog]
})
export class ConfirmDialogModule {
}
