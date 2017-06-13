import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {SelectItem, Message} from 'primeng/primeng';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {SubPageComponentWithComponentDialog} from '../../shared';

import {Organization} from './services/organization';
import {OrganizationService} from './services/organization.service';
import {OrganizationDialog} from './dialog/organization-dialog.component';
import {OrganizationGrantDialogComponent} from "./grant-dialog/grant-dialog.component";
import {DialogResult} from "../../shared/common/sub-page-component";

@Component({
  templateUrl: './organization.component.html'
})
export class OrganizationComponent extends SubPageComponentWithComponentDialog<OrganizationDialog, Organization, OrganizationService> {

  msgs: Message[];

  //用户状态
  statuses: SelectItem[];

  constructor(private service: OrganizationService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {

    super('组织', dialog, OrganizationDialog);

    this.useTreeTable = true;

    this.statuses = [];
    this.statuses.push({label: '正常', value: '0'});
    this.statuses.push({label: '非正常', value: '1'});

  }

  //abstract
  getService(): OrganizationService {
    return this.service;
  }

  //abstract
  newInstance(): Organization {
    return new Organization();
  };


  getDeleteMessage(): string[] {
    let message = super.getDeleteMessage();
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
