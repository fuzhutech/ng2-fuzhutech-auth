import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {SelectItem} from 'primeng/primeng';

import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {ActionType, SubPageComponent_UseComponentDialog} from '../../shared';

import {UserDialog} from './dialog/user-dialog.component';
import {User} from './services/user';
import {UserService} from './services/user.service';
import {Role} from '../role/services/role';
import {DialogResult} from '../../shared/common/sub-page-component';
import {UserRoleDialogComponent} from './user-role-dialog/user-role-dialog.component';

/*表格展示*/
/*用户-角色对应关系维护:pickList*/

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent extends SubPageComponent_UseComponentDialog<UserDialog, User, UserService> {

  //用户状态
  statuses: SelectItem[];

  constructor(private service: UserService, public _dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super('用户', _dialog, UserDialog);

    this.statuses = [];
    this.statuses.push({label: '正常', value: '0'});
    this.statuses.push({label: '非正常', value: '1'});

  }


  grant() {

    if (!this.canDoGrant()) {
      return;
    }

    //this.action = ActionType.edit;
    this.record = this.getCloneRecord();


    //弹出对话框
    const dialogRef: MdDialogRef<UserRoleDialogComponent> = this.dialog.open(UserRoleDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.record = this.record;
    dialogRef.componentInstance.dialogHeader = '授权';
    dialogRef.componentInstance.action = this.action;
    dialogRef.componentInstance.service = this.getService();


    //关闭对话框后进行,刷新
    dialogRef.afterClosed().subscribe((result: DialogResult) => {
      this.dialogRef = null;
      if (result.success) {
        this.doRefresh(result.refresh);
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

  ngOnInit() {
    this.doRefresh(null);
  }

  getSex(data) {
    if (data == '0')
      return '男';
    else
      return '女';
  }

  getRolesList(data) {
    var str: string = '';
    if (data != null) {
      let roles: Role[] = data;
      for (let role of roles) {
        if (str == '')
          str = role.name;
        else
          str = str + ',' + role.name;
      }
    }

    return str;
  }

  getUserType(data) {
    if (data == '0')
      return '管理员';
    else
      return '用户';
  }

  getStatus(value) {
    let label = null;
    for (let status of this.statuses) {
      if (status.value == value) {
        label = status.label;
        break;
      }
    }

    return label;
  }

}
