import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog, MdDialogRef} from '@angular/material';

import {ActionType, SubPageComponentWithComponentDialog} from '../../shared';

import {ChainPathDialogComponent} from './dialog/chain-path-dialog.component';
import {ChainPath} from './model/chain-path-model';
import {ChainPathService} from './service/chain-path.service';
import {ChainPathGrantDialogComponent} from './grant-dialog/chain-path-grant-dialog.component';
import {DialogResult} from '../../shared/common/sub-page-component';
import {AuthInfoService} from '../auth-info/auth-info.service';

@Component({
  selector: 'fz-permission',
  templateUrl: './chain-path.component.html',
  styleUrls: ['./chain-path.component.css']
})
export class ChainPathComponent
  extends SubPageComponentWithComponentDialog<ChainPathDialogComponent, ChainPath, ChainPathService>
  implements OnInit {

  //状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(service: ChainPathService,
              public _dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super('用户', _dialog, ChainPathDialogComponent);

    this.initParams(service);

    this.useTreeTable = true;
  }

  getService(): ChainPathService {
    return this.service;
  }

  newInstance(): ChainPath {
    return new ChainPath();
  };

  ngOnInit() {
    //this.doRefresh(null);
  }

  getFilterType(data) {
    if (data == '0') {
      return '空';
    } else {
      return '权限';
    }
  }

  getStatus(value) {
    let label = null;
    for (const status of this.statuses) {
      if (status.value == value) {
        label = status.label;
        break;
      }
    }

    return label;
  }

  grant() {

    if (!this.canDoGrant()) {
      return;
    }

    //弹出对话框
    const dialogRef: MdDialogRef<ChainPathGrantDialogComponent> = this.dialog.open(ChainPathGrantDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.record = this.getCloneRecord();
    dialogRef.componentInstance.dialogHeader = '分配权限';
    dialogRef.componentInstance.action = this.action;
    dialogRef.componentInstance.service = this.getService();


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
