import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {DialogResult, SubPageComponentWithComponentDialog} from '../../shared';

import {User} from './model/user';
import {UserService} from './service/user.service';
import {UserDialogComponent} from './dialog/user-dialog.component';
import {UserRoleDialogComponent} from './user-role-dialog/user-role-dialog.component';

@Component({
  selector: 'fz-auth-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends SubPageComponentWithComponentDialog<User, UserService, UserDialogComponent> {

  //用户状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(service: UserService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super(service, '用户', dialog, UserDialogComponent);
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
