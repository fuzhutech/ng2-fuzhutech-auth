import {Component} from '@angular/core';

import {SubPageComponent_UseTemplateDialog} from '../../shared';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {Role} from './services/role';
import {RoleService} from './services/role.service';

@Component({
  templateUrl: './role.component.html'
})
export class RoleComponent extends SubPageComponent_UseTemplateDialog<Role,RoleService> {

  //用户状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(private service: RoleService, dialog: MdDialog) {
    super('角色',dialog);
  }

  //abstract
  getService(): RoleService {
    return this.service;
  }

  //abstract
  newInstance(): Role {
    return new Role();
  };

  //override
  getDeleteMessage():string[]{
    let message = super.getDeleteMessage();
    message.push('名称:['+ this.selectedRecord.name+']');
    return message;
  };



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
