import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {SelectItem, Message} from 'primeng/primeng';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {SubPageComponentWithComponentDialog} from '../../shared';

import {Organization} from './service/organization';
import {OrganizationService} from './service/organization.service';
import {OrganizationDialogComponent} from './dialog/organization-dialog.component';
import {OrganizationGrantDialogComponent} from './grant-dialog/grant-dialog.component';
import {DialogResult} from '../../shared/common/sub-page-component';
import {isUndefined} from 'util';
import {AuthInfoService} from '../../shared/auth-info/auth-info.service';

@Component({
  selector: 'fz-auth-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent
  extends SubPageComponentWithComponentDialog<Organization, OrganizationService, OrganizationDialogComponent> {

  msgs: Message[];

  //用户状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(service: OrganizationService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super(service, '组织', dialog, OrganizationDialogComponent);
    this.useTreeTable = true;
  }

  //abstract
  newInstance(): Organization {
    return new Organization();
  };


  getDeleteMessage(): string[] {
    const message = super.getDeleteMessage();
    message.push('名称:[' + this.treeTableService.selectedNode.data.name + ']');
    return message;
  };

  nodeSelect(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.data.name});
  }

  nodeUnselect(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.data.name});
  }

  grant() {
    if (!this.canDoGrant()) {
      return;
    }

    //弹出对话框
    const dialogRef: MdDialogRef<OrganizationGrantDialogComponent> = this.dialog.open(OrganizationGrantDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.record = this.getCloneRecord();
    dialogRef.componentInstance.dialogHeader = '分配用户';
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
    return (this.treeTableService.selectedNode && this.treeTableService.selectedNode.data);
  }


}
