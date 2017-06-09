import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog} from '@angular/material';

import {ActionType, SubPageComponent_UseComponentDialog} from '../../shared';

import {ResourceDialogComponent} from './dialog/resource-dialog.component';
import {Resource} from './model/resource-model';
import {ResourceService} from './service/resource.service';

@Component({
  selector: 'fz-permission',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent
  extends SubPageComponent_UseComponentDialog<ResourceDialogComponent, Resource, ResourceService>
  implements OnInit {

  //状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(private service: ResourceService, public _dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super('用户', _dialog, ResourceDialogComponent);
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

}
