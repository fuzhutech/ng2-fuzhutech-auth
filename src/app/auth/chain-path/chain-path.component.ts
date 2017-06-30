import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog, MdDialogRef} from '@angular/material';

import {ActionType, SubPageComponentWithComponentDialog} from '../../shared';

import {ChainPathDialogComponent} from './dialog/chain-path-dialog.component';
import {ChainPath} from './model/chain-path-model';
import {ChainPathService} from './service/chain-path.service';
import {ChainPathGrantDialogComponent} from './grant-dialog/chain-path-grant-dialog.component';
import {DialogResult} from '../../shared/common/sub-page-component';
import {AuthInfoService} from '../../shared/auth-info/auth-info.service';

@Component({
  selector: 'fz-auth-chain-path',
  templateUrl: './chain-path.component.html',
  styleUrls: ['./chain-path.component.css']
})
export class ChainPathComponent
  extends SubPageComponentWithComponentDialog<ChainPath, ChainPathService, ChainPathDialogComponent>
  implements OnInit {

  constructor(service: ChainPathService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super(service, '路径配置', dialog, ChainPathDialogComponent);

    this.useTreeTable = true;
  }

  newInstance(): ChainPath {
    return new ChainPath();
  };

  ngOnInit() {
    //this.doRefresh(null);
  }

  grant() {

    if (!this.canDoGrant()) {
      return;
    }

    //弹出对话框
    const dialogRef: MdDialogRef<ChainPathGrantDialogComponent> = this.dialog.open(ChainPathGrantDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.record = this.getCloneRecord();
    dialogRef.componentInstance.dialogHeader = this.mainHeader + '--分配权限';
    dialogRef.componentInstance.action = this.action;
    dialogRef.componentInstance.service = this.service;


    //关闭对话框后进行,刷新
    dialogRef.afterClosed().subscribe((result: DialogResult) => {
      this.dialogRef = null;
      if (result.success) {
        this.doRefresh(result.recordId);
      }
    });
  }

  canDoGrant(): boolean {
    return true;
  }

}
