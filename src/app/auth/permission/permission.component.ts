import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog} from '@angular/material';

import {ActionType, SubPageComponentWithComponentDialog} from '../../shared';

import {PermissionDialogComponent} from './dialog/permission-dialog.component';
import {Permission} from './model/permission-model';
import {PermissionService} from './service/permission.service';
import {AuthInfoService} from '../../shared/auth-info/auth-info.service';

/*采用树形表格展示，不调整位置、不调整上下级关系;只有增删改动作*/

@Component({
  selector: 'fz-auth-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent
  extends SubPageComponentWithComponentDialog<Permission, PermissionService, PermissionDialogComponent>
  implements OnInit {

  //状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(service: PermissionService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super(service, '用户', dialog, PermissionDialogComponent);

    this.useTreeTable = true;
  }

  newInstance(): Permission {
    return new Permission();
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

}
