import {Component} from '@angular/core';

import {SubPageComponent_UseTemplateDialog} from '../../shared';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {Role} from './services/role';
import {RoleService} from './services/role.service';
import {RoleGrantDialogComponent} from "./grant-dialog/role-grant-dialog.component";
import {DialogResult} from "../../shared/common/sub-page-component";

@Component({
  templateUrl: './role.component.html'
})
export class RoleComponent extends SubPageComponent_UseTemplateDialog<Role, RoleService> {

  //用户状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(private service: RoleService, dialog: MdDialog) {
    super('角色', dialog);
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
  getDeleteMessage(): string[] {
    const message = super.getDeleteMessage();
    message.push('名称:[' + this.selectedRecord.name + ']');
    return message;
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


  grant() {

    if (!this.canDoGrant()) {
      return;
    }

    //this.action = ActionType.edit;
    this.record = this.getCloneRecord();


    //弹出对话框
    const dialogRef: MdDialogRef<RoleGrantDialogComponent> = this.dialog.open(RoleGrantDialogComponent, this.dialogConfig);
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

}
