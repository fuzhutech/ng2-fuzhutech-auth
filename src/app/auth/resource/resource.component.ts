import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog, MdDialogRef} from '@angular/material';

import {ActionType, SubPageComponentWithComponentDialog} from '../../shared';

import {ResourceDialogComponent} from './dialog/resource-dialog.component';
import {Resource} from './model/resource-model';
import {ResourceService} from './service/resource.service';
import {ResourceGrantDialogComponent} from './grant-dialog/resource-grant-dialog.component';
import {DialogResult} from '../../shared/common/sub-page-component';

/*树形表格展示,调整位置?调整上下级关系？*/
/*资源-权限对应关系维护:pickList*/

@Component({
  selector: 'fz-permission',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent
  extends SubPageComponentWithComponentDialog<ResourceDialogComponent, Resource, ResourceService>
  implements OnInit {

  //状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(private service: ResourceService, public _dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super('用户', _dialog, ResourceDialogComponent);

    this.useTreeTable = true;
  }

  getService(): ResourceService {
    return this.service;
  }

  newInstance(): Resource {
    return new Resource();
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
    const dialogRef: MdDialogRef<ResourceGrantDialogComponent> = this.dialog.open(ResourceGrantDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.record = this.record;
    dialogRef.componentInstance.dialogHeader = '分配权限';
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
