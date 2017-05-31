import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {SelectItem} from 'primeng/primeng';

import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {ActionType, SubPageComponent_UseComponentDialog} from '../../shared';

import {UserDialog} from './dialog/user-dialog.component';
import {User} from './services/user';
import {UserService} from './services/user.service';
import {Role} from '../role/services/role';

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
