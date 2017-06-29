import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {ActionType, SubPageComponentWithComponentDialog} from '../../shared';

import {UserDialog} from './dialog/user-dialog.component';
import {User} from './model/user';
import {UserService} from './services/user.service';
import {DialogResult} from '../../shared/common/sub-page-component';
import {UserRoleDialogComponent} from './user-role-dialog/user-role-dialog.component';
import {AuthInfoService} from '../auth-info/auth-info.service';
import {ServiceUtil} from '../../shared/utils/service-util';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent extends SubPageComponentWithComponentDialog<UserDialog, User, UserService> {

  //用户状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(service: UserService, public _dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super('用户', _dialog, UserDialog);

    this.initParams(service);
  }


  grant() {
    if (!this.canDoGrant()) {
      return;
    }

    //弹出对话框
    const dialogRef: MdDialogRef<UserRoleDialogComponent> = this.dialog.open(UserRoleDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.record = this.getCloneRecord();
    dialogRef.componentInstance.dialogHeader = '分配角色';
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

  getService(): UserService {
    return this.service;
  }

  newInstance(): User {
    return new User();
  };

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

}
